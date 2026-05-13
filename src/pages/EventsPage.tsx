import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { apiJson } from '../lib/api'
import { useRealtimeSync } from '../hooks/useRealtimeSync'

type EventRow = {
  id: string
  name: string
  venue_name: string
  city: string
  country: string
  latitude: number
  longitude: number
  starts_at: string
  ends_at: string
  exhibitor_count: number
}

export function EventsPage() {
  const { user, managedEventIds } = useAuth()
  const [events, setEvents] = useState<EventRow[]>([])
  const [err, setErr] = useState('')

  const load = useCallback(async () => {
    try {
      const data = await apiJson<{ events: EventRow[] }>('/events')
      setEvents(data.events as EventRow[])
      setErr('')
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'โหลดไม่ได้')
    }
  }, [])

  useRealtimeSync(() => {
    void load()
  })

  useEffect(() => {
    void load()
  }, [load])

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })

  const canAdmin = (id: string) => user && (user.role === 'root' || managedEventIds.includes(id))

  return (
    <div className="ei-page-wide">
      <h1>งาน (Events)</h1>
      <p>ข้อมูลจาก API + อัปเดตแบบ real-time เมื่อมีการเปลี่ยนแปลงบนเซิร์ฟเวอร์</p>
      {err && <p style={{ color: '#fca5a5' }}>{err}</p>}

      {events.length === 0 ? (
        <div className="ei-panel">
          <p className="ei-muted-block" style={{ margin: 0 }}>
            ไม่มีงาน — รัน seed แล้วเปิด API ที่พอร์ต 3001 หรือรัน <code>npm run dev:full</code>
          </p>
        </div>
      ) : (
        <div className="ei-table-wrap">
          <table className="ei-table">
            <thead>
              <tr>
                <th>งาน</th>
                <th>สถานที่</th>
                <th>วันที่</th>
                <th>บูธ</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.name}</td>
                  <td>
                    {ev.venue_name}
                    <br />
                    <span className="ei-muted-block" style={{ fontSize: '0.8rem' }}>
                      {ev.city}, {ev.country} · {ev.latitude.toFixed(2)}, {ev.longitude.toFixed(2)}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--ei-muted)' }}>
                    {fmt(ev.starts_at)} – {fmt(ev.ends_at)}
                  </td>
                  <td>{Number(ev.exhibitor_count)}</td>
                  <td>
                    <Link className="ei-btn-small" to={`/e/${ev.id}/match`} style={{ textDecoration: 'none', marginRight: 6 }}>
                      จับคู่
                    </Link>
                    {canAdmin(ev.id) && (
                      <Link className="ei-btn-small" to={`/e/${ev.id}/admin`} style={{ textDecoration: 'none' }}>
                        Admin
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
