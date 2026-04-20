// Minimal auth helper for storing/retrieving the JWT used by the frontend.
// Keeps token access in one place so we can later switch storage strategy.
export function setToken(token: string) {
  localStorage.setItem('authToken', token)
}

export function getToken(): string | null {
  return localStorage.getItem('authToken')
}

export function clearToken() {
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
