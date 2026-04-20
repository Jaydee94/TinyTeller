import { describe, it, expect } from 'vitest'
import { generateStory, getStory, storeSize } from '../services/storyService'
import { Theme } from '../types'

describe('storyService', () => {
  describe('generateStory', () => {
    it('returns a story with all required fields', () => {
      const story = generateStory()
      expect(story.id).toBeTruthy()
      expect(story.title).toBeTruthy()
      expect(story.content).toBeTruthy()
      expect(['animals', 'friendship', 'bedtime', 'adventure']).toContain(story.theme)
      expect(story.createdAt).toBeTruthy()
      expect(new Date(story.createdAt).toISOString()).toBe(story.createdAt)
    })

    it('returns a story with the requested theme', () => {
      const themes: Theme[] = ['animals', 'friendship', 'bedtime', 'adventure']
      for (const theme of themes) {
        const story = generateStory(theme)
        expect(story.theme).toBe(theme)
      }
    })

    it('generates unique IDs for each story', () => {
      const ids = new Set(Array.from({ length: 20 }, () => generateStory().id))
      expect(ids.size).toBe(20)
    })

    it('story content is 200+ characters', () => {
      const story = generateStory()
      expect(story.content.length).toBeGreaterThan(200)
    })
  })

  describe('getStory', () => {
    it('retrieves a previously generated story by id', () => {
      const story = generateStory()
      const retrieved = getStory(story.id)
      expect(retrieved).not.toBeNull()
      expect(retrieved?.id).toBe(story.id)
      expect(retrieved?.title).toBe(story.title)
    })

    it('returns null for unknown id', () => {
      const result = getStory('00000000-0000-0000-0000-000000000000')
      expect(result).toBeNull()
    })
  })

  describe('in-memory store', () => {
    it('increments store size on each generate', () => {
      const before = storeSize()
      generateStory()
      generateStory()
      expect(storeSize()).toBe(before + 2)
    })
  })
})
