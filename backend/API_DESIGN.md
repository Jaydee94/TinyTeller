# TinyTeller Backend API Design

## Overview

This document defines the API contracts, data models, and authentication approach for the TinyTeller MVP backend.

**Version:** 1.0.0  
**Base URL:** `/api`  
**Protocol:** REST over HTTP/HTTPS  
**Content-Type:** `application/json`

---

## Authentication

### Approach

JWT-based stateless authentication with httpOnly cookies (recommended) or Authorization header fallback.

### Token Lifecycle

1. **Registration/Login** → Server generates JWT signed with secret key
2. **Token Storage** → Sent via httpOnly cookie (`Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`)
3. **Authenticated Requests** → Client sends cookie automatically OR includes `Authorization: Bearer <token>` header
4. **Token Expiry** → 24 hours (configurable via env `JWT_EXPIRY`)
5. **Refresh** → User must re-authenticate (future: add refresh token flow)

### JWT Payload

```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Security Considerations

- Tokens signed with `HS256` algorithm using secret from env `JWT_SECRET`
- Passwords hashed with `bcrypt` (cost factor 10)
- HTTPS enforced in production
- CORS configured to allow only frontend origin

---

## API Endpoints

### Health Check

**Endpoint:** `GET /api/health`

**Description:** Service health check for monitoring and load balancers.

**Authentication:** None

**Request:** None

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

---

### User Registration

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account.

**Authentication:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**
- `email`: required, valid email format, max 255 characters
- `password`: required, min 8 characters, max 128 characters

**Response (201 Created):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2026-04-19T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers:**
```
Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

**Error Responses:**

- **400 Bad Request** - Invalid input
```json
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

- **409 Conflict** - Email already exists
```json
{
  "error": "Email already registered"
}
```

---

### User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate existing user and issue JWT.

**Authentication:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2026-04-19T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers:**
```
Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

**Error Responses:**

- **401 Unauthorized** - Invalid credentials
```json
{
  "error": "Invalid email or password"
}
```

---

### Get Current User

**Endpoint:** `GET /api/user/me`

**Description:** Retrieve authenticated user's profile.

**Authentication:** Required (JWT)

**Request:** None

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "createdAt": "2026-04-19T12:00:00.000Z",
  "updatedAt": "2026-04-19T12:00:00.000Z"
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid token
```json
{
  "error": "Authentication required"
}
```

---

### Generate Story

**Endpoint:** `POST /api/stories/generate`

**Description:** Generate a new short story for the authenticated user. For MVP, uses template-based generation. AI integration planned for future phase.

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "theme": "animals",  // Optional: "animals", "friendship", "bedtime", "adventure"
  "length": "short"    // Optional: defaults to "short" (2-minute read)
}
```

**Validation Rules:**
- `theme`: optional, enum: `["animals", "friendship", "bedtime", "adventure", "random"]`, defaults to `"random"`
- `length`: optional, enum: `["short"]`, defaults to `"short"` (MVP only supports short stories)

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "The Brave Little Rabbit",
  "content": "Once upon a time, in a meadow far away, there lived a little rabbit named Pip. Pip was small, but she had a big, brave heart...\n\n[Story continues for approximately 200-300 words, designed for 2-minute read time]",
  "theme": "animals",
  "createdAt": "2026-04-19T12:30:00.000Z"
}
```

**Performance Target:**
- Response time: <3 seconds (MVP template-based generation)
- Story length: 200-300 words (approximately 2-minute read)

**Error Responses:**

- **401 Unauthorized** - Missing or invalid token
```json
{
  "error": "Authentication required"
}
```

- **429 Too Many Requests** - Rate limit exceeded (optional, future enhancement)
```json
{
  "error": "Rate limit exceeded. Please wait before generating another story."
}
```

---

### Get Story by ID

**Endpoint:** `GET /api/stories/:id`

**Description:** Retrieve a single story by ID. User must be the story owner.

**Authentication:** Required (JWT)

**Path Parameters:**
- `id`: UUID of the story

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "The Brave Little Rabbit",
  "content": "Once upon a time, in a meadow far away...",
  "theme": "animals",
  "createdAt": "2026-04-19T12:30:00.000Z"
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - User is not the story owner
```json
{
  "error": "Access denied"
}
```

- **404 Not Found** - Story does not exist
```json
{
  "error": "Story not found"
}
```

---

### List Stories (Optional - Post-MVP)

**Endpoint:** `GET /api/stories`

**Description:** Retrieve authenticated user's story history. Not required for MVP but included for completeness.

**Authentication:** Required (JWT)

