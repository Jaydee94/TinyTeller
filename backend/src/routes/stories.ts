import { FastifyInstance } from 'fastify'
import { generateStory, getStory } from '../services/storyService'
import { GenerateStoryRequest, GenerateStoryResponse, GetStoryResponse, Language, Theme } from '../types'

const VALID_THEMES: Theme[] = ['animals', 'friendship', 'bedtime', 'adventure']
const VALID_LANGUAGES: Language[] = ['en', 'de']

function isValidTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (VALID_THEMES as string[]).includes(value)
}

function isValidLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (VALID_LANGUAGES as string[]).includes(value)
}

export default async function storiesRoute(server: FastifyInstance): Promise<void> {
  server.post<{ Body: GenerateStoryRequest; Reply: GenerateStoryResponse }>(
    '/api/stories/generate',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            theme: { type: 'string', enum: VALID_THEMES },
            language: { type: 'string', enum: VALID_LANGUAGES },
          },
          additionalProperties: false,
        },
      },
    },
    async (req, reply) => {
      const { theme, language } = req.body ?? {}

      if (theme !== undefined && !isValidTheme(theme)) {
        return reply.status(400).send({
          error: 'Invalid theme. Must be one of: animals, friendship, bedtime, adventure',
        } as never)
      }

      if (language !== undefined && !isValidLanguage(language)) {
        return reply.status(400).send({
          error: 'Invalid language. Must be one of: en, de',
        } as never)
      }

      const story = generateStory(theme, language)
      return reply.status(201).send(story)
    },
  )

  server.get<{ Params: { id: string }; Reply: GetStoryResponse }>(
    '/api/stories/:id',
    async (req, reply) => {
      const story = getStory(req.params.id)
      if (!story) {
        return reply.status(404).send({ error: 'Story not found' } as never)
      }
      return reply.send(story)
    },
  )
}
