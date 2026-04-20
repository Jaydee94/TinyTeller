import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import styles from './StoryPage.module.css'

interface Story {
  id: string
  title: string
  content: string
  theme: string
  language?: string
  createdAt: string
}

const PAGE_UI = {
  en: {
    loadingLabel: 'Loading story…',
    errorText: 'Could not load story.',
    backButton: 'Back to Home',
  },
  de: {
    loadingLabel: 'Geschichte wird geladen…',
    errorText: 'Geschichte konnte nicht geladen werden.',
    backButton: 'Zurück',
  },
}

function getSavedLanguage(): 'en' | 'de' {
  try {
    const saved = localStorage.getItem('tinyteller-language')
    if (saved === 'de') return 'de'
  } catch {
    // localStorage unavailable
  }
  return 'en'
}

export default function StoryPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  const uiLanguage = story?.language === 'de' || getSavedLanguage() === 'de' ? 'de' : 'en'
  const t = PAGE_UI[uiLanguage]

  useEffect(() => {
    if (!id) {
      navigate('/', { replace: true })
      return
    }

    setLoading(true)
    setError(false)

    fetch(`/api/stories/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then((data: Story) => {
        setStory(data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, navigate])

  if (isLoading) {
    return (
      <div className={styles.centered} aria-live="polite">
        <span className={styles.loadingSpinner} aria-label={t.loadingLabel} />
      </div>
    )
  }

  if (isError || !story) {
    return (
      <div className={styles.centered} role="alert">
        <p className={styles.errorText}>{t.errorText}</p>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          {t.backButton}
        </button>
      </div>
    )
  }

  return (
    <main className={styles.page}>
      <StoryCard story={story} />
    </main>
  )
}
