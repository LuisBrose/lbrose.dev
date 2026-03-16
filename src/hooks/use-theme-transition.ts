"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

type ThemeName = "light" | "dark"

export function useThemeTransition() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [visualTheme, setVisualTheme] = useState<ThemeName | null>(null)
  const [themeCounter, setThemeCounter] = useState(0)
  const prevTheme = useRef(resolvedTheme)
  const skipNextResolvedUpdate = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleThemeTransition = (e: CustomEvent<{ theme: string }>) => {
      setVisualTheme(e.detail.theme as ThemeName)
      setThemeCounter((count) => count + 1)
      skipNextResolvedUpdate.current = true
    }

    window.addEventListener("theme-transition", handleThemeTransition as EventListener)
    return () => {
      window.removeEventListener("theme-transition", handleThemeTransition as EventListener)
    }
  }, [])

  useEffect(() => {
    if (skipNextResolvedUpdate.current) {
      skipNextResolvedUpdate.current = false
      prevTheme.current = resolvedTheme
      return
    }

    if (mounted && resolvedTheme !== prevTheme.current) {
      prevTheme.current = resolvedTheme
      setThemeCounter((count) => count + 1)
      setVisualTheme(resolvedTheme as ThemeName)
    }
  }, [resolvedTheme, mounted])

  useEffect(() => {
    if (visualTheme && resolvedTheme === visualTheme) {
      setVisualTheme(null)
    }
  }, [resolvedTheme, visualTheme])

  const isDark = mounted && (visualTheme ?? resolvedTheme) === "dark"

  return { resolvedTheme, visualTheme, mounted, isDark, themeCounter }
}
