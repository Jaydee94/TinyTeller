import React from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/register')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Branding and tagline */}
        <div className="landing-header">
          <h1 className="landing-title">
            <span className="sparkle">✨</span> TinyTeller
          </h1>
          <p className="landing-tagline">
            Instant Magic Stories for
            <br />
            Little Listeners
          </p>
        </div>

        {/* Primary CTA */}
        <div className="landing-cta">
          <PrimaryButton onClick={handleGetStarted} fullWidth>
            Get Started
          </PrimaryButton>
        </div>

        {/* Subtext */}
        <p className="landing-subtext">Free • No Ads • No Hassle</p>

        {/* Secondary action */}
        <div className="landing-secondary">
          <p className="secondary-text">Already have an account?</p>
          <button className="login-link" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}
