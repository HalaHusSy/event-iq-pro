const TOKEN_KEY = 'em_auth_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  const t = getToken()
  if (t) headers.set('Authorization', `Bearer ${t}`)
  const res = await fetch(`/api${path}`, { ...init, headers })
  const text = await res.text()
  let body: unknown = null
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = text
  }
  if (!res.ok) {
    const msg = typeof body === 'object' && body && 'error' in body ? String((body as { error: string }).error) : text
    throw new Error(msg || `HTTP ${res.status}`)
  }
  return body as T
}
