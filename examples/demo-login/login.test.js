import assert from "node:assert/strict";
import { test } from "node:test";

import { login } from "./apps/api/src/routes/login.js";
import { renderLoginForm } from "./apps/web/src/components/LoginForm.js";

test("REQ-001: login form exposes labeled email, password, and submit", () => {
  const html = renderLoginForm();
  assert.match(html, /<label>Email[\s\S]*name="email"/);
  assert.match(html, /<label>Password[\s\S]*name="password"/);
  assert.match(html, /<button type="submit">/);
});

test("REQ-002: valid credentials return 200 with a token", () => {
  const result = login({ email: "demo@example.com", password: "demo-pass" });
  assert.equal(result.status, 200);
  assert.equal(typeof result.body.token, "string");
  assert.ok(result.body.token.length > 0);
});

test("REQ-002: invalid credentials return 401 with a stable error shape", () => {
  const result = login({ email: "demo@example.com", password: "wrong" });
  assert.equal(result.status, 401);
  assert.equal(result.body.error, "invalid_credentials");
});
