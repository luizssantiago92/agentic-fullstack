# Demo Login — Tasks

### T1: Render login form UI
- **Requirement**: REQ-001
- **Files**: apps/web/src/components/LoginForm.tsx
- **Depends on**: —
- **Tests**: apps/web/src/components/LoginForm.test.tsx
- **Gate**: pnpm --filter web test
- **Done when**: Login form renders labeled email, password, and submit per REQ-001
- [ ] complete

### T2: Add login API endpoint
- **Requirement**: REQ-002
- **Files**: apps/api/src/routes/login.ts
- **Depends on**: —
- **Tests**: apps/api/src/routes/login.test.ts
- **Gate**: pnpm --filter api test
- **Done when**: POST login returns 200 with token for valid creds and 401 for invalid per REQ-002
- [ ] complete

## Test Coverage Matrix

| Requirement | Task | Tests | Notes |
| --- | --- | --- | --- |
| REQ-001 | T1 | apps/web/src/components/LoginForm.test.tsx | labeled inputs + submit |
| REQ-002 | T2 | apps/api/src/routes/login.test.ts | 200 + 401 paths |

## Gate Check Commands

| Level | Command |
| --- | --- |
| Task T1 | pnpm --filter web test |
| Task T2 | pnpm --filter api test |
| Feature | pnpm test |
