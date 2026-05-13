import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { canManageEvent, useAuth } from '../auth/AuthContext'
import { apiJson } from '../lib/api'
import { useRealtimeSync } from '../hooks/useRealtimeSync'

type MatchEx = {
  id: string
  companyName: string
  boothLabel: string
  shortBio: string
  solutions: { solutionName: string; useCases: string[] }[]
  painPoints: { id: string; title: string; body: string }[]
}

type LineRow = {
  event_id: string
  channel_id: string
  channel_secret: string
  webhook_url: string
  linked_at: string | null
}

export function EventAdminPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const { user, managedEventIds, loading: authLoading } = useAuth()
  const [eventName, setEventName] = useState('')
  const [exhibitors, setExhibitors] = useState<MatchEx[]>([])
  const [line, setLine] = useState<LineRow | null>(null)
  const [channelId, setChannelId] = useState('')
  const [channelSecret, setChannelSecret] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [newCompany, setNewCompany] = useState('')
  const [msg, setMsg] = useState('')

  const can = user && eventId ? canManageEvent(managedEventIds, user.role, eventId) : false

  const load = useCallback(async () => {
    if (!eventId) return
    const ev = await apiJson<{ event: { name: string } }>(`/events/${eventId}`)
    setEventName(ev.event.name)
    const md = await apiJson<{ exhibitors: MatchEx[] }>(`/events/${eventId}/match-data`)
    setExhibitors(md.exhibitors)
    try {
      const ln = await apiJson<{ line: LineRow | null }>(`/events/${eventId}/line`)
      if (ln.line) {
        setLine(ln.line)
        setChannelId(ln.line.channel_id)
        setChannelSecret(ln.line.channel_secret)
        setWebhookUrl(ln.line.webhook_url)
      }
    } catch {
      setLine(null)
    }
  }, [eventId])

  useRealtimeSync(() => {
    void load()
  })

  useEffect(() => {
    void load()
  }, [load])

  if (!eventId) return <Navigate to="/events" replace />
  if (!authLoading && !user) return <Navigate to={`/login?next=/e/${eventId}/admin`} replace />
  if (!authLoading && user && !can) {
    return (
      <div className="ei-page-wide">
        <h1>ไม่มีสิทธิ์</h1>
        <p className="ei-muted-block">บัญชีนี้ไม่ใช่ admin ของงานนี้ — ลองล็อกอินเป็น admin ของ event หรือ root</p>
        <Link to="/login">ไปหน้า login</Link>
      </div>
    )
  }

  const saveLine = async (e: FormEvent) => {
    e.preventDefault()
    if (!eventId) return
    setMsg('')
    try {
      await apiJson(`/events/${eventId}/line`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel_id: channelId,
          channel_secret: channelSecret,
          webhook_url: webhookUrl,
          mark_linked: false,
        }),
      })
      setMsg('บันทึกการตั้งค่า LINE แล้ว')
      void load()
    } catch (er) {
      setMsg(er instanceof Error ? er.message : 'Error')
    }
  }

  const mockLink = async () => {
    if (!eventId) return
    await apiJson(`/events/${eventId}/line`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel_id: channelId || 'demo-channel',
        channel_secret: channelSecret || 'secret',
        webhook_url: webhookUrl || 'https://example.com/webhook',
        mark_linked: true,
      }),
    })
    void load()
  }

  const addCompany = async (e: FormEvent) => {
    e.preventDefault()
    if (!eventId || !newCompany.trim()) return
    await apiJson(`/events/${eventId}/exhibitors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: newCompany.trim(),
        booth_label: 'NEW',
        short_bio: 'เพิ่มจากแดชบอร์ด admin',
        solutions: [{ solutionName: 'General', useCases: ['Consulting'] }],
      }),
    })
    setNewCompany('')
    void load()
  }

  const removeEx = async (id: string) => {
    if (!confirm('ลบบริษัทนี้?')) return
    await apiJson(`/exhibitors/${id}`, { method: 'DELETE' })
    void load()
  }

  return (
    <div className="ei-page-wide">
      <p className="ei-muted-block" style={{ marginBottom: '0.5rem' }}>
        <Link to="/events" style={{ color: 'var(--ei-accent-2)' }}>
          ← งานทั้งหมด
        </Link>
      </p>
      <h1>จัดการงาน: {eventName}</h1>
      <p>ข้อมูล sync แบบ real-time ผ่าน Socket.io เมื่อมีการแก้ไขจาก API</p>
      {msg && <p style={{ color: 'var(--ei-accent-2)' }}>{msg}</p>}

      <div className="ei-panel">
        <h2>LINE OA + Webhook</h2>
        <form className="ei-stack" onSubmit={saveLine}>
          <div className="ei-grid2">
            <div className="ei-form-row">
              <label className="ei-label">Channel ID</label>
              <input className="ei-input" value={channelId} onChange={(e) => setChannelId(e.target.value)} />
            </div>
            <div className="ei-form-row">
              <label className="ei-label">Channel secret</label>
              <input
                type="password"
                className="ei-input"
                value={channelSecret}
                onChange={(e) => setChannelSecret(e.target.value)}
              />
            </div>
          </div>
          <div className="ei-form-row">
            <label className="ei-label">Webhook URL</label>
            <input className="ei-input" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
          </div>
          <div className="ei-inline">
            <button type="submit" className="ei-btn ei-btn-secondary">
              บันทึก
            </button>
            <button type="button" className="ei-btn ei-btn-primary" onClick={() => void mockLink()}>
              จำลองเชื่อมต่อสำเร็จ
            </button>
            {line?.linked_at && <span className="ei-status-ok">เชื่อมแล้ว</span>}
          </div>
        </form>
      </div>

      <div className="ei-panel">
        <h2>เพิ่มบริษัทด่วน</h2>
        <form className="ei-inline" onSubmit={addCompany}>
          <input
            className="ei-input"
            style={{ flex: 1, minWidth: 200 }}
            placeholder="ชื่อบริษัท"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
          />
          <button type="submit" className="ei-btn ei-btn-primary">
            เพิ่ม
          </button>
        </form>
      </div>

      <div className="ei-panel">
        <h2>บริษัทในงาน ({exhibitors.length})</h2>
        <div className="ei-table-wrap">
          <table className="ei-table">
            <thead>
              <tr>
                <th>บริษัท</th>
                <th>บูธ</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {exhibitors.map((ex) => (
                <tr key={ex.id}>
                  <td>{ex.companyName}</td>
                  <td>{ex.boothLabel}</td>
                  <td>
                    <button type="button" className="ei-btn-small ei-danger" onClick={() => void removeEx(ex.id)}>
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="ei-muted-block">
        ผู้เยี่ยมชม:{' '}
        <Link to={`/e/${eventId}/match`} style={{ color: 'var(--ei-accent-2)' }}>
          /e/{eventId}/match
        </Link>
      </p>
    </div>
  )
}
