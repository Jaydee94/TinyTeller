import { describe, it, expect } from 'vitest'
import Fastify from 'fastify'
import healthRoute from '../routes/health'
import storiesRoute from '../routes/stories'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

async function buildServer() {
  const server = Fastify({ logger: false })
  await server.register(helmet, { contentSecurityPolicy: false })
  await server.register(cors, { origin: true })
  await server.register(healthRoute)
  await server.register(storiesRoute)
  return server
}

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const server = await buildServer()
    const res = await server.inject({ method: 'GET', url: '/api/health' })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body.status).toBe('ok')
    expect(body.version).toBeTruthy()
  })
})

describe('POST /api/stories/generate', () => {
  it('returns 201 with a story when no theme provided', async () => {
    const server = await buildServer()
    const res = await server.inject({
      method: 'POST',
      url: '/api/stories/generate',
      payload: {},
    })
    expect(res.statusCode).toBe(201)
    const body = res.json()
    expect(body.id).toBeTruthy()
    expect(body.title).toBeTruthy()
    expect(body.content).toBeTruthy()
    expect(['animals', 'friendship', 'bedtime', 'adventure']).toContain(body.theme)
    expect(body.createdAt).toBeTruthy()
  })

  it('returns 201 with correct theme when theme is provided', async () => {
    const server = await buildServer()
    const res = await server.inject({
      method: 'POST',
      url: '/api/stories/generate',
      payload: { theme: 'animals' },
    })
    expect(res.statusCode).toBe(201)
    expect(res.json().theme).toBe('animals')
  })

  it('returns 400 for invalid theme', async () => {
    const server = await buildServer()
    const res = await server.inject({
      method: 'POST',
      url: '/api/stories/generate',
      payload: { theme: 'dragons' },
    })
    expect(res.statusCode).toBe(400)
  })
})

describe('GET /api/stories/:id', () => {
  it('returns 200 with story for a valid id', async () => {
    const server = await buildServer()

    const genRes = await server.inject({
      method: 'POST',
      url: '/api/stories/generate',
      payload: {},
    })
    const { id } = genRes.json()

    const getRes = await server.inject({ method: 'GET', url: `/api/stories/${id}` })
    expect(getRes.statusCode).toBe(200)
    expect(getRes.json().id).toBe(id)
  })

  it('returns 404 for unknown id', async () => {
    const server = await buildServer()
    const res = await server.inject({
      method: 'GET',
      url: '/api/stories/00000000-0000-0000-0000-000000000000',
    })
    expect(res.statusCode).toBe(404)
  })
})
