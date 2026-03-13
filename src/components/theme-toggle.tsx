"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { SunIcon, MoonIcon } from "lucide-animated"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const sunIconRef = React.useRef<React.ComponentRef<typeof SunIcon>>(null)
  const moonIconRef = React.useRef<React.ComponentRef<typeof MoonIcon>>(null)

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentTheme = resolvedTheme || theme
    const newTheme = currentTheme === "light" ? "dark" : "light"
    
    const x = event.clientX
    const y = event.clientY
    
    document.documentElement.style.setProperty("--theme-transition-x", `${x}px`)
    document.documentElement.style.setProperty("--theme-transition-y", `${y}px`)

    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.toggle("dark", newTheme === "dark")
        window.dispatchEvent(new CustomEvent("theme-transition", { 
          detail: { theme: newTheme } 
        }))
      })
    }).finished.then(() => {
      setTheme(newTheme)
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      onMouseEnter={() => {
        sunIconRef.current?.startAnimation()
        moonIconRef.current?.startAnimation()
      }}
      onMouseLeave={() => {
        sunIconRef.current?.stopAnimation()
        moonIconRef.current?.stopAnimation()
      }}
    >
      <SunIcon ref={sunIconRef} size={19} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon ref={moonIconRef} size={19} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
