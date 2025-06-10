import React from 'react'
import { cn } from '@/lib/utils'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  children: React.ReactNode
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={to}
        className={cn(className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link' 