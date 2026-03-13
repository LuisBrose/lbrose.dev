"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#hosting", label: "Hosting" },
]

export function Navbar() {
  const [isHovering, setIsHovering] = useState(false)
  const [logoRotation, setLogoRotation] = useState(0)

  const handleLogoEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const enteredFromLeft = event.clientX < centerX
    const angle = (enteredFromLeft ? 1 : -1) * (8 + Math.random() * 7)
    setLogoRotation(angle)
    setIsHovering(true)
  }

  const handleAnchorClick = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return
    event.preventDefault()
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return

    el.scrollIntoView({ behavior: "smooth", block: "start" })
    if (window.history?.replaceState) {
      window.history.replaceState(null, "", href)
    }
  }

  return (
    <>
      <header className="fixed top-0 z-[100] w-full border-b bg-background supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur">
        <div className="container flex h-14 items-center mx-auto px-4 max-w-4xl">
        <Link
          href="#home"
          onClick={handleAnchorClick("#home")}
          onMouseEnter={handleLogoEnter}
          onMouseLeave={() => setIsHovering(false)}
          className="mr-4 inline-flex items-center"
        >
          <Image
            src="/icon/android-chrome-192x192.png"
            alt="Luis Brose logo"
            width={32}
            height={32}
            className="rounded invert dark:invert-0 transition-transform duration-300 ease-out"
            style={{ transform: isHovering ? `scale(1.1) rotate(${logoRotation}deg)` : "scale(1) rotate(0deg)" }}
          />
        </Link>
        <nav className="flex items-center space-x-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick(item.href)}
              className={cn(
                "text-base font-medium transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
      <div className="h-14" />
    </>
  )
}
