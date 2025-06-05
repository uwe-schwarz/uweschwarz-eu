# AGENTS Instructions

This repository contains a personal portfolio built with React, TypeScript, Vite and Tailwind CSS.

## Project layout
- `src/` – application source code (pages, components, hooks).
- `public/` – static assets such as the generated `sitemap.xml`.
- `scripts/` – utility scripts executed by the build or git hooks.

## Useful commands
- `npm run dev` – start a development server on port 8080.
- `npm run build` – create a production build.
- `npm run lint` – run ESLint over the codebase.
- `npm test` – execute unit tests via Vitest.

## Git hooks
A pre-commit hook is configured with Husky. It runs `node scripts/generate-sitemap.cjs` and stages the resulting `public/sitemap.xml` file. Ensure the sitemap is updated and committed when making changes.

## Agent workflow
When modifying files in this repository:
1. Run `npm run lint` and `npm test` before committing to confirm everything passes.
2. Include a clear commit message summarising the change.
3. Reference any modified files in PR summaries when applicable.
