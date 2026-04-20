import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MagicButton from '../components/MagicButton'
import Logo from '../components/Logo'
import styles from './HomePage.module.css'

type Language = 'en' | 'de'
type Theme = 'animals' | 'friendship' | 'bedtime' | 'adventure' | undefined

const CATEGORIES: { value: Theme; labelEn: string; labelDe: string }[] = [
  { value: undefined, labelEn: '✨ Any', labelDe: '✨ Alle' },
  { value: 'animals', labelEn: '🐾 Animals', labelDe: '🐾 Tiere' },
  { value: 'friendship', labelEn: '💛 Friends', labelDe: '💛 Freunde' },
  { value: 'bedtime', labelEn: '🌙 Bedtime', labelDe: '🌙 Gute Nacht' },
  { value: 'adventure', labelEn: '🗺️ Adventure', labelDe: '🗺️ Abenteuer' },
]

const UI = {
  en: {
    taglineTop: 'Instant magic stories',
    taglineBottom: 'for little listeners',
    categoryLabel: 'Pick a theme:',
    hint: 'Tap the button for a story ✨',
    error: "Oops! Could not get a story. Tap again to try!",
  },
  de: {
    taglineTop: 'Zaubergeschichten',
    taglineBottom: 'für kleine Zuhörer',
    categoryLabel: 'Wähle ein Thema:',
    hint: 'Tippe den Knopf für eine Geschichte ✨',
    error: 'Ups! Keine Geschichte. Nochmal tippen!',
  },
}

function loadSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem('tinyteller-language')
    if (saved === 'en' || saved === 'de') return saved
  } catch {
    // localStorage unavailable
  }
  return 'en'
}

export default function HomePage() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [language, setLanguage] = useState<Language>(loadSavedLanguage)
  const [theme, setTheme] = useState<Theme>(undefined)

  const t = UI[language]

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    try {
      localStorage.setItem('tinyteller-language', lang)
    } catch {
      // localStorage unavailable
    }
  }

  const handleGenerate = async () => {
    setError(false)
    setLoading(true)
    try {
      const body: Record<string, string> = { language }
      if (theme) body.theme = theme

      const resp = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
            {t.taglineTop}
            <br />
            {t.taglineBottom}
          </p>
        </header>

        <div className={styles.languageToggle} role="group" aria-label="Story language">
          <button
            className={`${styles.langButton} ${language === 'en' ? styles.langActive : ''}`}
            onClick={() => handleLanguageChange('en')}
            aria-pressed={language === 'en'}
          >
            🇬🇧 EN
          </button>
          <button
            className={`${styles.langButton} ${language === 'de' ? styles.langActive : ''}`}
            onClick={() => handleLanguageChange('de')}
            aria-pressed={language === 'de'}
          >
            🇩🇪 DE
          </button>
        </div>

        <div className={styles.categorySection}>
          <p className={styles.categoryLabel}>{t.categoryLabel}</p>
          <div className={styles.categoryGrid} role="group" aria-label={t.categoryLabel}>
            {CATEGORIES.map((cat) => (
              <button
                key={String(cat.value)}
                className={`${styles.categoryButton} ${theme === cat.value ? styles.categoryActive : ''}`}
                onClick={() => setTheme(cat.value)}
                aria-pressed={theme === cat.value}
              >
                {language === 'de' ? cat.labelDe : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonWrap}>
          <MagicButton onClick={handleGenerate} isLoading={isLoading} isError={isError} language={language} />
        </div>

        {isError && (
          <p className={styles.errorText} role="alert">
            {t.error}
          </p>
        )}

        {!isLoading && !isError && (
          <p className={styles.hint}>{t.hint}</p>
        )}
      </div>
    </main>
  )
}
