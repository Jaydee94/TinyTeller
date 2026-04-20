import { FastifyInstance } from 'fastify'
import { generateStory, getStory } from '../services/storyService'
import { GenerateStoryRequest, GenerateStoryResponse, GetStoryResponse, Theme } from '../types'

const VALID_THEMES: Theme[] = ['animals', 'friendship', 'bedtime', 'adventure']

function isValidTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (VALID_THEMES as string[]).includes(value)
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
          },
          additionalProperties: false,
        },
      },
    },
    async (req, reply) => {
      const { theme } = req.body ?? {}

      if (theme !== undefined && !isValidTheme(theme)) {
        return reply.status(400).send({
          error: 'Invalid theme. Must be one of: animals, friendship, bedtime, adventure',
        } as never)
      }

      const story = generateStory(theme)
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
