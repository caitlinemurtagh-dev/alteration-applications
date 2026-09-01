# Alteration Applications

A property-specific apartment alteration application portal for Douglas Elliman Property Management.

## Cloudflare deployment

1. Install dependencies with `npm ci`.
2. Build with `npm run build`.
3. Authenticate Wrangler with your Cloudflare account.
4. Deploy with `npm run deploy:vinext`.

The deployed Worker is named `alteration-applications` by default; change `name` in `wrangler.jsonc` if that name is already in use.
