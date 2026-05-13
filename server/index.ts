import bcrypt from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'
import { randomUUID } from 'node:crypto'
import { openDb } from './db.js'
import { needsSeed, runSeed } from './seed.js'

const PORT = Number(process.env.PORT) || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'exhibition-matching-demo-secret'

const db = openDb()
if (needsSeed(db)) {
  runSeed(db)
}

let syncVersion = 1
function bumpSync() {
  syncVersion += 1
  io.emit('sync', { version: syncVersion, at: new Date().toISOString() })
}

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '2mb' }))

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: true },
})

io.on('connection', (socket) => {
  socket.emit('sync', { version: syncVersion, at: new Date().toISOString() })
})

type JwtUser = { sub: string; role: string; email: string }

function parseAuth(req: express.Request): JwtUser | null {
  const h = req.headers.authorization
  if (!h?.startsWith('Bearer ')) return null
  try {
    return jwt.verify(h.slice(7), JWT_SECRET) as JwtUser
  } catch {
    return null
  }
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const u = parseAuth(req)
  if (!u) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  ;(req as express.Request & { user: JwtUser }).user = u
  next()
}

function requireRole(roles: string[]) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const u = (req as express.Request & { user: JwtUser }).user
    if (!roles.includes(u.role)) {
      res.status(403).json({ error: 'Forbidden' })
      return
    }
    next()
  }
}

function canManageEvent(user: JwtUser, eventId: string) {
  if (user.role === 'root') return true
  if (user.role !== 'event_admin') return false
  const row = db
    .prepare(`SELECT 1 FROM event_admins WHERE user_id = ? AND event_id = ?`)
    .get(user.sub, eventId) as { 1: number } | undefined
  return !!row
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, syncVersion })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string }
  if (!email || !password) {
    res.status(400).json({ error: 'email and password required' })
    return
  }
  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email.toLowerCase().trim()) as
    | {
        id: string
        email: string
        password_hash: string
        name: string
        role: string
      }
    | undefined
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }
  const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  })
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  })
})

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body as { email?: string; password?: string; name?: string }
  if (!email || !password || !name) {
    res.status(400).json({ error: 'email, password, name required' })
    return
  }
  const em = email.toLowerCase().trim()
  try {
    const id = `u-${randomUUID().slice(0, 8)}`
    const password_hash = bcrypt.hashSync(password, 10)
    db.prepare(
      `INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, 'visitor')`,
    ).run(id, em, password_hash, name.trim())
    bumpSync()
    const token = jwt.sign({ sub: id, role: 'visitor', email: em }, JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({
      token,
      user: { id, email: em, name: name.trim(), role: 'visitor' },
    })
  } catch {
    res.status(409).json({ error: 'Email already registered' })
  }
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  const u = (req as express.Request & { user: JwtUser }).user
  const user = db.prepare(`SELECT id, email, name, role FROM users WHERE id = ?`).get(u.sub) as
    | { id: string; email: string; name: string; role: string }
    | undefined
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  let managedEventIds: string[] = []
  if (user.role === 'root') {
    managedEventIds = (db.prepare(`SELECT id FROM events`).all() as { id: string }[]).map((r) => r.id)
  } else if (user.role === 'event_admin') {
    managedEventIds = (
      db.prepare(`SELECT event_id FROM event_admins WHERE user_id = ?`).all(user.id) as { event_id: string }[]
    ).map((r) => r.event_id)
  }
  res.json({ user, managedEventIds, syncVersion })
})

app.get('/api/events', (_req, res) => {
  const rows = db
    .prepare(
      `SELECT e.id, e.name, e.venue_name, e.city, e.country, e.latitude, e.longitude, e.starts_at, e.ends_at,
        (SELECT COUNT(*) FROM exhibitors x WHERE x.event_id = e.id) AS exhibitor_count
       FROM events e ORDER BY e.starts_at`,
    )
    .all() as Record<string, unknown>[]
  res.json({ events: rows, syncVersion })
})

