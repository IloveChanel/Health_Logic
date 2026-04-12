Railway / Deployment Notes

Environment variables required:
- DATABASE_URL - Postgres connection string
- STRIPE_API_KEY - Stripe secret key for creating subscriptions
- STRIPE_PRICE_ID - Stripe price id for subscription
- STRIPE_WEBHOOK_SECRET - (optional) webhook signing secret
- ENVIRONMENT - e.g., production

Recommended steps:
1. Use Railway to create a Postgres plugin and add `DATABASE_URL`.
2. Set the Stripe secrets in Railway environment variables.
3. Deploy using the provided `Dockerfile` or Procfile.
4. Configure Stripe webhook to point to `/stripe-webhook` on your deployed URL.

Smoke tests:
- Use the included `scripts/smoke_test.ps1` to call `/health` and `/subscribe`.
