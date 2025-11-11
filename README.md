# Personal Portfolio Website

This is a personal portfolio website built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. It showcases my projects, skills, and experience with modern UX enhancements powered by shadcn/ui, Radix primitives, and React Query.

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
- npm (bundled with Node.js)

### Installation and Running Locally

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The Next.js development server starts on `http://localhost:3000`. The application automatically reloads when you change source files.

## Building the Project

Create a production build with:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run start
```

## Testing

Run the unit test suite with Vitest:

```bash
npm test
```

## Deployment to Vercel

This project is optimised for deployment on [Vercel](https://vercel.com/).

1. Push the repository to GitHub (or another Git provider).
2. Import the project into Vercel and select the repository.
3. Vercel automatically detects the Next.js framework. Use the default build command (`npm run build`) and output directory (`.next`).
4. Configure environment variables (for example `RESEND_API_KEY`) in the Vercel dashboard as needed.
5. Deploy. Subsequent pushes to the configured branch trigger new deployments automatically.

## Useful Scripts

- `npm run generate:cv` – regenerate downloadable CV assets based on content changes.
- `npm run generate:sitemap` – refresh the static sitemap XML.
- `npm run generate:llms` – produce the `llms.txt` description for AI crawlers.

## Automated Assets

Git hooks ensure that the sitemap and CV artefacts stay in sync with content changes. Remember to commit generated files when scripts update them.
