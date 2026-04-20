import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import styles from './StoryPage.module.css'

interface Story {
  id: string
  title: string
  content: string
  theme: string
  createdAt: string
}

export default function StoryPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

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
        <span className={styles.loadingSpinner} aria-label="Loading story…" />
      </div>
    )
  }

  if (isError || !story) {
    return (
      <div className={styles.centered} role="alert">
        <p className={styles.errorText}>Could not load story.</p>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          Back to Home
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
