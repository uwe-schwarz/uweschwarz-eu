# AGENTS Instructions

This repository contains a personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Project layout

- `src/` – application source code (pages, components, hooks).
- `public/` – static assets such as the generated `sitemap.xml`.
- `scripts/` – utility scripts executed by the build or git hooks.
- Repo-local skill: `.agents/skills/deps-upgrade-autopilot/SKILL.md` for one-shot dependency upgrade PRs with before/after screenshot comparison.

## Useful commands

- `bun install` – install dependencies and keep `bun.lock` in sync.
- `bun run dev` – start a Next.js development server (default port 3000).
- `bun run build` – create a production build.
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

The application includes browser language detection that automatically detects the user's preferred language and serves content accordingly. This feature affects static generation and requires special handling in the layout and provider components.

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
- Record checks and results in the PR description.
- This project-specific scope overrides the generated block's "before writing any code" requirement: apply its documentation guidance only to changes that depend on Next.js APIs, conventions, routing, or build behavior. Unrelated prose edits need no Next.js documentation pass.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
