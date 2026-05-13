import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { apiJson, getToken, setToken } from '../lib/api'

export type AuthUser = {
  id: string
  email: string
  name: string
  role: 'root' | 'event_admin' | 'visitor' | string
}

type MeResponse = {
  user: AuthUser
  managedEventIds: string[]
  syncVersion: number
}

type AuthCtx = {
  user: AuthUser | null
  managedEventIds: string[]
  loading: boolean
  syncVersion: number
  login: (email: string, password: string) => Promise<void>
  registerVisitor: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  refreshMe: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [managedEventIds, setManagedEventIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [syncVersion, setSyncVersion] = useState(0)

  const refreshMe = useCallback(async () => {
    const t = getToken()
    if (!t) {
      setUser(null)
      setManagedEventIds([])
      setLoading(false)
      return
    }
    try {
      const data = await apiJson<MeResponse>('/auth/me')
      setUser(data.user)
      setManagedEventIds(data.managedEventIds ?? [])
      setSyncVersion(data.syncVersion ?? 0)
    } catch {
      setToken(null)
      setUser(null)
      setManagedEventIds([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshMe()
  }, [refreshMe])

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiJson<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setToken(res.token)
    setUser(res.user)
    await refreshMe()
  }, [refreshMe])

  const registerVisitor = useCallback(async (email: string, password: string, name: string) => {
    const res = await apiJson<{ token: string; user: AuthUser }>('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    setToken(res.token)
    setUser(res.user)
    await refreshMe()
  }, [refreshMe])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setManagedEventIds([])
  }, [])

  const value = useMemo(
    () =>
      ({
        user,
        managedEventIds,
        loading,
        syncVersion,
        login,
        registerVisitor,
        logout,
        refreshMe,
      }) satisfies AuthCtx,
    [user, managedEventIds, loading, syncVersion, login, registerVisitor, logout, refreshMe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth outside AuthProvider')
  return ctx
}

export function canManageEvent(managedIds: string[], role: string, eventId: string) {
  if (role === 'root') return true
  return managedIds.includes(eventId)
}
