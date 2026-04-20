// Minimal auth helper for storing/retrieving the JWT used by the frontend.
// Keeps token access in one place so we can later switch storage strategy.
// In the MVP we support disabling auth. Set VITE_ENABLE_AUTH=true to enable storing tokens.
const ENABLE_AUTH = typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_ENABLE_AUTH === 'true'

export function setToken(token: string) {
  if (!ENABLE_AUTH) return
  localStorage.setItem('authToken', token)
}

export function getToken(): string | null {
  if (!ENABLE_AUTH) return null
  return localStorage.getItem('authToken')
}

export function clearToken() {
  if (!ENABLE_AUTH) return
  localStorage.removeItem('authToken')
}

export function authHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default {
  setToken,
  getToken,
  clearToken,
  authHeaders,
}
