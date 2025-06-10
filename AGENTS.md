# AGENTS Instructions

This repository contains a personal portfolio built with React, TypeScript, Vike, and Tailwind CSS. The project uses Vike for pre-rendering and SSR capabilities to provide optimal performance and SEO.

## Project Architecture

### Framework: Vike
- **Pre-rendering:** Static HTML generation for better SEO and performance
- **SSR:** Server-side rendering for dynamic content
- **File-based routing:** Pages are automatically routed based on the `pages/` directory structure
- **Client-side routing:** Fast navigation without full page reloads

### Project Layout
- `pages/` – Vike pages with file-based routing (each page has `+Page.tsx` and `+config.ts`)
- `renderer/` – Vike renderers for HTML and client-side rendering
- `src/` – application source code (original components, hooks, utilities)
- `public/` – static assets such as the generated `sitemap.xml`
- `scripts/` – utility scripts executed by the build or git hooks
- `dist/` – build output (client and server bundles, pre-rendered HTML)

### Key Files
- `pages/+config.ts` – Global Vike configuration (pre-rendering settings, meta config)
- `renderer/+onRenderHtml.tsx` – Server-side HTML renderer
- `renderer/+onRenderClient.tsx` – Client-side renderer and hydration
- `vite.config.ts` – Vite configuration with Vike plugin

## Useful Commands
- `npm run dev` – start Vike development server on port 8080
- `npm run build` – create production build with pre-rendering
- `npm run build:dev` – create development build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint over the codebase
- `npm test` – execute unit tests via Vitest

## Build Process
The build creates:
1. **Client bundle:** Static assets in `dist/client/`
2. **Server bundle:** SSR code in `dist/server/`
3. **Pre-rendered HTML:** Static HTML files for better performance and SEO

## Page Structure

### Adding New Pages
1. Create directory in `pages/` (e.g., `pages/new-page/`)
2. Add `+Page.tsx`:
   ```tsx
   export { Page }
   
   import React from 'react'
   import YourComponent from '../../src/pages/YourComponent'
   
   function Page() {
     return <YourComponent />
   }
   ```
3. Add `+config.ts`:
   ```ts
   export default {
     title: 'Page Title',
     description: 'Page description for SEO',
     prerender: true // or false for dynamic pages
   }
   ```

### Pre-rendering Configuration
- **Static pages:** Set `prerender: true` for pages that can be pre-rendered
- **Dynamic pages:** Set `prerender: false` for pages with client-side only features (like the CV page with PDF generation)
- **Global settings:** Modify `pages/+config.ts` for site-wide configuration

## Important Notes

### SSR Compatibility
When working with components:
- Avoid browser-only APIs during SSR (use `typeof window !== 'undefined'` checks)
- React Router is replaced with Vike's routing system
- Use the custom `Link` component from `src/components/ui/link.tsx` instead of React Router's Link
- Some libraries (like `@react-pdf/renderer`) only work client-side and require `prerender: false`

### Performance Considerations
- Most pages are pre-rendered for better SEO and performance
- The CV page is client-side only due to PDF generation features
- Code splitting is automatic per page
- Static assets are optimized during build

## Git Hooks
A pre-commit hook is configured with Husky. When committing on the `main` branch it runs `node scripts/generate-sitemap.cjs` and stages the resulting `public/sitemap.xml` file. Ensure the sitemap is updated and committed when changes land on `main`.

## Agent Workflow
When modifying files in this repository:

1. **Before making changes:**
   - Understand if the page should be pre-rendered or client-side only
   - Check if components use browser-only APIs that need SSR compatibility

2. **Development process:**
   - Test with `npm run dev` to ensure development server works
   - Run `npm run build` to test production build and pre-rendering
   - Run `npm run lint` and `npm test` to ensure code quality

3. **For new pages:**
   - Create both `+Page.tsx` and `+config.ts` files
   - Import existing components from `src/pages/`
   - Configure pre-rendering appropriately

4. **For component changes:**
   - Ensure SSR compatibility (no browser-only APIs during render)
   - Use the custom Link component instead of React Router
   - Test both development and production builds

5. **Before committing:**
   - Verify all tests pass: `npm test`
   - Verify linting passes: `npm run lint`
   - Verify build succeeds: `npm run build`
   - Include clear commit message summarizing changes
   - Reference modified files in PR summaries when applicable

## Deployment
The pre-rendered static files in `dist/client/` can be deployed to any static hosting service. The build output includes:
- Pre-rendered HTML files for better SEO
- Optimized JavaScript bundles
- Static assets (fonts, images, etc.)
- Client-side routing for fast navigation
