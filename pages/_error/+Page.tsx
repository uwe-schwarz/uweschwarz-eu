export { Page }

import React from 'react'

interface PageProps {
  pageContext?: {
    abortStatusCode?: number
    abortReason?: string | { notAdmin: true } | { customMessage: string }
    is404?: boolean
  }
}

function Page({ pageContext }: PageProps) {
  // Extract error information from pageContext
  const { abortReason, abortStatusCode, is404 } = pageContext || {}
  
  // Determine the error message based on the error type
  let title = 'Oops!'
  let message = "Something went wrong"
  let description = "We're sorry, but something unexpected happened."
  
  if (is404) {
    title = '404'
    message = "Page Not Found"
    description = "The page you're looking for doesn't exist or has been moved."
  } else if (abortStatusCode === 401) {
    title = '401'
    message = "Unauthorized"
    description = "You need to log in to access this page."
  } else if (abortStatusCode === 403) {
    title = '403'
    message = "Forbidden"
    if (abortReason && typeof abortReason === 'object' && 'notAdmin' in abortReason) {
      description = "You cannot access this page because you aren't an administrator."
    } else {
      description = "You don't have permission to access this page."
    }
  } else if (typeof abortReason === 'string') {
    message = "Access Denied"
    description = abortReason
  } else if (abortStatusCode) {
    title = abortStatusCode.toString()
    message = "Server Error"
    description = "There was an error processing your request. Please try again later."
  }
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#ef4444' }}>
        {title}
      </h1>
      <h2 style={{ fontSize: '1.5rem', margin: '1rem 0', color: '#374151' }}>
        {message}
      </h2>
      <p style={{ fontSize: '1rem', color: '#6b7280', maxWidth: '500px', lineHeight: '1.6' }}>
        {description}
      </p>
      <div style={{ marginTop: '2rem' }}>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          Go Home
        </a>
      </div>
    </div>
  )
}

// TypeScript declarations for custom abort reasons
declare global {
  namespace Vike {
    interface PageContext {
      abortReason?:
        | string
        | { notAdmin: true }
        | { customMessage: string }
    }
  }
} 