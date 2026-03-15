"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuIcon } from "lucide-animated"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#hosting", label: "Hosting" },
]

export function Navbar() {
  const [isHovering, setIsHovering] = useState(false)
  const [logoRotation, setLogoRotation] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuIconRef = useRef<React.ComponentRef<typeof MenuIcon>>(null)

  const handleMenuToggle = () => {
    const next = !menuOpen
    setMenuOpen(next)
    if (next) {
      menuIconRef.current?.startAnimation()
    } else {
      menuIconRef.current?.stopAnimation()
    }
  }

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
    setMenuOpen(false)
    menuIconRef.current?.stopAnimation()
  }

  return (
    <>
      {/* Portrait and Desktop: Full header */}
      <header className="fixed top-0 z-[100] w-full border-b bg-background landscape:hidden lg:block">
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
          {navItems.slice(1).map((item) => (
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
    {/* Mobile landscape: Minimal header with burger and theme toggle */}
    <header className="hidden landscape:flex lg:hidden fixed top-0 z-[100] w-full items-center justify-between px-4 py-2 pointer-events-none">
      <button
        onClick={handleMenuToggle}
        className="p-2 rounded-md hover:bg-muted transition-colors pointer-events-auto"
        aria-label="Toggle menu"
      >
        <MenuIcon
          ref={menuIconRef}
          size={20}
          className="pointer-events-none"
        />
      </button>
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </header>
    {/* Dropdown menu for mobile landscape */}
    {menuOpen && (
      <div className="hidden landscape:flex lg:hidden fixed top-12 left-0 right-0 z-[99] bg-background border-b shadow-lg">
        <nav className="container mx-auto px-4 py-3 max-w-4xl flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick(item.href)}
              className={cn(
                "text-base font-medium transition-colors hover:text-foreground/80 py-2",
                "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    )}
    {/* Spacer - only on portrait and desktop */}
    <div className="h-14 landscape:lg:block landscape:hidden" />
  </>
  )
}
