import { type FormEvent, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function LoginPage() {
  const { login, registerVisitor } = useAuth()
  const [sp] = useSearchParams()
  const next = sp.get('next') || '/events'
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      if (mode === 'login') await login(email, password)
      else await registerVisitor(email, password, name || email.split('@')[0])
      nav(next, { replace: true })
    } catch (er) {
      setErr(er instanceof Error ? er.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="ei-page-wide" style={{ maxWidth: 480 }}>
      <h1>{mode === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียนผู้เยี่ยมชม'}</h1>
      <p className="ei-muted-block">
        บัญชีทดสอบ (รหัสผ่านทุกบัญชี: <strong>demo</strong>) — root@demo.local · admin.ev1@demo.local · visitor@demo.local
      </p>

      <div className="ei-panel">
        <div className="ei-inline" style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            className={`ei-btn-small ${mode === 'login' ? 'ei-active' : ''}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`ei-btn-small ${mode === 'register' ? 'ei-active' : ''}`}
            onClick={() => setMode('register')}
          >
            Register (visitor)
          </button>
        </div>

        <form className="ei-stack" onSubmit={onSubmit}>
          {mode === 'register' && (
            <div className="ei-form-row">
              <label className="ei-label">ชื่อที่แสดง</label>
              <input className="ei-input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className="ei-form-row">
            <label className="ei-label">อีเมล</label>
            <input
              type="email"
              className="ei-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="ei-form-row">
            <label className="ei-label">รหัสผ่าน</label>
            <input
              type="password"
              className="ei-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {err && <p style={{ color: '#fca5a5', margin: 0 }}>{err}</p>}
          <button type="submit" className="ei-btn ei-btn-primary" disabled={busy}>
            {busy ? '…' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัคร'}
          </button>
        </form>
      </div>

      <p className="ei-muted-block">
        <Link to="/" style={{ color: 'var(--ei-accent-2)' }}>
          ← หน้าแรก
        </Link>
      </p>
    </div>
  )
}
