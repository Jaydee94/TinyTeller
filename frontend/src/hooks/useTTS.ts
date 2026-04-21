import { useCallback, useEffect, useRef, useState } from 'react'

export type TTSState = 'idle' | 'playing' | 'paused'

const DEFAULT_SPEECH_RATE = 0.9
const DEFAULT_SPEECH_PITCH = 1.05

const SCORE_NARRATOR_VOICE = 2
const SCORE_ENHANCED_VOICE = 3
const SCORE_LOCAL_SERVICE = 1

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null

  const langPrefix = lang.toLowerCase().startsWith('de') ? 'de' : 'en'

  // Prefer a natural/neural voice, fall back to any voice matching the language
  const scored = voices
    .filter((v) => v.lang.toLowerCase().startsWith(langPrefix))
    .map((v) => {
      const name = v.name.toLowerCase()
      // Prefer voices that sound like narrators
      const score =
        (name.includes('female') || name.includes('woman') ? SCORE_NARRATOR_VOICE : 0) +
        (name.includes('neural') || name.includes('natural') || name.includes('enhanced') ? SCORE_ENHANCED_VOICE : 0) +
        (v.localService ? SCORE_LOCAL_SERVICE : 0)
      return { voice: v, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored[0]?.voice ?? null
}

export function useTTS(text: string, lang: string = 'en') {
  const [ttsState, setTtsState] = useState<TTSState>('idle')
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  // Track whether the browser supports TTS
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setTtsState('idle')
    utteranceRef.current = null
  }, [supported])

  const play = useCallback(() => {
    if (!supported) return

    // If paused, resume
    if (ttsState === 'paused') {
      window.speechSynthesis.resume()
      setTtsState('playing')
      return
    }

    // Cancel any ongoing speech before starting fresh
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang.startsWith('de') ? 'de-DE' : 'en-US'
    utterance.rate = DEFAULT_SPEECH_RATE
    utterance.pitch = DEFAULT_SPEECH_PITCH

    const applyVoice = () => {
      const voice = pickVoice(lang)
      if (voice) utterance.voice = voice
    }

    applyVoice()

    utterance.onend = () => {
      setTtsState('idle')
      utteranceRef.current = null
    }
    utterance.onerror = () => {
      setTtsState('idle')
      utteranceRef.current = null
    }
    utterance.onpause = () => setTtsState('paused')
    utterance.onresume = () => setTtsState('playing')

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setTtsState('playing')
  }, [supported, ttsState, text, lang])

  const pause = useCallback(() => {
    if (!supported) return
    if (ttsState === 'playing') {
      window.speechSynthesis.pause()
      setTtsState('paused')
    }
  }, [supported, ttsState])

  const toggle = useCallback(() => {
    if (ttsState === 'playing') {
      pause()
    } else if (ttsState === 'paused') {
      play()
    } else {
      play()
    }
  }, [ttsState, play, pause])

  // Stop speech when the component unmounts or text changes
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel()
    }
  }, [text, supported])

  return { ttsState, supported, toggle, stop }
}
