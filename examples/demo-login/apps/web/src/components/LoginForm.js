/** Minimal login form markup for demo REQ-001 (labeled email, password, submit). */
export function renderLoginForm() {
  return [
    '<form aria-label="Login">',
    '<label>Email <input type="email" name="email" /></label>',
    '<label>Password <input type="password" name="password" /></label>',
    '<button type="submit">Sign in</button>',
    "</form>",
  ].join("");
}
