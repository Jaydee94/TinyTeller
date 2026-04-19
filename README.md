# TinyTeller — MVP

This repo contains a minimal Next.js + Tailwind MVP with an API shim for OpenAI and Anthropic (Claude).

Environment variables (set in Vercel or .env.local):

- PROVIDER: "openai" or "anthropic"
- OPENAI_API_KEY: when using OpenAI
- ANTHROPIC_API_KEY: when using Anthropic/Claude

Run locally:

1. npm install
2. npm run dev

Vercel: create a new project, set the environment variables above, and deploy.
