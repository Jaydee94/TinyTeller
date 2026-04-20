import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './StoryDisplay.css'

export default function StoryDisplay() {
  const navigate = useNavigate()
  const { storyId } = useParams()

  // MVP: show a placeholder story. In production we'll fetch /api/stories/:id
  const story = {
    id: storyId,
    title: 'The Brave Little Rabbit',
    content:
      "Once upon a time, in a meadow far away, there lived a little rabbit named Pip. Pip was small, but she had a big, brave heart. One day Pip decided to explore beyond the fence..."
  }

  return (
    <div className="story-display">
      <div className="story-container">
        <h1 className="story-title">{story.title}</h1>
        <div className="story-body" role="article" aria-label="Story content">
          {story.content}
        </div>

        <div className="story-actions">
          <button className="secondary" onClick={() => navigate('/app')}>
            Back
          </button>
          <button className="secondary" onClick={() => navigate('/app')}>New Story</button>
        </div>
      </div>
    </div>
  )
}
