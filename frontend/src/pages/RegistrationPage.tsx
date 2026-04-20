import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegistrationPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || `Registration failed (${res.status})`)
        setLoading(false)
        return
      }

      if (data?.token) {
        // Store token only when auth is enabled for the MVP. Controlled by VITE_ENABLE_AUTH.
        try {
          const { setToken } = await import('../lib/auth')
          setToken(data.token)
        } catch (e) {
          // Ignore token store failures for demo flow
        }
      }
      navigate('/app')
    } catch (err) {
      // Network or unexpected error
      // Keep message simple for users
      setError((err as Error).message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: 520 }}>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        {error && (
          <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>
        )}

        <button type="submit" disabled={loading} style={{ padding: '10px 16px' }}>
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
