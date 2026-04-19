import React, { useEffect, useState } from 'react'

export default function App() {
  const [health, setHealth] = useState<string>('loading')

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setHealth(d.status || 'ok'))
      .catch(() => setHealth('unreachable'))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>TinyTeller</h1>
      <p>Backend health: {health}</p>
    </div>
  )
}
