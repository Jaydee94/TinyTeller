import { useNavigate } from 'react-router-dom'
import styles from './StoryCard.module.css'

interface Story {
  id: string
  title: string
  content: string
  theme: string
  createdAt: string
}

interface StoryCardProps {
  story: Story
}

const THEME_EMOJI: Record<string, string> = {
  animals: '🐾',
  friendship: '💛',
  bedtime: '🌙',
  adventure: '🗺️',
}

export default function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate()
  const emoji = THEME_EMOJI[story.theme] ?? '✨'

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.emoji} aria-hidden="true">{emoji}</span>
        <h1 className={styles.title}>{story.title}</h1>
      </header>

      <div className={styles.content}>
        {story.content.split('\n\n').map((paragraph, i) => (
          <p key={i} className={styles.paragraph}>{paragraph}</p>
        ))}
      </div>

      <footer className={styles.footer}>
        <button
          className={styles.again}
          onClick={() => navigate('/')}
          aria-label="Read another story"
        >
          ✨ Another Story
        </button>
      </footer>
    </article>
  )
}
