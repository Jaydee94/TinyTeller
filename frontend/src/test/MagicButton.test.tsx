import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MagicButton from '../components/MagicButton'

describe('MagicButton', () => {
  it('renders with sparkle when idle', () => {
    render(<MagicButton onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByLabelText('Generate a magic story')).toBeInTheDocument()
  })

  it('shows loading aria-label when isLoading is true', () => {
    render(<MagicButton onClick={() => {}} isLoading />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-busy', 'true')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAccessibleName('Generating your story…')
  })

  it('shows error aria-label when isError is true', () => {
    render(<MagicButton onClick={() => {}} isError />)
    expect(screen.getByLabelText('Try again')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<MagicButton onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when loading', () => {
    const onClick = vi.fn()
    render(<MagicButton onClick={onClick} isLoading />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
