import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const nav: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'หน้าแรก', end: true },
  { to: '/events', label: 'งาน & จับคู่' },
  { to: '/platform', label: 'คู่มือระบบ' },
  { to: '/root', label: 'Root' },
]

export function RootLayout() {
  const { user, logout, loading } = useAuth()

  return (
    <>
      <div className="ei-noise" aria-hidden />
      <div className="ei-orb ei-orb-1" aria-hidden />
      <div className="ei-orb ei-orb-2" aria-hidden />
      <div className="ei-shell">
        <header className="ei-header">
          <NavLink to="/" className="ei-logo" end>
            <span className="ei-logo-dot" />
            EventIQ
          </NavLink>
          <nav className="ei-nav" aria-label="หลัก">
            {nav.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'ei-active' : undefined)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="ei-inline" style={{ gap: '0.5rem' }}>
            {!loading && user ? (
              <>
                <span className="ei-lang" title={user.email}>
                  {user.role}
                </span>
                <button type="button" className="ei-btn-small" onClick={() => logout()}>
                  ออก
                </button>
              </>
            ) : (
              <Link className="ei-btn-small" to="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            )}
          </div>
        </header>
        <main className="ei-main">
          <Outlet />
        </main>
        <footer className="ei-footer">
          <p>© 2026 EventIQ · API http://localhost:3001 · รัน npm run dev:full</p>
        </footer>
      </div>
    </>
  )
}