**Query Parameters:**
- `limit`: optional, max results (default 20, max 100)
- `offset`: optional, pagination offset (default 0)

**Response (200 OK):**
```json
{
  "stories": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "title": "The Brave Little Rabbit",
      "theme": "animals",
      "createdAt": "2026-04-19T12:30:00.000Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Note:** Content is NOT included in list response (only in individual GET) to reduce payload size.

---

### Create Item

**Endpoint:** `POST /api/items`

**Description:** Create a new item owned by the authenticated user. **Note:** For TinyTeller MVP, this generic endpoint is being replaced by story-specific endpoints (`/api/stories/*`). Kept for reference during migration.

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "title": "My First Item",
  "content": "Item description or details",
  "status": "draft"
}
```

**Validation Rules:**
- `title`: required, min 1 character, max 255 characters
- `content`: optional, max 5000 characters
- `status`: optional, enum: `["draft", "active", "archived"]`, defaults to `"draft"`

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "ownerId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "My First Item",
  "content": "Item description or details",
  "status": "draft",
  "createdAt": "2026-04-19T12:30:00.000Z",
  "updatedAt": "2026-04-19T12:30:00.000Z"
}
```

**Error Responses:**

- **400 Bad Request** - Invalid input
- **401 Unauthorized** - Missing or invalid token

---

### List Items

**Endpoint:** `GET /api/items`

**Description:** Retrieve a list of items (filtered by ownership or public scope, TBD based on product requirements).

**Authentication:** Optional (returns only authenticated user's items if token present, otherwise returns public items)

**Query Parameters:**
- `status`: optional, filter by status (enum: `draft`, `active`, `archived`)
- `limit`: optional, max results (default 50, max 100)
- `offset`: optional, pagination offset (default 0)

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "ownerId": "550e8400-e29b-41d4-a716-446655440000",
      "title": "My First Item",
      "content": "Item description or details",
      "status": "draft",
      "createdAt": "2026-04-19T12:30:00.000Z",
      "updatedAt": "2026-04-19T12:30:00.000Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

---

### Get Item by ID

**Endpoint:** `GET /api/items/:id`

**Description:** Retrieve a single item by ID.

**Authentication:** Optional (required if item is private; ownership validation TBD)

**Path Parameters:**
- `id`: UUID of the item

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "ownerId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "My First Item",
  "content": "Item description or details",
  "status": "draft",
  "createdAt": "2026-04-19T12:30:00.000Z",
  "updatedAt": "2026-04-19T12:30:00.000Z"
}
```

**Error Responses:**

- **404 Not Found** - Item does not exist
```json
{
  "error": "Item not found"
}
```

- **403 Forbidden** - User does not have access
```json
{
  "error": "Access denied"
}
```

---

### Update Item

**Endpoint:** `PUT /api/items/:id`

**Description:** Update an existing item. User must be the owner.

**Authentication:** Required (JWT)

**Path Parameters:**
- `id`: UUID of the item

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "status": "active"
}
```

**Validation Rules:**
- Same as Create Item
- At least one field must be provided

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "ownerId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated Title",
  "content": "Updated content",
  "status": "active",
  "createdAt": "2026-04-19T12:30:00.000Z",
  "updatedAt": "2026-04-19T13:00:00.000Z"
}
```

**Error Responses:**

- **400 Bad Request** - Invalid input
- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - User is not the owner
- **404 Not Found** - Item does not exist

---

### Delete Item

**Endpoint:** `DELETE /api/items/:id`

**Description:** Delete an item. User must be the owner.

**Authentication:** Required (JWT)

**Path Parameters:**
- `id`: UUID of the item

**Response (204 No Content):**

No response body.

**Error Responses:**

- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - User is not the owner
- **404 Not Found** - Item does not exist

---

## Database Schema

### Technology

PostgreSQL 14+ (production) / SQLite or in-memory DB for tests

### Tables

#### users

Stores user account information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

**Columns:**
- `id`: Primary key (UUID)
- `email`: Unique user email
- `password_hash`: bcrypt hash of password
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

---

#### stories

Stores user-generated stories (primary domain object for TinyTeller).

```sql
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  theme VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_stories_user_id ON stories(user_id);
CREATE INDEX idx_stories_created_at ON stories(created_at DESC);
CREATE INDEX idx_stories_theme ON stories(theme);
```

**Columns:**
- `id`: Primary key (UUID)
- `user_id`: Foreign key to users table
- `title`: Story title (generated)
- `content`: Full story text
- `theme`: Story theme (`animals`, `friendship`, `bedtime`, `adventure`, `random`)
- `created_at`: Story creation timestamp

**Constraints:**
- `ON DELETE CASCADE`: Deleting a user deletes all their stories

**Notes:**
- Stories are immutable once created (no updates)
- No `updated_at` field needed
- `theme` can be NULL for older stories before themes were implemented

---

#### items (Legacy - Post-MVP Migration)

Stores user-created items (generic domain object). **Note:** For TinyTeller MVP, this table is replaced by the `stories` table above. Kept for reference during migration.

```sql
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_items_owner_id ON items(owner_id);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_created_at ON items(created_at DESC);
```

**Columns:**
- `id`: Primary key (UUID)
- `owner_id`: Foreign key to users table
- `title`: Item title (required)
- `content`: Item description or details (optional)
- `status`: Item status (`draft`, `active`, `archived`)
- `created_at`: Item creation timestamp
- `updated_at`: Last update timestamp

**Constraints:**
- `ON DELETE CASCADE`: Deleting a user deletes all their items

---

### Migrations

Use a migration tool (e.g., `node-pg-migrate`, `knex`, or `db-migrate`) to manage schema changes.

**Initial migration file structure:**
```
backend/migrations/
  001_create_users_table.sql
  002_create_stories_table.sql
  003_create_items_table.sql  # Optional: for future generic items feature
```

---

## Error Handling

### Standard Error Response Format

All error responses follow this structure:

```json
{
  "error": "Human-readable error message",
  "details": [
    { "field": "fieldName", "message": "Specific validation error" }
  ]
}
```

`details` is optional and used for validation errors.

### HTTP Status Codes

- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST (resource created)
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid input/validation failure
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource does not exist
- `409 Conflict` - Resource conflict (e.g., duplicate email)
- `500 Internal Server Error` - Unexpected server error

---

## Environment Variables

Backend requires the following environment variables:

```bash
# Server
PORT=8080
NODE_ENV=production  # or development, test

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/tinyteller

# JWT
JWT_SECRET=<strong-random-secret>
JWT_EXPIRY=86400  # seconds (24 hours)

# CORS
CORS_ORIGIN=https://frontend.example.com
```

---

## Testing Strategy

### Unit Tests
- Auth logic (JWT generation, password hashing)
- Validation schemas
- Database models

### Integration Tests
- API endpoints with test database
- Authentication flow
- CRUD operations on items

### Test Database
- Use PostgreSQL with a separate test DB or SQLite in-memory mode
- Reset database between tests
- Seed test data as needed

---

## Implementation Notes

### Recommended Libraries

- **Fastify** - Web framework
- **@fastify/jwt** - JWT authentication plugin
- **@fastify/cookie** - Cookie handling
- **@fastify/cors** - CORS support
- **pg** - PostgreSQL client
- **bcrypt** - Password hashing
- **ajv** - JSON schema validation (built into Fastify)
- **node-pg-migrate** - Database migrations

### Project Structure

```
backend/
  src/
    routes/
      auth.ts       # /api/auth/* endpoints
      user.ts       # /api/user/* endpoints
      items.ts      # /api/items/* endpoints
    models/
      user.ts       # User database model
      item.ts       # Item database model
    middleware/
      auth.ts       # JWT authentication middleware
    utils/
      db.ts         # Database connection pool
      hash.ts       # Password hashing utilities
    schemas/
      auth.ts       # Request/response schemas for auth
      items.ts      # Request/response schemas for items
    index.ts        # Server entry point
  migrations/
    001_create_users_table.sql
    002_create_items_table.sql
  test/
    integration/
      auth.test.ts
      items.test.ts
    unit/
      auth.test.ts
  package.json
  tsconfig.json
  Dockerfile
```

---

## Next Steps

1. Implement database connection and migration setup
2. Implement user model and auth endpoints
3. **Implement stories generation and retrieval endpoints** (updated for MVP)
4. Implement story generation logic (template-based for MVP)
5. Add integration tests
6. Update docker-compose.yml with database environment variables
7. Document deployment configuration

---

## Acceptance Criteria Checklist

- [x] API endpoints documented with HTTP method, path, request/response schemas
- [x] Database schema defined with table structures and indexes
- [x] Authentication design documented (JWT approach and token lifecycle)
- [ ] API contract reviewed by PM/COO (pending)
- [ ] Database schema implemented in migrations (next task)
- [ ] Backend engineers can implement without ambiguity (validated post-review)

---

**Document Version:** 1.1.0  
**Last Updated:** 2026-04-20  
**Author:** CTO  
**Changelog:**
- v1.1.0 (2026-04-20): Added `/api/stories/*` endpoints and `stories` database table for TinyTeller MVP
- v1.0.0 (2026-04-19): Initial API design with generic `/api/items` endpoints
