import React from 'react'
import './PrimaryButton.css'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'default' | 'secondary'
  fullWidth?: boolean
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'default',
  fullWidth = false,
  type = 'button',
  ariaLabel,
}: PrimaryButtonProps) {
  const classNames = [
    'primary-button',
    variant === 'secondary' ? 'secondary' : '',
    fullWidth ? 'full-width' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
    >
      {loading ? <span className="spinner" /> : children}
    </button>
  )
}
