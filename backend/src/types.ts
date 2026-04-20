export type Theme = 'animals' | 'friendship' | 'bedtime' | 'adventure'

export interface StoryTemplate {
  title: string
  content: string
  theme: Theme
}

export interface Story {
  id: string
  title: string
  content: string
  theme: Theme
  createdAt: string
}

export interface GenerateStoryRequest {
  theme?: Theme
}

export interface GenerateStoryResponse extends Story {}

export interface GetStoryResponse extends Story {}

export interface HealthResponse {
  status: 'ok'
  version: string
}
