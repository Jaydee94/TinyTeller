import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import healthRoute from './routes/health'
import storiesRoute from './routes/stories'

const PORT = Number(process.env.PORT ?? 8080)
const HOST = process.env.HOST ?? '0.0.0.0'
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? true

const server = Fastify({ logger: true })

async function main(): Promise<void> {
  await server.register(helmet, { contentSecurityPolicy: false })
  await server.register(cors, { origin: CORS_ORIGIN })

  await server.register(healthRoute)
  await server.register(storiesRoute)

  await server.listen({ port: PORT, host: HOST })
}

main().catch((err) => {
  server.log.error(err)
  process.exit(1)
})