app.get('/api/events/:eventId', (req, res) => {
  const ev = db
    .prepare(
      `SELECT id, name, venue_name, address, city, country, latitude, longitude, starts_at, ends_at, description
       FROM events WHERE id = ?`,
    )
    .get(req.params.eventId) as Record<string, unknown> | undefined
  if (!ev) {
    res.status(404).json({ error: 'Event not found' })
    return
  }
  res.json({ event: ev, syncVersion })
})

app.get('/api/events/:eventId/companies', (req, res) => {
  const exists = db.prepare(`SELECT 1 FROM events WHERE id = ?`).get(req.params.eventId)
  if (!exists) {
    res.status(404).json({ error: 'Event not found' })
    return
  }
  const rows = db
    .prepare(
      `SELECT id, company_name AS companyName, booth_label AS boothLabel FROM exhibitors WHERE event_id = ? ORDER BY company_name`,
    )
    .all(req.params.eventId) as { id: string; companyName: string; boothLabel: string }[]
  res.json({ companies: rows, syncVersion })
})

app.get('/api/events/:eventId/match-data', (req, res) => {
  const eventId = req.params.eventId
  const exists = db.prepare(`SELECT 1 FROM events WHERE id = ?`).get(eventId)
  if (!exists) {
    res.status(404).json({ error: 'Event not found' })
    return
  }
  const exs = db
    .prepare(`SELECT id, company_name, booth_label, short_bio, solutions_json FROM exhibitors WHERE event_id = ?`)
    .all(eventId) as {
      id: string
      company_name: string
      booth_label: string
      short_bio: string
      solutions_json: string
    }[]
  const painStmt = db.prepare(`SELECT id, title, body FROM company_pain_points WHERE exhibitor_id = ?`)
  const exhibitors = exs.map((ex) => {
    let solutions: { solutionName: string; useCases: string[] }[] = []
    try {
      solutions = JSON.parse(ex.solutions_json)
    } catch {
      solutions = []
    }
    const painPoints = painStmt.all(ex.id) as { id: string; title: string; body: string }[]
    return {
      id: ex.id,
      eventId,
      companyName: ex.company_name,
      boothLabel: ex.booth_label,
      shortBio: ex.short_bio,
      solutions,
      painPoints,
    }
  })
  res.json({ exhibitors, syncVersion })
})

app.get('/api/companies/:companyId', (req, res) => {
  const row = db
    .prepare(
      `SELECT id, event_id AS eventId, company_name AS companyName, booth_label AS boothLabel, short_bio AS shortBio, solutions_json AS solutionsJson
       FROM exhibitors WHERE id = ?`,
    )
    .get(req.params.companyId) as
    | {
        id: string
        eventId: string
        companyName: string
        boothLabel: string
        shortBio: string
        solutionsJson: string
      }
    | undefined
  if (!row) {
    res.status(404).json({ error: 'Company not found' })
    return
  }
  let solutions: { solutionName: string; useCases: string[] }[] = []
  try {
    solutions = JSON.parse(row.solutionsJson)
  } catch {
    solutions = []
  }
  res.json({
    company: {
      id: row.id,
      eventId: row.eventId,
      companyName: row.companyName,
      boothLabel: row.boothLabel,
      shortBio: row.shortBio,
      solutions,
    },
    syncVersion,
  })
})

app.get('/api/companies/:companyId/pain-points', (req, res) => {
  const ex = db.prepare(`SELECT id FROM exhibitors WHERE id = ?`).get(req.params.companyId)
  if (!ex) {
    res.status(404).json({ error: 'Company not found' })
    return
  }
  const rows = db
    .prepare(`SELECT id, title, body FROM company_pain_points WHERE exhibitor_id = ? ORDER BY title`)
    .all(req.params.companyId) as { id: string; title: string; body: string }[]
  res.json({ painPoints: rows, syncVersion })
})

