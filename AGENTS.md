# AGENTS Instructions

This repository contains a personal portfolio built as static HTML with Bun, React, TypeScript, and Tailwind CSS. React is rendered at build time and hydrated for existing browser interactions; two dependency-free runtime functions preserve contact emails and agent-facing Markdown content negotiation. Normal HTML requests are static.

## Project layout

- `src/` – application source code (pages, components, hooks).
- `public/` – static assets such as the generated `sitemap.xml`.
- `scripts/` – utility scripts executed by the build or git hooks.

## Useful commands

- `bun install` – install dependencies and keep `bun.lock` in sync.
- `bun run dev` – update local build dependencies, generate static pages and watch source changes (default port 3000).
- `bun run build` – generate `.vercel/output/` with static pages, assets and dependency-free mail/Markdown functions.
- `bun run deps:update` – update locally to the latest eligible stable dependencies, including majors, with a three-day release-age gate.
- `bun run deploy` – update locally, check committed inputs and deploy prebuilt production output.
- `bun run lint` – run Oxlint over the codebase.
- `bun run typecheck` – run TypeScript checks without emitting files.
- `bun run format:check` – verify formatting with Oxfmt.
- `bun run format` – apply formatting with Oxfmt.
- `bun run doctor` – run React Doctor on branch changes and fail on warnings (configured via `doctor.config.json`).
- `bun run doctor:full` – run React Doctor across the whole repository and fail unless it is 100/100.

Always rely on Bun for package management or scripting; avoid npm/pnpm commands.

## Git hooks

A pre-commit hook is configured with Husky. When committing on the `main` branch it runs the Bun scripts that regenerate the CV assets, `llms.txt`, and the sitemap, then stages `public/uwe-schwarz-*`, `public/llms.txt`, `public/sitemap.xml`, and `src/generated/cv-assets.ts`. Make sure those generated artifacts stay current before merging changes into `main`.

## Internationalization

The application includes browser language detection that automatically detects the user's preferred language and serves content accordingly. Both languages are generated at build time. Vercel static routing and early browser scripts handle language detection. Keep localized URLs, saved language preferences and query/hash preservation intact.

## Code style guidelines

- Use PascalCase for components and interfaces, camelCase for functions/variables
- Organize imports: standard libraries, external packages, internal imports
- Use `@/` prefix for internal module imports (e.g., `@/components/ui/button`)
- Use `import type` for TypeScript types
- Expose refs only when callers need them. This React 19 project can accept `ref` as a prop; use `forwardRef` only for an actual compatibility requirement. Add `displayName` when needed for useful debugging.
- Extend React HTML attributes only for components intended to accept and pass through those DOM props.
- Use interfaces for object shapes and types for unions
- Catch async errors where the code can recover, add useful context, or translate an API response. Otherwise allow the established error boundary or caller to handle them.

## Agent workflow

- During iteration, run the focused checks relevant to the change.
- For the final code or dependency state, run `bun run lint`, `bun run typecheck`, and `bun run format:check` in that order, then `bun run doctor` for ordinary scoped changes. Use `bun run doctor:full` instead for dependency upgrades or repository-wide React changes.
- Run `bun run build` when application code, routes, static generation, dependencies, or build configuration may affect production output. Verify changed user-facing behavior in the browser when practical.
- Documentation-only changes need appropriate content/format checks. Do not invent runtime tests for them.
- Resolve failures introduced by the change; report unrelated pre-existing failures explicitly. Do not bypass a failing required gate.
- Reuse passing results for the unchanged tested state across commit, push, and PR creation. Rerun affected checks if source, dependencies, or generated artifacts change, including through hooks.
- Report checks and results in the final response. Keep agent guidance in this file; do not create maintenance reports or other user-facing documentation beyond the minimal README.
- `scripts/build.tsx` owns static generation and Vercel routing. `scripts/serve.ts` is a loopback-only local preview, not a production service.
- Keep all packages in `devDependencies`. Do not introduce runtime package installation for static hosting or the runtime functions.
- Local development, pre-push and deployment run dependency updates; hosted builds must install the committed frozen lockfile. Never auto-commit or stash user changes.
