# Personal Portfolio Website

This is a personal portfolio website built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. It showcases my projects, skills, and experience with modern UX enhancements powered by shadcn/ui, Radix primitives, and React Query. The site features automatic browser language detection (English/German) and generates dynamic CV assets.

## Technologies Used

- **Next.js 16** with the App Router for hybrid SSR/CSR routing.
- **React 19** and **TypeScript** for type-safe, interactive UI components.
- **Tailwind CSS** and **shadcn/ui** for rapid, accessible component styling.
- **Supabase** integrations and custom scripts for dynamic CV asset generation.
- **React Query** for client-side data management.
- **Resend** for handling contact form submissions through a Next.js route handler.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Bun package manager

### Installation and Running Locally

1. **Clone the repository:**

   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Start the development server:**
   ```bash
   bun run dev
   ```
   The Next.js development server starts on `http://localhost:3000` (or the next available port). The application automatically reloads when you change source files.

## Building the Project

Create a production build with:

```bash
bun run build
```

To preview the production bundle locally:

```bash
bun run start
```

## Deployment to Vercel

This project is optimised for deployment on [Vercel](https://vercel.com/).

1. Push the repository to GitHub
2. Import the project into Vercel and select the repository
3. Vercel automatically detects the Next.js framework and configures the build settings
4. Configure environment variables in the Vercel dashboard (see Environment Variables section below)
5. Deploy. Subsequent pushes to the configured branch trigger new deployments automatically

## Useful Scripts

- `bun run generate:cv` – regenerate downloadable CV assets based on content changes.
- `bun run generate:sitemap` – refresh the static sitemap XML.
- `bun run generate:llms` – produce the `llms.txt` description for AI crawlers.

## Environment Variables

The following environment variables may need to be configured:

- `RESEND_API_KEY` - Required for contact form functionality
- Other API keys as needed for integrations

## Automated Assets

Git hooks ensure that the sitemap and CV artefacts stay in sync with content changes. Remember to commit generated files when scripts update them.

## Features

- **Automatic Language Detection**: Detects user's browser language preference and serves content in English or German
- **Dynamic CV Generation**: Automatically generates downloadable CV assets in multiple formats
- **Responsive Design**: Optimized for desktop and mobile devices
- **SEO Optimized**: Automatic sitemap generation and meta tags
- **Contact Form**: Integrated email functionality via Resend API
