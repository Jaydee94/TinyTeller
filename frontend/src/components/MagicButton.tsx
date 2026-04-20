import React from 'react'

interface MagicButtonProps {
  onClick: () => void | Promise<void>
  isLoading?: boolean
  isError?: boolean
}

export default function MagicButton({ onClick, isLoading, isError }: MagicButtonProps) {
  return (
    <button
      className={`magic-button ${isLoading ? 'loading' : ''} ${isError ? 'error' : ''}`}
      onClick={() => !isLoading && onClick()}
      aria-pressed={isLoading}
      aria-busy={isLoading}
      title={isError ? 'Retry' : 'Magic Button'}
    >
      <span className="magic-inner">
        {isLoading ? <span className="spinner" aria-hidden /> : <span className="sparkle">✨</span>}
      </span>
    </button>
  )
}
