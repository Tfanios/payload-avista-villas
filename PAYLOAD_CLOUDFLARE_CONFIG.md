# Payload / Cloudflare config checklist

This repo is now named `payload-avista-villas` locally and in `wrangler.jsonc`.

## Files changed in this repo

- `package.json`
  - `name`: `payload-avista-villas`
  - `description`: `Payload CMS and Cloudflare app for Avista Villas`
- `package-lock.json`
  - Root package metadata renamed to `payload-avista-villas`.
- `wrangler.jsonc`
  - Worker `name`: `payload-avista-villas`
  - D1 `database_name`: `payload-avista-villas`
  - R2 `bucket_name`: `payload-avista-villas`

## Cloudflare resources you need

Create or choose these Cloudflare resources before deploying:

```bash
pnpm wrangler login
pnpm wrangler d1 create payload-avista-villas
pnpm wrangler r2 bucket create payload-avista-villas
```

After creating the D1 database, copy the generated D1 `database_id` into `wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "D1",
    "database_id": "PASTE_NEW_D1_DATABASE_ID_HERE",
    "database_name": "payload-avista-villas",
    "remote": true
  }
]
```

Important: the binding names must stay as `D1` and `R2`. `src/payload.config.ts` reads `cloudflare.env.D1` for Payload's SQLite adapter and `cloudflare.env.R2` for media storage.

Changing only `database_id`, `database_name`, or `bucket_name` does not require regenerating Cloudflare types because the binding names remain unchanged.

## Secrets and environment variables

Payload requires `PAYLOAD_SECRET`.

For local development, create `.env` from `.env.example` and set a real value:

```bash
cp .env.example .env
openssl rand -hex 32
```

Put the generated value into `.env`:

```env
PAYLOAD_SECRET=your-generated-secret
```

For Cloudflare production, set the same secret in Workers:

```bash
pnpm wrangler secret put PAYLOAD_SECRET
```

## Payload database setup

This project uses Payload with Cloudflare D1:

- Adapter: `@payloadcms/db-d1-sqlite`
- Binding expected by code: `D1`
- Migrations folder: `src/migrations`

Run the existing deployment script to apply migrations and optimize D1 before deploying the Worker:

```bash
pnpm run deploy
```

That script runs:

- `payload migrate`
- `wrangler d1 execute D1 --command 'PRAGMA optimize' --remote`
- `opennextjs-cloudflare build`
- `opennextjs-cloudflare deploy`

## R2 media storage

This project uses Payload media storage with Cloudflare R2:

- Plugin: `@payloadcms/storage-r2`
- Binding expected by code: `R2`
- Bucket configured in `wrangler.jsonc`: `payload-avista-villas`

Make sure the R2 bucket exists in the same Cloudflare account used by Wrangler. If you rename the bucket in Cloudflare, update only `bucket_name`; keep `"binding": "R2"`.

## Regenerate generated Cloudflare types

After adding, removing, or renaming bindings in `wrangler.jsonc`, regenerate Cloudflare environment types:

```bash
pnpm run generate:types:cloudflare
```

If you change Payload collections or config, regenerate Payload types too:

```bash
pnpm run generate:types:payload
```

Or run both:

```bash
pnpm run generate:types
```

## Deployment sanity check

Before deploying, verify these values:

- `wrangler.jsonc` Worker `name` is `payload-avista-villas`.
- `wrangler.jsonc` D1 `database_id` is the ID for your new `payload-avista-villas` D1 database.
- `wrangler.jsonc` D1 `database_name` is `payload-avista-villas`.
- `wrangler.jsonc` R2 `bucket_name` is an existing R2 bucket.
- Cloudflare has a `PAYLOAD_SECRET` secret set.
- Local `.env` has `PAYLOAD_SECRET` for development.
