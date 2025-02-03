export const migrations = [
  // initial migration, creating the schema, user and session tables
  `
CREATE TABLE schema_migrations (
  version INTEGER PRIMARY KEY
);
INSERT INTO schema_migrations (version) VALUES (1);

CREATE TABLE users (
  id INTEGER AUTOINCREMENT PRIMARY KEY,
  email TEXT NOT NULL,
  displayName TEXT NOT NULL,
  permissions TEXT NOT NULL,
  passwordHash TEXT NOT NULL,
  passwordSalt TEXT NOT NULL
);
CREATE UNIQUE INDEX users_email ON users(email);
CREATE UNIQUE INDEX users_display_name ON users(displayName);

CREATE TABLE sessions (
  userId INTEGER NOT NULL,
  token TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  expiresAt TEXT NOT NULL
);
ALTER TABLE sessions ADD FOREIGN KEY (userId) REFERENCES users(id);
`
]
