#!/usr/bin/env python3
"""Layer routing gate — each task Files must match at most one layer in PROJECT.md.

Run before Execute or in CI:

    python3 validate_layer_routing.py .specs/features/demo-login/tasks.md
    python3 validate_layer_routing.py demo-login

Exit codes: 0 pass, 1 blocking issues, 2 usage error.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    from _common import Report, resolve_artifact as _resolve_artifact
except ImportError:  # pragma: no cover - degraded without harness

    class Report:
        def __init__(self, gate: str, target: str):
            self.gate = gate
            self.target = target
            self.errors: list[str] = []
            self.warnings: list[str] = []
            self.checks: list[str] = []

        def error(self, msg: str) -> None:
            self.errors.append(msg)

        def warn(self, msg: str) -> None:
            self.warnings.append(msg)

        def ok(self, msg: str) -> None:
            self.checks.append(msg)

        def emit(self, strict: bool = False) -> int:
            status = "PASS" if not self.errors else "FAIL"
            print(f"[{self.gate}] {status} - {self.target}")
            for msg in self.checks:
                print(f"  ok      {msg}")
            for msg in self.warnings:
                print(f"  warn    {msg}")
            for msg in self.errors:
                print(f"  error   {msg}")
            if self.errors:
                return 1
            return 0

    def _resolve_artifact(
        raw: str | None, filename: str, gate: str, root: Path = Path(".")
    ) -> tuple[Path, str]:
        if raw:
            candidate = Path(raw).expanduser()
            if candidate.is_file():
                return candidate, candidate.read_text(encoding="utf-8")
            feature = raw.strip("/")
            tasks = root / ".specs" / "features" / feature / filename
            if tasks.is_file():
                return tasks, tasks.read_text(encoding="utf-8")
        raise FileNotFoundError(raw or filename)


GATE = "validate-layer-routing"

TASK_HEADING = re.compile(
    r"^#{2,6}\s*(?P<id>T\d{1,6})\s*[:\-–]?\s*(?P<title>.*)$",
    re.MULTILINE | re.IGNORECASE,
)
FIELD = re.compile(
    r"^\s*[-*]?\s*\*{0,2}(?P<key>[A-Za-z][A-Za-z ]+?)\*{0,2}\s*:\s*(?P<value>.+?)\s*$",
    re.MULTILINE,
)
REGISTRY_ROW = re.compile(
    r"^\|\s*(?P<id>[^|]+?)\s*\|\s*`(?P<skill>[^`]+)`\s*\|\s*(?P<globs>.+?)\s*\|\s*$"
)


def parse_registry(project_text: str) -> dict[str, list[str]]:
    layers: dict[str, list[str]] = {}
    in_section = False
    for line in project_text.splitlines():
        if line.startswith("## Layer registry"):
            in_section = True
            continue
        if in_section and line.startswith("## "):
            break
        if not in_section or not line.startswith("|"):
            continue
        if "---" in line or "Layer id" in line:
            continue
        match = REGISTRY_ROW.match(line.strip())
        if not match:
            continue
        layer_id = match.group("id").strip()
        globs = re.findall(r"`([^`]+)`", match.group("globs"))
        layers[layer_id] = globs
    return layers


def glob_to_regex(pattern: str) -> str:
    """Convert a glob with globstar (**) into a full-match regex."""
    i = 0
    n = len(pattern)
    parts: list[str] = ["^"]
    while i < n:
        if pattern.startswith("**/", i):
            parts.append("(?:.*/)?")
            i += 3
            continue
        if pattern.startswith("/**/", i):
            parts.append("/(?:.*/)?")
            i += 4
            continue
        if pattern[i:] == "/**":
            parts.append("(?:/.*)?")
            i = n
            continue
        if pattern.startswith("**", i):
            parts.append(".*")
            i += 2
            continue
        if pattern[i] == "*":
            parts.append("[^/]*")
            i += 1
            continue
        if pattern[i] == "?":
            parts.append("[^/]")
            i += 1
            continue
        parts.append(re.escape(pattern[i]))
        i += 1
    parts.append("$")
    return "".join(parts)


def glob_match(pattern: str, file_path: str) -> bool:
    path = file_path.replace("\\", "/").lstrip("./")
    pattern = pattern.replace("\\", "/")
    return re.match(glob_to_regex(pattern), path) is not None


def glob_specificity(pattern: str) -> int:
    """Literal prefix length — used to prefer path layers over extension globs."""
    star = pattern.find("*")
    literal = pattern if star < 0 else pattern[:star]
    return len(literal.replace("\\", "/").rstrip("/"))


def layers_for_file(file_path: str, registry: dict[str, list[str]]) -> list[str]:
    scored: list[tuple[int, str]] = []
    for layer_id, globs in registry.items():
        matched = [g for g in globs if glob_match(g, file_path)]
        if matched:
            scored.append((max(glob_specificity(g) for g in matched), layer_id))
    if not scored:
        return []
    best = max(spec for spec, _ in scored)
    return [layer_id for spec, layer_id in scored if spec == best]


def parse_tasks(tasks_text: str) -> list[tuple[str, list[str]]]:
    tasks: list[tuple[str, list[str]]] = []
    for match in TASK_HEADING.finditer(tasks_text):
        task_id = match.group("id").upper()
        start = match.end()
        next_task = TASK_HEADING.search(tasks_text, start)
        body = tasks_text[start : next_task.start() if next_task else len(tasks_text)]
        files: list[str] = []
        for field in FIELD.finditer(body):
            if field.group("key").strip().lower() == "files":
                raw = field.group("value").strip()
                files = [p.strip() for p in re.split(r",|;", raw) if p.strip()]
                break
        tasks.append((task_id, files))
    return tasks


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate task Files match at most one layer")
    parser.add_argument(
        "target",
        nargs="?",
        help="feature name, feature directory, or path to tasks.md",
    )
    args = parser.parse_args(argv)

    cwd = Path.cwd()
    project_path = cwd / ".specs" / "project" / "PROJECT.md"
    if not project_path.is_file():
        report = Report(gate=GATE, target=str(project_path))
        report.error("Missing .specs/project/PROJECT.md — run agentic-fullstack install")
        return report.emit()

    registry = parse_registry(project_path.read_text(encoding="utf-8"))
    if not registry:
        report = Report(gate=GATE, target=str(project_path))
        report.error("Layer registry table empty or unreadable in PROJECT.md")
        return report.emit()

    try:
        tasks_path, tasks_text = _resolve_artifact(args.target, "tasks.md", GATE, cwd)
    except FileNotFoundError:
        report = Report(gate=GATE, target=args.target or "tasks.md")
        report.error(f"Tasks file not found: {args.target or 'tasks.md'}")
        return 2

    report = Report(gate=GATE, target=str(tasks_path))
    report.ok(f"{len(registry)} layer(s) in registry")

    tasks = parse_tasks(tasks_text)
    if not tasks:
        report.warn(f"No tasks parsed in {tasks_path}")
    else:
        report.ok(f"{len(tasks)} task(s) parsed")

    for task_id, files in tasks:
        if not files:
            continue
        layer_hits: set[str] = set()
        for file_path in files:
            hits = layers_for_file(file_path, registry)
            if len(hits) > 1:
                report.error(
                    f"{task_id} file {file_path} matches multiple layers: {', '.join(hits)}"
                )
            elif len(hits) == 0:
                report.warn(
                    f"{task_id} file {file_path} matches no layer — refine globs or PROJECT.md"
                )
            layer_hits.update(hits)
        if len(layer_hits) > 1:
            report.error(
                f"{task_id} spans layers {', '.join(sorted(layer_hits))} — split task or amend tasks.md"
            )
        elif len(layer_hits) == 1:
            report.ok(f"{task_id} → layer {next(iter(layer_hits))}")
        else:
            report.warn(
                f"{task_id} matches 0 layers — refine globs or PROJECT.md"
            )

    return report.emit()


if __name__ == "__main__":
    sys.exit(main())
