CREATE TABLE IF NOT EXISTS admin_credentials (
  id                INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  email             TEXT NOT NULL DEFAULT 'admin@747live.com',
  password          TEXT NOT NULL DEFAULT 'admin123',
  recovery_question TEXT NOT NULL DEFAULT '',
  recovery_answer   TEXT NOT NULL DEFAULT '',
  updated_at        TIMESTAMPTZ DEFAULT now()
);

INSERT INTO admin_credentials (id, email, password, recovery_question, recovery_answer)
VALUES (1, 'admin@747live.com', 'admin123', 'What is your favorite color?', 'blue')
ON CONFLICT (id) DO NOTHING;
