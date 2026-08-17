# Demo Login

Minimal demo feature illustrating frontend/backend task split for layer sister skills.

## Requirements

### REQ-001: Login form UI
The system SHALL display a login form with email and password fields and a submit button.

- WHEN the page loads THEN the user MUST see labeled email and password inputs.
- WHEN the page loads THEN the user MUST see a submit control.

### REQ-002: Login API
The system SHALL authenticate credentials via a POST endpoint and return a structured success or error response.

- WHEN valid credentials are posted THEN the API MUST return HTTP 200 with a session token field.
- WHEN invalid credentials are posted THEN the API MUST return HTTP 401 with a stable error shape.

## Assumptions

- Demo-only specs; no production app in this repository.
- Stack paths follow `.specs/project/PROJECT.md` layer globs.

## Out of Scope

- Password reset, OAuth, rate limiting, production deployment.
