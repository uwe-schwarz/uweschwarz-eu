import type { Config } from 'vike/types'

export default {
  // Enable pre-rendering for all pages by default
  prerender: true,
  
  // Pass pageProps to client
  passToClient: ['pageProps', 'title', 'description'],
  
  // Client routing for better UX
  clientRouting: true,
  
  // Hydration can be aborted for better performance
  hydrationCanBeAborted: true,
  
  // Meta configuration for custom properties
  meta: {
    title: {
      env: { server: true, client: true }
    },
    description: {
      env: { server: true, client: true }
    }
  }
} satisfies Config

// Extend the global Vike.Config interface
declare global {
  namespace Vike {
    interface Config {
      title?: string
      description?: string
    }
  }
}

// Tell TypeScript this file isn't an ambient module
export {} 