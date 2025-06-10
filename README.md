# Personal Portfolio Website

This is a personal portfolio website built with React, TypeScript, Vike, and Tailwind CSS. It showcases my projects, skills, and experience with modern web technologies and pre-rendering capabilities for optimal performance.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Vike:** A modern full-stack framework with SSR/SSG capabilities and pre-rendering support.
- **Vite:** A fast build tool and development server for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **shadcn-ui:** A collection of reusable components built using Radix UI and Tailwind CSS.
- **Supabase:** An open source Firebase alternative for building secure and scalable backend services.
- **React Hook Form:** For flexible and extensible forms in React.
- **Recharts:** A composable charting library built on React components.
- **Lucide React:** A library of simply beautiful icons.
- **React PDF:** For generating PDF documents on the client side.

## Features

- **Pre-rendering:** Static HTML generation for improved SEO and performance
- **Server-Side Rendering (SSR):** Dynamic pages rendered on the server
- **Client-Side Routing:** Fast navigation with Vike's built-in routing
- **Responsive Design:** Mobile-first design with Tailwind CSS
- **Dark/Light Theme:** Theme switching with persistent preferences
- **Multi-language Support:** English and German language support
- **PDF Generation:** Dynamic CV/resume generation in PDF and DOCX formats
- **Performance Optimized:** Code splitting and optimized bundle sizes

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation and Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vike development server, usually on `http://localhost:8080`. The application will automatically reload if you change any of the source files.

## Building the Project

To create a production build with pre-rendering, run:

```bash
npm run build
```

This command will:
- Generate optimized client-side bundles
- Create server-side rendering bundles
- Pre-render static HTML files for improved SEO and performance
- Output everything to the `dist` folder

### Build Modes

- **Production build:** `npm run build`
- **Development build:** `npm run build:dev`
- **Preview build:** `npm run preview`

## Project Structure

```
├── pages/                 # Vike pages with file-based routing
│   ├── index/            # Home page
│   ├── cv/               # CV page (client-side only)
│   ├── imprint/          # Imprint page
│   ├── privacy/          # Privacy policy page
│   └── sitemap/          # Sitemap page
├── renderer/             # Vike renderers
│   ├── +onRenderHtml.tsx # Server-side HTML renderer
│   └── +onRenderClient.tsx # Client-side renderer
├── src/                  # Source code
│   ├── components/       # React components
│   ├── pages/            # Original page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── contexts/         # React contexts
└── public/               # Static assets
```

## Testing

This project uses Vitest for testing and ESLint for linting.

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## Pre-rendering Configuration

The application uses Vike's pre-rendering capabilities to generate static HTML files for better SEO and performance. Configuration is managed through:

- **Global config:** `pages/+config.ts` - Sets default pre-rendering behavior
- **Page-specific config:** Each page can override pre-rendering settings
- **Build-time rendering:** Most pages are pre-rendered except for dynamic content (like the CV page)

## Deployment

### Cloudflare Pages

This project can be easily deployed to Cloudflare Pages with pre-rendering support.

#### Prerequisites

- A Cloudflare account
- Your project pushed to a GitHub repository

#### Steps:

1.  **Log in to Cloudflare:** Go to your Cloudflare dashboard.
2.  **Connect to Git:**
    *   In the sidebar, navigate to **Workers & Pages**.
    *   Click on **Create application**, then select the **Pages** tab.
    *   Click **Connect to Git**.
3.  **Select Repository:**
    *   Choose the GitHub repository where your project is hosted.
    *   Click **Begin setup**.
4.  **Configure Build Settings:**
    *   **Project name:** Choose a name for your Pages project.
    *   **Production branch:** Select the branch you want to deploy (e.g., `main` or `master`).
    *   **Framework preset:** Select **Vite** from the dropdown.
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist/client`
    *   **(Optional) Environment Variables:** Add any required environment variables:
        *   `VITE_SUPABASE_URL`: Your Supabase project URL.
        *   `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous public key.
5.  **Deploy:**
    *   Click **Save and Deploy**.
    *   Cloudflare Pages will build and deploy your site with pre-rendered HTML files.

### Other Deployment Options

The pre-rendered static files in `dist/client` can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any CDN or static hosting provider

## Performance Features

- **Pre-rendered HTML:** Faster initial page loads and better SEO
- **Code Splitting:** Automatic code splitting by page
- **Optimized Assets:** Compressed and optimized static assets
- **Client-side Hydration:** Fast interactivity after initial load
- **Lazy Loading:** Dynamic imports for heavy components

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
