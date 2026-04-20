import { v4 as uuidv4 } from 'uuid'
import { Language, Story, StoryTemplate, Theme } from '../types'
import { animalStories } from '../stories/animals'
import { animalStoriesDe } from '../stories/animals.de'
import { friendshipStories } from '../stories/friendship'
import { friendshipStoriesDe } from '../stories/friendship.de'
import { bedtimeStories } from '../stories/bedtime'
import { bedtimeStoriesDe } from '../stories/bedtime.de'
import { adventureStories } from '../stories/adventure'
import { adventureStoriesDe } from '../stories/adventure.de'

const STORY_TTL_MS = 60 * 60 * 1000 // 1 hour

interface StoredStory {
  story: Story
  expiresAt: number
}

const allStories: Record<Language, Record<Theme, StoryTemplate[]>> = {
  en: {
    animals: animalStories,
    friendship: friendshipStories,
    bedtime: bedtimeStories,
    adventure: adventureStories,
  },
  de: {
    animals: animalStoriesDe,
    friendship: friendshipStoriesDe,
    bedtime: bedtimeStoriesDe,
    adventure: adventureStoriesDe,
  },
}

const themes: Theme[] = ['animals', 'friendship', 'bedtime', 'adventure']

const store = new Map<string, StoredStory>()

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function evictExpired(): void {
  const now = Date.now()
  for (const [id, entry] of store.entries()) {
    if (entry.expiresAt <= now) {
      store.delete(id)
    }
  }
}

export function generateStory(theme?: Theme, language: Language = 'en'): Story {
  evictExpired()

  const resolvedTheme: Theme = theme ?? pickRandom(themes)
  const templates = allStories[language][resolvedTheme]
  const template = pickRandom(templates)

  const story: Story = {
    id: uuidv4(),
    title: template.title,
    content: template.content,
    theme: resolvedTheme,
    language,
    createdAt: new Date().toISOString(),
  }

  store.set(story.id, { story, expiresAt: Date.now() + STORY_TTL_MS })

  return story
}

export function getStory(id: string): Story | null {
  evictExpired()
  const entry = store.get(id)
  if (!entry) return null
  return entry.story
}

export function storeSize(): number {
  return store.size
}
