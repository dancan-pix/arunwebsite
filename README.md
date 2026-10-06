# Arun Asif — Green Card Store

Online store for NIW green card document templates. Customers browse products and pay through Stripe Checkout.

- `artifacts/store` — the website (React + Vite)
- `artifacts/api-server` — the API (Express). Lists products, creates Stripe Checkout sessions, receives Stripe webhooks, and serves the built website in production.
- `lib/*` — shared database, API client, and validation packages

Products and prices are managed in the Stripe Dashboard. The server copies them into Postgres (schema `stripe`) on startup and keeps them current through a Stripe webhook.

## What you need

| Variable | Required | What it is |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | yes | Stripe secret key (`sk_test_...` or `sk_live_...`) |
| `STRIPE_PUBLISHABLE_KEY` | yes | Stripe publishable key (`pk_test_...` or `pk_live_...`) |
| `DATABASE_URL` | yes | Postgres connection string |
| `PUBLIC_URL` | for webhooks | Public https address of the site. Render fills this in automatically; set it yourself for a custom domain. |
| `PORT` | no | Port to listen on (default `8080` in Docker) |

Never commit real keys. Put them in `.env` locally (ignored by git) or in your host's settings.

## Deploy on Render

1. In Render, choose **New → Blueprint** and pick this repository. `render.yaml` creates the web service and a Postgres database.
2. Enter `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` when asked.
3. After the first deploy, open the service URL. `/api/healthz` should return `{"status":"ok"}`.
4. If you add a custom domain, set `PUBLIC_URL` to it (for example `https://www.example.com`) and redeploy so the Stripe webhook points at the right address.

Any host that runs a Dockerfile and offers Postgres (Railway, Fly.io, a VPS) works the same way: build the image, set the variables above.

## Run locally

```bash
cp .env.example .env   # then fill in the Stripe test keys
docker compose up --build
```

Open http://localhost:8080.

The workspace only installs Linux x64 native binaries (see the `overrides` in `pnpm-workspace.yaml`), so build inside Docker rather than directly on macOS or Windows.

## Replit

The project still runs on Replit unchanged. When the `STRIPE_*` variables are not set, the server falls back to Replit's Stripe connector.
