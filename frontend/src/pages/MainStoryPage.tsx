import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MagicButton from '../components/MagicButton'
import './MainStoryPage.css'

export default function MainStoryPage() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateStory = async () => {
    setError(null)
    setLoading(true)
    try {
      // For MVP we simulate the API call and navigate to story display with a fake id
      await new Promise((res) => setTimeout(res, 900))
      // In future: call POST /api/stories/generate and use returned id
      navigate('/app/story/00000000-0000-0000-0000-000000000001')
    } catch (err) {
      setError('Could not generate story. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-story-page">
      <div className="main-center">
        <h2 className="main-title">Magic</h2>
        <p className="main-sub">Tap the button to generate a tiny story</p>

        <div className="magic-button-wrap">
          <MagicButton onClick={handleGenerateStory} isLoading={isLoading} isError={!!error} />
        </div>

        {error && (
          <div className="error-row">
            <p className="error-text">{error}</p>
            <button className="retry" onClick={handleGenerateStory}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
