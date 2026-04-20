import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './StoryDisplay.css'

type Story = {
  id: string | undefined
  title: string
  content: string
}

function uuidv4() {
  // Lightweight UUID v4 generator for MVP (not cryptographically secure)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function StoryDisplay() {
  const navigate = useNavigate()
  const { storyId } = useParams()

  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchStory = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // MVP: simulate fetching the story. In production call `/api/stories/:id`.
        await new Promise((res) => setTimeout(res, 400))

        // Create a plausible story based on the id so navigation shows a different story
        const id = storyId || '00000000-0000-0000-0000-000000000000'
        const suffix = id.slice(-4)
        const fetched: Story = {
          id,
          title: `Tiny Tale ${suffix}`,
          content:
            "Once upon a time, a tiny tale unfolded. The stars listened as the moon told secrets and the little listener fell asleep with a smile."
        }

        if (!cancelled) setStory(fetched)
      } catch (err) {
        if (!cancelled) setError('Failed to load story')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchStory()

    return () => {
      cancelled = true
    }
  }, [storyId])

  const handleNewStory = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // MVP: simulate POST /api/stories/generate
      await new Promise((res) => setTimeout(res, 900))
      const newId = uuidv4()
      navigate(`/app/story/${newId}`)
    } catch (err) {
      setError('Could not generate new story. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="story-display">
      <div className="story-container">
        {isLoading ? (
          <div className="story-body" role="status" aria-live="polite">
            Crafting your story...
          </div>
        ) : error ? (
          <div className="story-body" role="alert">
            <p>{error}</p>
            <div className="story-actions">
              <button className="secondary" onClick={() => navigate('/app')}>
                Back
              </button>
              <button className="secondary" onClick={handleNewStory}>
                Try Again
              </button>
            </div>
          </div>
        ) : story ? (
          <>
            <h1 className="story-title">{story.title}</h1>
            <div className="story-body" role="article" aria-label="Story content">
              {story.content}
            </div>

            <div className="story-actions">
              <button className="secondary" onClick={() => navigate('/app')}>
                Back
              </button>
              <button className="secondary" onClick={handleNewStory}>
                New Story
              </button>
            </div>
          </>
        ) : (
          <div className="story-body">Story not found</div>
        )}
      </div>
    </div>
  )
}