app.put('/api/events/:eventId/line', requireAuth, (req, res) => {
  const user = (req as express.Request & { user: JwtUser }).user
  const { eventId } = req.params
  if (!canManageEvent(user, eventId)) {
    res.status(403).json({ error: 'Cannot manage this event' })
    return
  }
  const { channel_id, channel_secret, webhook_url, mark_linked } = req.body as Record<string, unknown>
  const linkedAt =
    mark_linked && String(channel_id || '').trim() && String(webhook_url || '').trim()
      ? new Date().toISOString()
      : null
  db.prepare(
    `INSERT INTO event_line_settings (event_id, channel_id, channel_secret, webhook_url, linked_at)
     VALUES (@event_id, @channel_id, @channel_secret, @webhook_url, @linked_at)
     ON CONFLICT(event_id) DO UPDATE SET
       channel_id = excluded.channel_id,
       channel_secret = excluded.channel_secret,
       webhook_url = excluded.webhook_url,
       linked_at = COALESCE(excluded.linked_at, event_line_settings.linked_at)`,
  ).run({
    event_id: eventId,
    channel_id: String(channel_id ?? ''),
    channel_secret: String(channel_secret ?? ''),
    webhook_url: String(webhook_url ?? ''),
    linked_at: linkedAt,
  })
  bumpSync()
  res.json({ ok: true })
})

app.get('/api/events/:eventId/line', requireAuth, (req, res) => {
  const user = (req as express.Request & { user: JwtUser }).user
  const { eventId } = req.params
  if (!canManageEvent(user, eventId)) {
    res.status(403).json({ error: 'Cannot manage this event' })
    return
  }
  const row = db
    .prepare(`SELECT event_id, channel_id, channel_secret, webhook_url, linked_at FROM event_line_settings WHERE event_id = ?`)
    .get(eventId) as
    | {
        event_id: string
        channel_id: string
        channel_secret: string
        webhook_url: string
        linked_at: string | null
      }
    | undefined
  if (!row) {
    res.json({
      line: {
        event_id: eventId,
        channel_id: '',
        channel_secret: '',
        webhook_url: '',
        linked_at: null,
      },
    })
    return
  }
  res.json({ line: row })
})

