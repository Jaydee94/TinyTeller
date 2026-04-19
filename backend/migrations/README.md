# Database Migrations

This directory contains SQL migration files for the TinyTeller database schema.

## Migration Files

Migrations are numbered sequentially and should be applied in order:

1. `001_create_users_table.sql` - Creates the users table
2. `002_create_items_table.sql` - Creates the items table

## Running Migrations

### Manual Application

Connect to your PostgreSQL database and run each migration file in order:

```bash
psql $DATABASE_URL -f migrations/001_create_users_table.sql
psql $DATABASE_URL -f migrations/002_create_items_table.sql
```

### Using a Migration Tool

For production use, integrate a migration tool such as:

- **node-pg-migrate** - Recommended for Node.js/PostgreSQL
- **knex** - Popular query builder with migrations
- **db-migrate** - Framework-agnostic migration tool

#### Example with node-pg-migrate

Install:
```bash
npm install node-pg-migrate
```

Add to `package.json`:
```json
{
  "scripts": {
    "migrate": "node-pg-migrate up",
    "migrate:down": "node-pg-migrate down"
  }
}
```

Run:
```bash
npm run migrate
```

## Environment Setup

Ensure `DATABASE_URL` is set before running migrations:

```bash
export DATABASE_URL=postgresql://user:password@localhost:5432/tinyteller
```

Or use a `.env` file (not committed to version control):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tinyteller
```

## Development vs Production

- **Development**: Use `docker-compose.yml` to spin up a local Postgres instance
- **Test**: Use a separate test database or SQLite in-memory mode
- **Production**: Use a managed PostgreSQL service (AWS RDS, GCP Cloud SQL, etc.)

## Schema Verification

After applying migrations, verify the schema:

```bash
psql $DATABASE_URL -c "\dt"  # List tables
psql $DATABASE_URL -c "\d users"  # Describe users table
psql $DATABASE_URL -c "\d items"  # Describe items table
```

## Rollback Strategy

Currently, these are forward-only migrations. To implement rollback:

1. Create corresponding `DOWN` migration files (e.g., `001_create_users_table.down.sql`)
2. Use a migration tool that supports up/down migrations
3. Store migration state in a `migrations` table

## Future Migrations

When adding new migrations:

1. Increment the version number (e.g., `003_add_users_avatar.sql`)
2. Follow the existing naming convention: `{version}_{description}.sql`
3. Update this README with the new migration description
4. Test locally before committing
