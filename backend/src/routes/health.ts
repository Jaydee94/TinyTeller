import { FastifyInstance } from 'fastify'
import { HealthResponse } from '../types'

const VERSION = process.env.npm_package_version ?? '1.0.0'

export default async function healthRoute(server: FastifyInstance): Promise<void> {
  server.get<{ Reply: HealthResponse }>('/api/health', async (_req, reply) => {
    return reply.send({ status: 'ok', version: VERSION })
  })
}
