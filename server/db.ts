import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const DB_PATH = path.join(__dirname, 'data', 'app.db')

export function openDb() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  migrate(db)
  return db
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('root', 'event_admin', 'visitor'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      venue_name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      country TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      starts_at TEXT NOT NULL,
      ends_at TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS event_admins (
      event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      PRIMARY KEY (event_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS event_line_settings (
      event_id TEXT PRIMARY KEY REFERENCES events(id) ON DELETE CASCADE,
      channel_id TEXT NOT NULL DEFAULT '',
      channel_secret TEXT NOT NULL DEFAULT '',
      webhook_url TEXT NOT NULL DEFAULT '',
      linked_at TEXT
    );

    CREATE TABLE IF NOT EXISTS exhibitors (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      company_name TEXT NOT NULL,
      booth_label TEXT NOT NULL,
      short_bio TEXT NOT NULL,
      solutions_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS company_pain_points (
      id TEXT PRIMARY KEY,
      exhibitor_id TEXT NOT NULL REFERENCES exhibitors(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_exhibitors_event ON exhibitors(event_id);
    CREATE INDEX IF NOT EXISTS idx_pain_exhibitor ON company_pain_points(exhibitor_id);
  `)
}
