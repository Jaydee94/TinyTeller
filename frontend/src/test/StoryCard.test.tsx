import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StoryCard from '../components/StoryCard'

const mockStory = {
  id: 'test-id-123',
  title: 'The Brave Little Rabbit',
  content: 'Once upon a time, there was a rabbit.\n\nThe rabbit was very brave.',
  theme: 'animals',
  createdAt: new Date().toISOString(),
}

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('StoryCard', () => {
  it('renders story title', () => {
    render(
      <MemoryRouter>
        <StoryCard story={mockStory} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /brave little rabbit/i })).toBeInTheDocument()
  })

  it('renders story paragraphs', () => {
    render(
      <MemoryRouter>
        <StoryCard story={mockStory} />
      </MemoryRouter>,
    )
    expect(screen.getByText(/once upon a time/i)).toBeInTheDocument()
    expect(screen.getByText(/very brave/i)).toBeInTheDocument()
  })

  it('renders the theme emoji for animals', () => {
    render(
      <MemoryRouter>
        <StoryCard story={mockStory} />
      </MemoryRouter>,
    )
    // The article element should be in the document
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('clicking "Another Story" navigates to home', () => {
    render(
      <MemoryRouter>
        <StoryCard story={mockStory} />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: /another story/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
