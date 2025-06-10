export { onRenderClient }

import '../src/index.css'
import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import type { OnRenderClientAsync } from 'vike/types'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { SettingsProvider } from "../src/contexts/SettingsContext";
import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";

// Create a single QueryClient instance for the entire client session
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

const onRenderClient: OnRenderClientAsync = async (pageContext) => {
  const { Page } = pageContext
  const pageProps = (pageContext as any).pageProps || {}
  
  // Type assertion for Page component
  const PageComponent = Page as React.ComponentType<any>

  const page = (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SettingsProvider>
          <Toaster />
          <Sonner />
          <PageComponent {...pageProps} pageContext={pageContext} />
        </SettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )

  const container = document.getElementById('root')!
  
  if (pageContext.isHydration) {
    // First page load: hydrate the server-rendered HTML
    hydrateRoot(container, page)
  } else {
    // Subsequent page loads: client-side render
    if (!container._reactRoot) {
      container._reactRoot = createRoot(container)
    }
    container._reactRoot.render(page)
  }
}

// Extend the HTMLElement interface to include our custom property
declare global {
  interface HTMLElement {
    _reactRoot?: any
  }
} 