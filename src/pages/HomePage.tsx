import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiJson } from '../lib/api'
import { useRealtimeSync } from '../hooks/useRealtimeSync'

export function HomePage() {
  const [count, setCount] = useState<number | null>(null)

  const load = async () => {
    try {
      const d = await apiJson<{ events: unknown[] }>('/events')
      setCount(d.events.length)
    } catch {
      setCount(null)
    }
  }

  useRealtimeSync(() => {
    void load()
  })

  useEffect(() => {
    void load()
  }, [])

  return (
    <>
      <section className="ei-hero">
        <div className="ei-badge">Exhibition matching · API + real-time</div>
        <h1>จับคู่บูธจาก pain point ไปถึง solution &amp; use case</h1>
        <p className="ei-sub">
          แบ็กเอนด์ SQLite + REST API + Socket.io — ข้อมูล mock มี {count ?? '…'} งานในระบบ (อัปเดตสดจากเซิร์ฟเวอร์)
        </p>
        <div className="ei-cta-row">
          <Link className="ei-btn ei-btn-primary" to="/events">
            ดูงาน &amp; จับคู่
          </Link>
          <Link className="ei-btn ei-btn-secondary" to="/login">
            Login / Register
          </Link>
        </div>
      </section>

      <section className="ei-features" aria-label="ความสามารถ" id="platform">
        <Link className="ei-card" to="/root">
          <div className="ei-tag">Root</div>
          <h3>สร้างงาน &amp; admin</h3>
          <p>แบบ 2.2: root แต่งตั้ง event admin</p>
        </Link>
        <Link className="ei-card" to="/events">
          <div className="ei-tag">ผู้เยี่ยมชม</div>
          <h3>Pain → Top 5</h3>
          <p>ค้นจาก solution + pain library ของแต่ละบริษัท</p>
        </Link>
        <Link className="ei-card" to="/platform">
          <div className="ei-tag">แผน</div>
          <h3>โมเดล B2B vs self-serve</h3>
          <p>อ่านคำแนะนำสำหรับโปรเจกต์จริง</p>
        </Link>
        <Link className="ei-card" to="/root/api-lab">
          <div className="ei-tag">Root</div>
          <h3>ทดสอบ API</h3>
          <p>ดู JSON จาก endpoint จริง</p>
        </Link>
      </section>

      <div className="ei-section-title">
        <h2>โฟลว์หลัก</h2>
      </div>
      <section className="ei-steps" aria-label="ขั้นตอน">
        <div className="ei-step">
          <div className="ei-num">API</div>
          <h4>งาน / บริษัท / pain</h4>
          <p>GET events, companies, pain-points, รายละเอียดบริษัท</p>
        </div>
        <div className="ei-step">
          <div className="ei-num">Live</div>
          <h4>Socket.io sync</h4>
          <p>หน้าเว็บรีเฟรชรายการเมื่อข้อมูลเปลี่ยน</p>
        </div>
        <div className="ei-step">
          <div className="ei-num">Auth</div>
          <h4>3 ระดับ</h4>
          <p>visitor · event_admin · root</p>
        </div>
      </section>
    </>
  )
}
