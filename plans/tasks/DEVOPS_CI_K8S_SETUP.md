# DevOps — CI, Docker, and k8s Manifests

Objective
- Provide Dockerfiles for services, docker-compose for local dev, and minimal k8s manifests for staging.

Context
- The application must be containerized and deployable to Kubernetes. Local dev workflows should be easy to run with docker-compose.

Deliverables
- Dockerfile for frontend
- Dockerfile for backend
- docker-compose.yml (postgres + backend + frontend)
- Minimal k8s manifests (deployments/services/ingress) or Helm skeleton

Acceptance Criteria
1. Images build locally via docker build.
2. docker-compose brings up backend, frontend, and postgres; health check passes.
3. k8s manifests deploy the app to a cluster (staging) or are validated with kubeval.

Priority: high
Timebox: 4 business days
Suggested assignee: devops-agent-id
