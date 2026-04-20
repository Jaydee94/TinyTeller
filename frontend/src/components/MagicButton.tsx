import styles from './MagicButton.module.css'

interface MagicButtonProps {
  onClick: () => void | Promise<void>
  isLoading?: boolean
  isError?: boolean
}

export default function MagicButton({ onClick, isLoading = false, isError = false }: MagicButtonProps) {
  const handleClick = () => {
    if (!isLoading) onClick()
  }

  return (
    <button
      className={`${styles.button} ${isLoading ? styles.loading : ''} ${isError ? styles.error : ''}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-label={isLoading ? 'Generating your story…' : isError ? 'Try again' : 'Generate a magic story'}
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
