# Contributing

This repository hosts a React + TypeScript portfolio site built with Vike for pre-rendering and SSR capabilities. We welcome contributions to improve the site's functionality, performance, and user experience.

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git

### Getting Started

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/uweschwarz-eu.git
   cd uweschwarz-eu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:8080`

## Development Workflow

### Code Quality

Before submitting any changes, ensure your code meets our quality standards:

1. **Run linting:**
   ```bash
   npm run lint
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Test the build:**
   ```bash
   npm run build
   ```

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the project structure:
   - **Pages:** Add new pages in the `pages/` directory using Vike's file-based routing
   - **Components:** Add reusable components in `src/components/`
   - **Styles:** Use Tailwind CSS classes and follow the existing design system
   - **Types:** Add TypeScript types for better type safety

3. **Test your changes:**
   - Verify the development server works: `npm run dev`
   - Test the production build: `npm run build`
   - Run tests: `npm test`
   - Check linting: `npm run lint`

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your descriptive commit message"
   ```

5. **Push and create a pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Project Architecture

### Vike Framework

This project uses Vike for:
- **Pre-rendering:** Static HTML generation for better SEO and performance
- **SSR:** Server-side rendering for dynamic content
- **File-based routing:** Pages are automatically routed based on the `pages/` directory structure
- **Client-side routing:** Fast navigation without full page reloads

### Directory Structure

```
├── pages/                 # Vike pages (file-based routing)
│   ├── +config.ts        # Global Vike configuration
│   ├── index/            # Home page
│   │   ├── +Page.tsx     # Page component
│   │   └── +config.ts    # Page-specific config
│   └── ...               # Other pages
├── renderer/             # Vike renderers
│   ├── +onRenderHtml.tsx # Server-side HTML renderer
│   └── +onRenderClient.tsx # Client-side renderer
├── src/                  # Source code
│   ├── components/       # React components
│   ├── pages/            # Original page components (imported by Vike pages)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── contexts/         # React contexts
└── public/               # Static assets
```

### Adding New Pages

1. **Create a new directory** in `pages/` (e.g., `pages/new-page/`)
2. **Add the page component** (`+Page.tsx`):
   ```tsx
   export { Page }
   
   import React from 'react'
   import YourComponent from '../../src/pages/YourComponent'
   
   function Page() {
     return <YourComponent />
   }
   ```
3. **Add page configuration** (`+config.ts`):
   ```ts
   export default {
     title: 'Your Page Title',
     description: 'Your page description for SEO',
     prerender: true // or false for dynamic pages
   }
   ```

### Pre-rendering Configuration

- **Enable pre-rendering:** Set `prerender: true` in page config for static pages
- **Disable pre-rendering:** Set `prerender: false` for pages with client-side only features
- **Global settings:** Modify `pages/+config.ts` for site-wide configuration

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` types when possible
- Use strict type checking

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper error boundaries where needed

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Support both light and dark themes

### Performance

- Optimize images and assets
- Use lazy loading for heavy components
- Minimize bundle sizes
- Test pre-rendering performance

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write component tests for React components
- Test both client and server-side rendering scenarios
- Ensure tests work with Vike's SSR environment

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Changes are documented if needed

### PR Description

Include in your pull request:
- **Description:** What changes were made and why
- **Testing:** How the changes were tested
- **Screenshots:** For UI changes
- **Breaking changes:** If any, and migration steps

## Getting Help

- **Issues:** Open an issue for bugs or feature requests
- **Discussions:** Use GitHub Discussions for questions
- **Documentation:** Check the README.md for setup instructions

The sitemap is generated by the pre-commit hook only when committing to `main`.
