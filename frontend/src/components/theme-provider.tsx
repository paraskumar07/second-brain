// components/theme-provider.tsx
"use client"

import type { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface Props {
  children: ReactNode
  defaultTheme?: string
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
}: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  )
}
