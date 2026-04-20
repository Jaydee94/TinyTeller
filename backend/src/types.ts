export type Theme = 'animals' | 'friendship' | 'bedtime' | 'adventure'

export type Language = 'en' | 'de'

export interface StoryTemplate {
  title: string
  content: string
  theme: Theme
  language: Language
}

export interface Story {
  id: string
  title: string
  content: string
  theme: Theme
  language: Language
  createdAt: string
}

export interface GenerateStoryRequest {
  theme?: Theme
  language?: Language
}

export interface GenerateStoryResponse extends Story {}

export interface GetStoryResponse extends Story {}

export interface HealthResponse {
  status: 'ok'
  version: string
}
