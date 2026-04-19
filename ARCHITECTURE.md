TinyTeller — Architecture Overview

Goal
- Build a simple web application (React) that can be containerized and deployed to Kubernetes. The MVP should be easy to run locally (docker/docker-compose) and production-ready to run in a k8s cluster.

High-level decisions
- Frontend: React + TypeScript using Vite for fast dev iteration. Produces a static build served by a CDN or a static webserver in a container.
- Backend: Node.js + TypeScript using Fastify or Express (Fastify preferred for perf). Exposes a small REST API for the MVP.
- Data: Postgres for production persistence. For simple local development we will provide a docker-compose setup; tests may use SQLite or an in-memory DB but Postgres keeps parity with prod.
- Containerization: Each service (frontend, backend) has a Dockerfile producing OCI images that can be deployed to k8s.
- Deployment: Kubernetes (manifests or Helm charts). CI builds images and publishes to the registry; CD deploys to k8s cluster (manual promotion to start).
- CI: GitHub Actions pipeline that builds frontend and backend, runs lint/tests, builds docker images and optionally pushes to registry (configurable via secrets).

Why these choices
- React + Vite: fast dev server, minimal config, wide community knowledge.
- Node + TypeScript: quick to implement APIs, same language across stack, easy to containerize.
- Postgres: reliable relational DB with strong ecosystem; fits expected needs for user/state storage.
- Containers + Kubernetes: matches the deployment requirement and keeps infra portable and standard.

Minimal API surface (MVP)
- GET /api/health -> { status: "ok" }
- POST /api/auth/register -> register a user (email/password)
- POST /api/auth/login -> login and return JWT
- GET /api/user/me -> get current user (auth required)
- POST /api/items -> create a primary domain object (auth required)
- GET /api/items -> list items
- GET /api/items/:id -> get item
- PUT /api/items/:id -> update item
- DELETE /api/items/:id -> delete item

Authentication
- JWT-based authentication for the MVP (stateless tokens) stored client-side (httpOnly cookie recommended or Authorization header). We will keep auth minimal and extensible.

Data model (sketch)
- users: id (uuid), email (unique), password_hash, created_at, updated_at
- items: id (uuid), owner_id (fk users.id), title, content, status, created_at, updated_at

Local development
- Provide docker-compose.yml with services: postgres, backend, and an optional frontend dev container. Backend connects to Postgres using a connection string from env.
- Provide npm scripts to run frontend dev server and backend in watch mode.

Containerization
- Backend Dockerfile: multi-stage build (install deps, build TS, produce small runtime image). Expose port 8080.
- Frontend Dockerfile: build static assets and serve with nginx or use static file hosting.

CI/CD (GitHub Actions)
- Workflows:
  - ci.yml: run on push/PR. Steps: checkout, setup Node, install, lint, run tests, build artifacts.
  - release.yml (optional): build docker images and push to registry, create release or tag.

Kubernetes
- Create minimal k8s manifests for:
  - backend Deployment + Service (ClusterIP)
  - frontend Deployment + Service (or use Ingress to route to backend/api and frontend)
  - Postgres StatefulSet (or recommend managed Postgres for production)
  - ConfigMaps/Secrets for configuration

Acceptance criteria for initial implementation
1. Frontend skeleton (React + Vite + TS) builds and produces static assets.
2. Backend skeleton (Node + TS) exposes /api/health and runs in a container.
3. Dockerfiles exist for frontend and backend; images build successfully.
4. docker-compose.yml allows local end-to-end run (frontend + backend + postgres).
5. GitHub Actions CI runs on PRs and validates lint/build/test steps.

Next recommended tasks (PRs)
1. Scaffold frontend (Vite + React + TypeScript) and add a simple landing page that hits /api/health.
2. Scaffold backend (TypeScript, Fastify) with /api/health and basic logging.
3. Add Dockerfiles for both services and test image builds locally.
4. Add docker-compose.yml for local dev with Postgres.
5. Add minimal GitHub Actions CI workflow (ci.yml).
6. Add k8s manifests (deployments/services/ingress) as a separate PR.

Notes and tradeoffs
- Using Postgres as the default database increases initial infra complexity but gives parity with production. For fastest iteration, we can use an in-memory DB or SQLite for unit tests and local prototyping, then migrate to Postgres before staging.
- JWT auth is simple and stateless but you'll need secure storage and rotation strategies for production. For MVP it's acceptable.

If you confirm this plan, I will scaffold the frontend and backend skeletons (or start with the architecture PR and CI). Tell me which task to start with or say "scaffold all" and I will create PRs for the first three tasks.
