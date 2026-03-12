"use client"

import * as React from "react"
import { SunIcon, MoonIcon } from "lucide-animated"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const sunIconRef = React.useRef<React.ComponentRef<typeof SunIcon>>(null)
  const moonIconRef = React.useRef<React.ComponentRef<typeof MoonIcon>>(null)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
