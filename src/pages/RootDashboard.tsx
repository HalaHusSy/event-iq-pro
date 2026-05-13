import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { apiJson } from '../lib/api'
import { useRealtimeSync } from '../hooks/useRealtimeSync'

type EventRow = {
  id: string
  name: string
  venue_name: string
  city: string
  starts_at: string
  exhibitor_count: number
}

export function RootDashboard() {
  const { user, loading } = useAuth()
  const [events, setEvents] = useState<EventRow[]>([])
  const [name, setName] = useState('')
  const [venue, setVenue] = useState('')
  const [assignEventId, setAssignEventId] = useState('')
  const [assignEmail, setAssignEmail] = useState('')
  const [note, setNote] = useState('')

  const load = useCallback(async () => {
    const data = await apiJson<{ events: EventRow[] }>('/events')
    setEvents(data.events as EventRow[])
  }, [])

  useRealtimeSync(() => {
    void load()
  })

  useEffect(() => {
    if (user?.role === 'root') void load()
  }, [user, load])

  if (!loading && (!user || user.role !== 'root')) {
    return (
      <div className="ei-page-wide">
        <h1>Root dashboard</h1>
        <p className="ei-muted-block">ต้องล็อกอินเป็น root เพื่อสร้างงานและแต่งตั้ง event admin</p>
        <Link className="ei-btn ei-btn-primary" to="/login?next=/root">
          ไป login (root@demo.local / demo)
        </Link>
      </div>
    )
  }

  if (loading || !user) {
    return (
      <div className="ei-page-wide">
        <p>กำลังโหลด…</p>
      </div>
    )
  }

  const createEvent = async (e: FormEvent) => {
    e.preventDefault()
    setNote('')
    const starts = new Date()
    const ends = new Date(starts.getTime() + 2 * 864e5)
    await apiJson('/root/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        venue_name: venue.trim() || 'TBD',
        address: '',
        city: 'Bangkok',
        country: 'Thailand',
        latitude: 13.7563,
        longitude: 100.5018,
        starts_at: starts.toISOString(),
        ends_at: ends.toISOString(),
        description: 'สร้างจาก Root dashboard',
      }),
    })
    setName('')
    setVenue('')
    setNote('สร้างงานแล้ว')
    void load()
  }

  const assignAdmin = async (e: FormEvent) => {
    e.preventDefault()
    setNote('')
    await apiJson(`/root/events/${assignEventId}/admins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: assignEmail.trim() }),
    })
    setAssignEmail('')
    setNote('เพิ่ม admin ให้งานแล้ว (รหัสผ่านบัญชีใหม่ = demo)')
    void load()
  }

  return (
    <div className="ei-page-wide">
      <h1>Root — จัดการแพลตฟอร์ม</h1>
      <p>
        <Link to="/root/api-lab">หน้าทดสอบ API (Root)</Link>
      </p>

      <div className="ei-panel">
        <h2>สร้างงานใหม่</h2>
        <form className="ei-stack" onSubmit={createEvent}>
          <div className="ei-form-row">
            <label className="ei-label">ชื่องาน</label>
            <input className="ei-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="ei-form-row">
            <label className="ei-label">สถานที่ (venue)</label>
            <input className="ei-input" value={venue} onChange={(e) => setVenue(e.target.value)} />
          </div>
          <button type="submit" className="ei-btn ei-btn-primary">
            สร้าง event
          </button>
        </form>
      </div>

      <div className="ei-panel">
        <h2>แต่งตั้ง Event admin (แบบ 2.2)</h2>
        <p className="ei-muted-block" style={{ marginTop: 0 }}>
          Root ใส่อีเมล — ถ้ายังไม่มี user ระบบจะสร้างบัญชี admin ใหม่ (รหัสผ่าน <code>demo</code>)
        </p>
        <form className="ei-stack" onSubmit={assignAdmin}>
          <div className="ei-form-row">
            <label className="ei-label">เลือกงาน</label>
            <select className="ei-select" value={assignEventId} onChange={(e) => setAssignEventId(e.target.value)} required>
              <option value="">—</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name}
                </option>
              ))}
            </select>
          </div>
          <div className="ei-form-row">
            <label className="ei-label">อีเมล admin</label>
            <input type="email" className="ei-input" value={assignEmail} onChange={(e) => setAssignEmail(e.target.value)} required />
          </div>
          <button type="submit" className="ei-btn ei-btn-secondary">
            เพิ่ม admin
          </button>
        </form>
      </div>

      {note && <p className="ei-status-ok">{note}</p>}

      <div className="ei-panel">
        <h2>งานทั้งหมด</h2>
        <div className="ei-table-wrap">
          <table className="ei-table">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>บูธ</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.name}</td>
                  <td>{Number(ev.exhibitor_count)}</td>
                  <td>
                    <Link className="ei-btn-small" to={`/e/${ev.id}/admin`} style={{ textDecoration: 'none' }}>
                      จัดการ
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