app.post('/api/events/:eventId/exhibitors', requireAuth, (req, res) => {
  const user = (req as express.Request & { user: JwtUser }).user
  const { eventId } = req.params
  if (!canManageEvent(user, eventId)) {
    res.status(403).json({ error: 'Cannot manage this event' })
    return
  }
  const { company_name, booth_label, short_bio, solutions } = req.body as {
    company_name?: string
    booth_label?: string
    short_bio?: string
    solutions?: { solutionName: string; useCases: string[] }[]
  }
  if (!company_name?.trim()) {
    res.status(400).json({ error: 'company_name required' })
    return
  }
  const exId = `${eventId}-ex-${randomUUID().slice(0, 8)}`
  const solJson = JSON.stringify(
    solutions?.length ? solutions : [{ solutionName: 'General', useCases: ['Consulting'] }],
  )
  db.prepare(
    `INSERT INTO exhibitors (id, event_id, company_name, booth_label, short_bio, solutions_json)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    exId,
    eventId,
    company_name.trim(),
    String(booth_label ?? '').trim() || 'TBD',
    String(short_bio ?? '').trim() || '—',
    solJson,
  )
  bumpSync()
  res.status(201).json({ id: exId })
})

app.delete('/api/exhibitors/:exhibitorId', requireAuth, (req, res) => {
  const user = (req as express.Request & { user: JwtUser }).user
  const row = db.prepare(`SELECT event_id FROM exhibitors WHERE id = ?`).get(req.params.exhibitorId) as
    | { event_id: string }
    | undefined
  if (!row) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  if (!canManageEvent(user, row.event_id)) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }
  db.prepare(`DELETE FROM exhibitors WHERE id = ?`).run(req.params.exhibitorId)
  bumpSync()
  res.json({ ok: true })
})

app.put('/api/exhibitors/:exhibitorId', requireAuth, (req, res) => {
  const user = (req as express.Request & { user: JwtUser }).user
  const row = db.prepare(`SELECT event_id FROM exhibitors WHERE id = ?`).get(req.params.exhibitorId) as
    | { event_id: string }
    | undefined
  if (!row) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  if (!canManageEvent(user, row.event_id)) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }
  const { company_name, booth_label, short_bio, solutions } = req.body as Record<string, unknown>
  const cur = db
    .prepare(`SELECT * FROM exhibitors WHERE id = ?`)
    .get(req.params.exhibitorId) as Record<string, string> | undefined
  if (!cur) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  const solutions_json =
    solutions !== undefined ? JSON.stringify(solutions) : cur.solutions_json
  db.prepare(
    `UPDATE exhibitors SET company_name = ?, booth_label = ?, short_bio = ?, solutions_json = ? WHERE id = ?`,
  ).run(
    company_name != null ? String(company_name) : cur.company_name,
    booth_label != null ? String(booth_label) : cur.booth_label,
    short_bio != null ? String(short_bio) : cur.short_bio,
    solutions_json,
    req.params.exhibitorId,
  )
  bumpSync()
  res.json({ ok: true })
})

app.post('/api/root/events', requireAuth, requireRole(['root']), (req, res) => {
  const b = req.body as Record<string, unknown>
  const id = `ev-${randomUUID().slice(0, 8)}`
  const name = String(b.name ?? '').trim()
  if (!name) {
    res.status(400).json({ error: 'name required' })
    return
  }
  db.prepare(
    `INSERT INTO events (id, name, venue_name, address, city, country, latitude, longitude, starts_at, ends_at, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    name,
    String(b.venue_name ?? 'TBD'),
    String(b.address ?? ''),
    String(b.city ?? 'Bangkok'),
    String(b.country ?? 'Thailand'),
    Number(b.latitude ?? 13.7563),
    Number(b.longitude ?? 100.5018),
    String(b.starts_at ?? new Date().toISOString()),
    String(b.ends_at ?? new Date(Date.now() + 864e5).toISOString()),
    String(b.description ?? ''),
  )
  db.prepare(`INSERT INTO event_line_settings (event_id) VALUES (?)`).run(id)
  bumpSync()
  res.status(201).json({ id })
})

app.post('/api/root/events/:eventId/admins', requireAuth, requireRole(['root']), (req, res) => {
  const { eventId } = req.params
  const { email } = req.body as { email?: string }
  if (!email?.trim()) {
    res.status(400).json({ error: 'email required' })
    return
  }
  const ev = db.prepare(`SELECT id FROM events WHERE id = ?`).get(eventId)
  if (!ev) {
    res.status(404).json({ error: 'Event not found' })
    return
  }
  let user = db.prepare(`SELECT id, role FROM users WHERE email = ?`).get(email.toLowerCase().trim()) as
    | { id: string; role: string }
    | undefined
  if (!user) {
    const id = `u-${randomUUID().slice(0, 8)}`
    const password_hash = bcrypt.hashSync('demo', 10)
    db.prepare(`INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, 'event_admin')`).run(
      id,
      email.toLowerCase().trim(),
      password_hash,
      email.split('@')[0],
    )
    user = { id, role: 'event_admin' }
  } else {
    if (user.role === 'root') {
      res.status(400).json({
        error:
          'บัญชี root ดูแลทั้งแพลตฟอร์ม — ให้ใช้บัญชี admin เฉพาะงานแทน (สร้างอีเมลใหม่หรือใช้ admin.ev*@demo.local)',
      })
      return
    }
    if (user.role === 'visitor') {
      db.prepare(`UPDATE users SET role = 'event_admin' WHERE id = ?`).run(user.id)
    }
  }
  try {
    db.prepare(`INSERT INTO event_admins (event_id, user_id) VALUES (?, ?)`).run(eventId, user.id)
  } catch {
    res.status(409).json({ error: 'Already admin for this event' })
    return
  }
  bumpSync()
  res.json({ ok: true, userId: user.id })
})

httpServer.listen(PORT, () => {
  console.log(`API + Socket.io http://localhost:${PORT}`)
})
