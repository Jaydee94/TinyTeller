import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MagicButton from '../components/MagicButton'
import Logo from '../components/Logo'
import styles from './HomePage.module.css'

type Language = 'en' | 'de'

export default function HomePage() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [language, setLanguage] = useState<Language>('en')

  const handleGenerate = async () => {
    setError(false)
    setLoading(true)
    try {
      const resp = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      })

      if (!resp.ok) throw new Error('Generate failed')

      const data = await resp.json()
      navigate(`/story/${data.id}`)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo size={72} className={styles.logoImage} />
          <h1 className={styles.title}>TinyTeller</h1>
          <p className={styles.tagline}>
            Instant magic stories
            <br />
            for little listeners
          </p>
        </header>

        <div className={styles.languageToggle} role="group" aria-label="Story language">
          <button
            className={`${styles.langButton} ${language === 'en' ? styles.langActive : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            🇬🇧 EN
          </button>
          <button
            className={`${styles.langButton} ${language === 'de' ? styles.langActive : ''}`}
            onClick={() => setLanguage('de')}
            aria-pressed={language === 'de'}
          >
            🇩🇪 DE
          </button>
        </div>

        <div className={styles.buttonWrap}>
          <MagicButton onClick={handleGenerate} isLoading={isLoading} isError={isError} />
        </div>

        {isError && (
          <p className={styles.errorText} role="alert">
            Oops! Could not get a story. Tap again to try!
          </p>
        )}

        {!isLoading && !isError && (
          <p className={styles.hint}>Tap the button for a story ✨</p>
        )}
      </div>
    </main>
  )
}
