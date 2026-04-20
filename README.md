<p align="center">
  <img src="assets/banner.svg" alt="TinyTeller — Instant magic stories for little listeners" width="800"/>
</p>

<p align="center">
  <a href="https://github.com/Jaydee94/TinyTeller/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/Jaydee94/TinyTeller/actions/workflows/ci.yml/badge.svg"/>
  </a>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white"/>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white"/>
</p>

<p align="center">
  TinyTeller brings bedtime magic to toddlers and parents with a single tap.<br/>
  Press the <strong>Magic Button</strong> and receive a brand-new, bite-sized story crafted for 2–4 year olds<br/>
  — no accounts, no ads, no complexity.
</p>

---

## ✨ Features

- **One-tap magic** — a single button delivers a fresh short story instantly
- **Toddler-first design** — large buttons, high-contrast palette, big readable text
- **Four themes** — Animals 🐾, Friendship 💛, Bedtime 🌙, Adventure 🗺️
- **Fully offline-capable** — template-based generation, no external API calls
- **Self-hostable** — runs as a container or on Kubernetes

---

## 🏗️ Architecture

```
┌──────────────┐    /api/*     ┌───────────────┐
│  Frontend    │ ──────────►  │   Backend      │
│  React/Vite  │              │  Fastify/Node  │
│  nginx:80    │              │  port 8080     │
└──────────────┘              └───────────────┘
```

| Component | Technology |
|-----------|-----------|
| Frontend  | React 18 + TypeScript + Vite, served by nginx |
| Backend   | Node.js 20 + TypeScript + Fastify |
| Container | Docker / docker-compose |
| Kubernetes | Deployments + Services + Ingress + Kustomize |

---

## 🚀 Quick Start — Pre-built Images (fastest)

No build step required — pulls the latest images directly from the GitHub Container Registry.

Requires: [Docker](https://docs.docker.com/get-docker/) with Compose V2 **or** [Podman](https://podman.io/) with `podman-compose`.

```bash
# Docker
docker compose -f docker-compose.ghcr.yml up

# Podman
podman compose -f docker-compose.ghcr.yml up
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:8080/api/health |

To pin a specific release, set the image tag (e.g. `1.0.0`):

```bash
BACKEND_TAG=1.0.0 FRONTEND_TAG=1.0.0 \
  docker compose -f docker-compose.ghcr.yml up
```

> Images are published to `ghcr.io/jaydee94/tiny-teller-backend` and  
> `ghcr.io/jaydee94/tiny-teller-frontend` on every versioned release.

---

## 🐳 Quick Start — Docker Compose (build from source)

Requires: [Docker](https://docs.docker.com/get-docker/) with Compose V2.

```bash
git clone https://github.com/Jaydee94/TinyTeller.git
cd TinyTeller
docker compose up --build
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:8080/api/health |

---

## 💻 Quick Start — Local Development

Requires: Node.js 20+

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev        # starts on :8080 with hot-reload

# Terminal 2 — frontend
cd frontend
npm install
npm run dev        # starts on :5173, proxies /api → :8080
```

---

## ☸️ Kubernetes

Manifests live in `k8s/`. Apply with [Kustomize](https://kustomize.io/):

```bash
# 1. Update image tags in k8s/kustomization.yaml (or use an overlay)
# 2. Apply to your cluster
kubectl apply -k k8s/
```

### What gets deployed

| Resource | Details |
|----------|---------|
| `tinyteller` namespace | Isolated namespace for all resources |
| `backend` Deployment | 2 replicas, liveness + readiness probes on `/api/health` |
| `frontend` Deployment | 2 replicas, nginx serving static assets |
| `backend` / `frontend` Services | ClusterIP |
| Ingress | `/api/*` → backend, `/*` → frontend |

### Minimal cluster requirements

- nginx ingress controller (e.g. `ingress-nginx`)
- kubectl + Kustomize

---

## 📡 API Reference

### `GET /api/health`
```json
{ "status": "ok", "version": "1.0.0" }
```

### `POST /api/stories/generate`
**Body (all optional):**
```json
{ "theme": "animals" }
```
Valid themes: `animals` | `friendship` | `bedtime` | `adventure`  
Omit `theme` for a random selection.

**Response `201`:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "The Little Duck Who Lost His Quack",
  "content": "Once upon a time…",
  "theme": "animals",
  "createdAt": "2026-04-20T10:00:00.000Z"
}
```

### `GET /api/stories/:id`
Returns a previously generated story (cached in memory for 1 hour).

---

## 🧪 Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

---

## 🔄 CI/CD

| Workflow | Trigger | Actions |
|---------|---------|---------|
| `ci.yml` | push / PR to `main` | lint → test → build (backend + frontend), build Docker images |
| `release.yml` | push tag `v*.*.*` | build + push multi-arch images to `ghcr.io` |

Images are published to:
- `ghcr.io/jaydee94/tiny-teller-backend:<version>` / `:latest`
- `ghcr.io/jaydee94/tiny-teller-frontend:<version>` / `:latest`

---

## 🗺️ Future Roadmap

- Story history with user accounts (Postgres + JWT auth)
- AI story generation (LLM integration with template fallback)
- Theme selector before pressing the Magic Button
- Browser TTS narration
- Helm chart for multi-environment Kubernetes deployment
