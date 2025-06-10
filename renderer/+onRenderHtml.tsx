export { onRenderHtml }

import '../src/index.css'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import type { OnRenderHtmlAsync } from 'vike/types'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { SettingsProvider } from "../src/contexts/SettingsContext";

const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const { Page } = pageContext
  const pageProps = (pageContext as any).pageProps || {}
  
  // Create a new QueryClient for each request to avoid state leakage
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: false,
      },
    },
  })

  // Type assertion for Page component
  const PageComponent = Page as React.ComponentType<any>

  const pageHtml = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SettingsProvider>
          <PageComponent {...pageProps} />
        </SettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )

  // Get page title and description
  const title = (pageContext as any).config?.title || (pageContext as any).title || 'Uwe Schwarz - Portfolio'
  const description = (pageContext as any).config?.description || (pageContext as any).description || 'Personal portfolio website showcasing projects, skills, and experience.'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which will be available in the browser
    }
  }
} 