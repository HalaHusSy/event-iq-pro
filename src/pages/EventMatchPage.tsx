import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { rankExhibitorsForPain } from '../domain/matching'
import type { Exhibitor, SolutionUseCase } from '../domain/types'
import { apiJson } from '../lib/api'
import { useRealtimeSync } from '../hooks/useRealtimeSync'

type MatchEx = {
  id: string
  companyName: string
  boothLabel: string
  shortBio: string
  solutions: { solutionName: string; useCases: string[] }[]
  painPoints: { title: string; body: string }[]
}

function toExhibitor(ex: MatchEx): Exhibitor {
  const painBlob = ex.painPoints.map((p) => `${p.title} ${p.body}`).join(' ')
  const solutions: SolutionUseCase[] = ex.solutions.map((s, i) => ({
    id: `${ex.id}-s-${i}`,
    solutionName: s.solutionName,
    useCases: s.useCases,
  }))
  return {
    id: ex.id,
    companyName: ex.companyName,
    boothLabel: ex.boothLabel,
    shortBio: `${ex.shortBio} ${painBlob}`,
    solutions,
  }
}

export function EventMatchPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const [eventName, setEventName] = useState('')
  const [rows, setRows] = useState<MatchEx[]>([])
  const [pain, setPain] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const load = useCallback(async () => {
    if (!eventId) return
    const ev = await apiJson<{ event: { name: string } }>(`/events/${eventId}`)
    setEventName(ev.event.name)
    const md = await apiJson<{ exhibitors: MatchEx[] }>(`/events/${eventId}/match-data`)
    setRows(md.exhibitors)
  }, [eventId])

  useRealtimeSync(() => {
    void load()
  })

  useEffect(() => {
    void load()
  }, [load])

  const top = useMemo(() => {
    if (!submitted) return []
    const exs = rows.map(toExhibitor)
    return rankExhibitorsForPain(pain, exs, 5)
  }, [rows, pain, submitted])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!eventId) return <Navigate to="/events" replace />

  return (
    <div className="ei-page-wide">
      <p className="ei-muted-block" style={{ marginBottom: '0.5rem' }}>
        <Link to="/events" style={{ color: 'var(--ei-accent-2)' }}>
          ← งานทั้งหมด
        </Link>
      </p>
      <h1>{eventName}</h1>
      <p>
        ลองใช้คำจาก <strong>pain library</strong> ที่ admin กำหนดให้แต่ละบริษัท (เช่น ลูกค้า, chat, omnichannel, ยอดขาย, สต็อก) เพื่อให้คะแนนจับคู่ขึ้น
      </p>

      <div className="ei-panel">
        <form className="ei-stack" onSubmit={onSubmit}>
          <div className="ei-form-row">
            <label className="ei-label">Pain point ของคุณ</label>
            <textarea
              className="ei-textarea"
              style={{ minHeight: 120 }}
              value={pain}
              onChange={(e) => {
                setPain(e.target.value)
                setSubmitted(false)
              }}
              required
            />
          </div>
          <button type="submit" className="ei-btn ei-btn-primary">
            ค้นหา Top 5
          </button>
        </form>
      </div>

      {submitted &&
        (rows.length === 0 ? (
          <div className="ei-panel">
            <p className="ei-muted-block" style={{ margin: 0 }}>
              ยังไม่มีบริษัทในงานนี้
            </p>
          </div>
        ) : top.length === 0 ? (
          <div className="ei-panel">
            <p className="ei-muted-block" style={{ margin: 0 }}>
              ไม่มีคำตรงกับข้อมูล — ลองคำหลักจาก pain ตัวอย่างของบริษัทในตารางด้านล่าง (ดูที่หน้า admin หรือ API pain-points)
            </p>
          </div>
        ) : (
          <section>
            <h2 style={{ fontSize: '1.2rem' }}>Top {top.length}</h2>
            {top.map(({ exhibitor, score, matchedTerms }, i) => (
              <article key={exhibitor.id} className="ei-result-card">
                <div className="ei-meta">
                  #{i + 1} · score {score}
                  {matchedTerms.length > 0 ? ` · ${matchedTerms.slice(0, 6).join(', ')}` : ''}
                </div>
                <h3>{exhibitor.companyName}</h3>
                <p className="ei-muted-block" style={{ margin: 0 }}>
                  บูธ {exhibitor.boothLabel}
                </p>
              </article>
            ))}
          </section>
        ))}
    </div>
  )
}
