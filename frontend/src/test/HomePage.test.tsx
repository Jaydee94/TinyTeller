import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
    vi.restoreAllMocks()
  })

  it('renders TinyTeller title', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByText('TinyTeller')).toBeInTheDocument()
  })

  it('renders the magic button', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByLabelText('Generate a magic story')).toBeInTheDocument()
  })

  it('navigates to story page on successful API call', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'story-abc-123' }),
    } as Response))

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByLabelText('Generate a magic story'))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/story/story-abc-123')
    })
  })

  it('shows error message on API failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('Network error')))

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByLabelText('Generate a magic story'))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(screen.getByText(/oops/i)).toBeInTheDocument()
  })
})
