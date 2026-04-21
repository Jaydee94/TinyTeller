import { useNavigate } from 'react-router-dom'
import { useTTS } from '../hooks/useTTS'
import styles from './StoryCard.module.css'

interface Story {
  id: string
  title: string
  content: string
  theme: string
  language?: string
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

const LANGUAGE_LABEL: Record<string, string> = {
  en: '🇬🇧 EN',
  de: '🇩🇪 DE',
}

const ANOTHER_STORY_LABEL: Record<string, string> = {
  en: '✨ Another Story',
  de: '✨ Noch eine Geschichte',
}

const TTS_LABELS: Record<string, { play: string; pause: string; stop: string }> = {
  en: { play: '🔊 Read Aloud', pause: '⏸ Pause', stop: '⏹ Stop' },
  de: { play: '🔊 Vorlesen', pause: '⏸ Pause', stop: '⏹ Stopp' },
}

export default function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate()
  const emoji = THEME_EMOJI[story.theme] ?? '✨'
  const languageLabel = story.language ? LANGUAGE_LABEL[story.language] : null
  const anotherStoryLabel = ANOTHER_STORY_LABEL[story.language ?? 'en'] ?? ANOTHER_STORY_LABEL.en
  const ttsLabels = TTS_LABELS[story.language ?? 'en'] ?? TTS_LABELS.en

  const fullText = `${story.title}. ${story.content}`
  const { ttsState, supported, toggle, stop } = useTTS(fullText, story.language ?? 'en')

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.emoji} aria-hidden="true">{emoji}</span>
        <h1 className={styles.title}>{story.title}</h1>
        {languageLabel && (
          <span className={styles.languageBadge} aria-label={`Language: ${story.language}`}>
            {languageLabel}
          </span>
        )}
      </header>

      <div className={styles.content}>
        {story.content.split('\n\n').map((paragraph, i) => (
          <p key={i} className={styles.paragraph}>{paragraph}</p>
        ))}
      </div>

      <footer className={styles.footer}>
        {supported && (
          <div className={styles.ttsControls}>
            <button
              className={`${styles.ttsButton} ${ttsState === 'playing' ? styles.ttsButtonActive : ''}`}
              onClick={toggle}
              aria-label={ttsState === 'playing' ? ttsLabels.pause : ttsLabels.play}
            >
              {ttsState === 'playing' ? ttsLabels.pause : ttsLabels.play}
            </button>
            {ttsState !== 'idle' && (
              <button
                className={styles.ttsStopButton}
                onClick={stop}
                aria-label={ttsLabels.stop}
              >
                {ttsLabels.stop}
              </button>
            )}
          </div>
        )}
        <button
          className={styles.again}
          onClick={() => navigate('/')}
          aria-label={anotherStoryLabel}
        >
          {anotherStoryLabel}
        </button>
      </footer>
    </article>
  )
}
