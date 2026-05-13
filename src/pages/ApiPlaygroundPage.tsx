import { useCallback, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { apiJson } from '../lib/api'

type Json = unknown

export function ApiPlaygroundPage() {
  const { user, loading } = useAuth()
  const [out, setOut] = useState<string>('')
  const [busy, setBusy] = useState(false)

  const run = useCallback(async (label: string, fn: () => Promise<Json>) => {
    setBusy(true)
    try {
      const data = await fn()
      setOut(`${label}\n${JSON.stringify(data, null, 2)}`)
    } catch (e) {
      setOut(`${label}\nERROR: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setBusy(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="ei-page-wide">
        <p>กำลังโหลด…</p>
      </div>
    )
  }

  if (!user || user.role !== 'root') {
    return <Navigate to="/login?next=/root/api-lab" replace />
  }

  return (
    <div className="ei-page-wide">
      <h1>ทดสอบ API (Root)</h1>
      <p className="ei-muted-block">
        เรียก endpoint จริงของเซิร์ฟเวอร์ — ต้องล็อกอินเป็น <code>root@demo.local</code> รหัส <code>demo</code>
      </p>
      <p>
        <Link to="/root">← Root dashboard</Link>
      </p>

      <div className="ei-panel">
        <h2>รายการ endpoint</h2>
        <div className="ei-stack" style={{ gap: '0.5rem' }}>
          <button type="button" className="ei-btn-small" disabled={busy} onClick={() => run('GET /api/events', () => apiJson('/events'))}>
            1) ชื่อ / รายการงาน — GET /api/events
          </button>
          <button
            type="button"
            className="ei-btn-small"
            disabled={busy}
            onClick={() => run('GET /api/events/ev-001', () => apiJson('/events/ev-001'))}
          >
            4) รายละเอียดอีเวนต์ — GET /api/events/ev-001
          </button>
          <button
            type="button"
            className="ei-btn-small"
            disabled={busy}
            onClick={() => run('GET companies', () => apiJson('/events/ev-001/companies'))}
          >
            1) ชื่อบริษัทในบูธ — GET /api/events/ev-001/companies
          </button>
          <button
            type="button"
            className="ei-btn-small"
            disabled={busy}
            onClick={() =>
              void run('GET company detail', async () => {
                const { companies } = await apiJson<{ companies: { id: string }[] }>('/events/ev-001/companies')
                const id = companies[0]?.id
                if (!id) throw new Error('No company')
                return apiJson(`/companies/${id}`)
              })
            }
          >
            2) รายละเอียดบริษัทตัวแรกใน ev-001 — GET /api/companies/:id
          </button>
          <button
            type="button"
            className="ei-btn-small"
            disabled={busy}
            onClick={() =>
              void run('GET pain-points', async () => {
                const { companies } = await apiJson<{ companies: { id: string }[] }>('/events/ev-001/companies')
                const id = companies[0]?.id
                if (!id) throw new Error('No company')
                return apiJson(`/companies/${id}/pain-points`)
              })
            }
          >
            3) Pain point ของบริษัทตัวแรก — GET /api/companies/:id/pain-points
          </button>
          <button
            type="button"
            className="ei-btn-small"
            disabled={busy}
            onClick={() => run('GET match-data', () => apiJson('/events/ev-001/match-data'))}
          >
            ข้อมูลจับคู่ (รวม solutions + pain) — GET /api/events/ev-001/match-data
          </button>
          <button type="button" className="ei-btn-small" disabled={busy} onClick={() => run('GET /api/auth/me', () => apiJson('/auth/me'))}>
            GET /api/auth/me (ต้องมี token)
          </button>
        </div>
      </div>

      <div className="ei-panel">
        <h2>ผลลัพธ์</h2>
        <pre
          style={{
            margin: 0,
            fontSize: '0.78rem',
            overflow: 'auto',
            maxHeight: 420,
            color: 'var(--ei-muted)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {out || '—'}
        </pre>
      </div>
    </div>
  )
}
