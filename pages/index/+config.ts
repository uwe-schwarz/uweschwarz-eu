import type { Config } from 'vike/types'

export default {
  title: 'Uwe Schwarz - Portfolio',
  description: 'Personal portfolio website showcasing projects, skills, and experience in web development and software engineering.'
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