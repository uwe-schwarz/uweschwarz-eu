# AGENTS Instructions

This repository contains a personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Project layout

- `src/` – application source code (pages, components, hooks).
- `public/` – static assets such as the generated `sitemap.xml`.
- `scripts/` – utility scripts executed by the build or git hooks.

## Useful commands

- `bun install` – install dependencies and keep `bun.lock` in sync.
- `bun run dev` – start a Next.js development server (default port 3000).
- `bun run build` – create a production build.
- `bun run lint` – run Oxlint over the codebase.
- `bun run typecheck` – run TypeScript checks without emitting files.
- `bun run format:check` – verify formatting with Oxfmt.
- `bun run format` – apply formatting with Oxfmt.

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
- Components should use `React.forwardRef` and have explicit `displayName`
- Define props interfaces extending React HTML attributes
- Use interfaces for object shapes and types for unions
- Handle errors with try/catch in async operations and API functions

## Agent workflow

When modifying files in this repository:

1. Run the required checks in this exact order:
   - `bun run lint`
   - `bun run typecheck`
   - `bun run format:check`
2. If checks fail, possible fixes with:
   - `bun run lint --fix`
   - `bun run format`
3. Fix all remaining errors.
4. These checks are mandatory before every commit, push, and PR.
5. Document the executed checks and their results in the PR description.
6. Include a clear commit message summarising the change.
7. Reference any modified files in PR summaries when applicable.
