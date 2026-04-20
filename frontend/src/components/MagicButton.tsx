import styles from './MagicButton.module.css'

interface MagicButtonProps {
  onClick: () => void | Promise<void>
  isLoading?: boolean
  isError?: boolean
  language?: 'en' | 'de'
}

const ARIA_LABELS = {
  en: {
    generating: 'Generating your story…',
    tryAgain: 'Try again',
    generate: 'Generate a magic story',
  },
  de: {
    generating: 'Geschichte wird erstellt…',
    tryAgain: 'Nochmal versuchen',
    generate: 'Eine Zaubergeschichte erstellen',
  },
}

export default function MagicButton({ onClick, isLoading = false, isError = false, language = 'en' }: MagicButtonProps) {
  const handleClick = () => {
    if (!isLoading) onClick()
  }

  const labels = ARIA_LABELS[language]

  return (
    <button
      className={`${styles.button} ${isLoading ? styles.loading : ''} ${isError ? styles.error : ''}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-label={isLoading ? labels.generating : isError ? labels.tryAgain : labels.generate}
    >
      <span className={styles.inner} aria-hidden="true">
        {isLoading ? (
          <span className={styles.spinner} />
        ) : (
          <span className={styles.sparkle}>✨</span>
        )}
      </span>
    </button>
  )
}
