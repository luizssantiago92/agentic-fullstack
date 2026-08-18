const VALID_EMAIL = "demo@example.com";
const VALID_PASSWORD = "demo-pass";

/**
 * POST /login handler for demo REQ-002.
 * @param {{ email?: string, password?: string }} credentials
 */
export function login(credentials = {}) {
  const email = String(credentials.email ?? "");
  const password = String(credentials.password ?? "");
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return { status: 200, body: { token: "demo-session" } };
  }
  return { status: 401, body: { error: "invalid_credentials" } };
}
