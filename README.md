# Uwe Schwarz’s portfolio

Static bilingual portfolio. Content: `src/content/content.ts`; assets: `public/`. React preserves browser interactions. Two package-free functions handle mail and Markdown negotiation.

Requires Bun (version in `package.json`) and Node.js 24.

```sh
bun install --frozen-lockfile
bun run check
bun run build
bun run deploy
```

`dev-url --port 3000 -- bun run dev --port 3000` starts a private development URL.

Build output: `.vercel/output/`. Mail requires `RESEND_API_KEY` in Vercel.

Development, push and deployment update dependencies locally to latest, including majors, with a three-day release-age window. Updated inputs must be committed before release. Hosted builds use the frozen lockfile.
