"use client"

import { useEffect, useState, useRef, useLayoutEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { GithubIcon, LinkedinIcon, CopyIcon, AtSignIcon } from "lucide-animated"
import { ChevronDown } from "lucide-react"
import { toast } from "sonner"
import { ProductCard } from "@/components/product-card"
import { LinkedinBadgeSkeleton } from "@/components/linkedin-badge-skeleton"
import { LinkedinBadgeFallback } from "@/components/linkedin-badge-fallback"
import { useLinkedinBadge } from "@/hooks/use-linkedin-badge"
import { GlowCard } from "@/components/glow-card"
import { Skeleton } from "@/components/ui/skeleton"
import { ParticleLogo3d } from "@/components/particle-logo-3d"

const products = [
  {
    title: "Force Push Button",
    description: "A VS Code extension that streamlines force-pushing workflows with dedicated buttons in the Source Control view. Features a main button that opens a repository selector for multi-repo workspaces, plus individual buttons in each repository's title bar for quick access. All buttons intelligently activate only when there are changes to push, making force-pushing more convenient.",
    url: "https://marketplace.visualstudio.com/items?itemName=LuisBrose.force-push-button",
    urlLabel: "VS Code Marketplace",
    secondaryUrl: "https://open-vsx.org/extension/luisbrose/force-push-button",
    secondaryLabel: "Open VSX",
    images: [
      { src: "/thumbnails/force-push-button-1.png", alt: "Force Push Button VS Code Extension - Showcase" },
      { src: "/thumbnails/force-push-button-2.png", alt: "Force Push Button VS Code Extension - Store Page" },
      { src: "/thumbnails/force-push-button-3.png", alt: "Force Push Button VS Code Extension - Settings" },
    ],
    isBuiltByMe: true,
  },
  {
    title: "Poker Leaderboard",
    description: "Poker leaderboard tracking player stats and rankings.",
    url: "https://poker.lbrose.dev",
    images: [
      { src: "/thumbnails/poker-leaderboard-1.png", alt: "Poker Leaderboard - Performance Visualization" },
      { src: "/thumbnails/poker-leaderboard-2.png", alt: "Poker Leaderboard - Leaderboard" },
      { src: "/thumbnails/poker-leaderboard-3.png", alt: "Poker Leaderboard - Session History" },
    ],
    isBuiltByMe: true,
  },
  {
    title: "AIOStreams",
    description:
      "Self-hosted Stremio super-addon that aggregates multiple addons and debrid/usenet sources into one highly customisable stream hub.",
    note: "Access to my instance is password-protected feel free to reach out via contact@lbrose.dev for the password.",
    url: "https://aiostreams.lbrose.dev",
    images: [
      { src: "/thumbnails/aiostreams-1.png", alt: "AIOStreams - Homepage" },
      { src: "/thumbnails/aiostreams-2.png", alt: "AIOStreams - Services" },
      { src: "/thumbnails/aiostreams-3.png", alt: "AIOStreams - Filters" },
    ],
    isBuiltByMe: false,
  },
]

export default function Home() {
  const [githubStreakFailed, setGithubStreakFailed] = useState(false)
  const [githubLangsFailed, setGithubLangsFailed] = useState(false)
  const [githubStreakLoaded, setGithubStreakLoaded] = useState(false)
  const [githubLangsLoaded, setGithubLangsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [visualTheme, setVisualTheme] = useState<"light" | "dark" | undefined>(undefined)
  const isDark = visualTheme === "dark" || (visualTheme === undefined && resolvedTheme === "dark")
  const prevTheme = useRef(resolvedTheme)
  const skipNextThemeUpdate = useRef(false)
  const [themeCounter, setThemeCounter] = useState(0)
  const { isLoading: isLinkedinBadgeLoading, showFallback: showLinkedinFallback } = useLinkedinBadge()
  const email = "contact@lbrose.dev"

  const linkedinIconRef = useRef<React.ComponentRef<typeof LinkedinIcon>>(null)
  const githubIconRef = useRef<React.ComponentRef<typeof GithubIcon>>(null)
  const emailIconRef = useRef<React.ComponentRef<typeof AtSignIcon>>(null)
  const copyIconRef = useRef<React.ComponentRef<typeof CopyIcon>>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeTransition = useCallback((e: CustomEvent<{ theme: string }>) => {
    setVisualTheme(e.detail.theme as "light" | "dark")
    setThemeCounter((c) => c + 1)
    skipNextThemeUpdate.current = true
  }, [])

  useEffect(() => {
    window.addEventListener("theme-transition", handleThemeTransition as EventListener)
    return () => {
      window.removeEventListener("theme-transition", handleThemeTransition as EventListener)
    }
  }, [handleThemeTransition])

  useLayoutEffect(() => {
    if (skipNextThemeUpdate.current) {
      skipNextThemeUpdate.current = false
      prevTheme.current = resolvedTheme
      return
    }
    if (mounted && resolvedTheme !== prevTheme.current) {
      prevTheme.current = resolvedTheme
      setGithubStreakLoaded(false)
      setGithubLangsLoaded(false)
      setThemeCounter((c) => c + 1)
      setVisualTheme(resolvedTheme as "light" | "dark")
    }
  }, [resolvedTheme, mounted])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    toast.success("Email copied to clipboard")
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
    <div className="min-h-screen">
      <section
        id="home"
        className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center scroll-mt-20 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="pointer-events-auto">
            <ParticleLogo3d color={isDark ? "#a1a1aa" : "#1a1a1a"} />
          </div>
        </div>
        <div className="relative z-10 flex flex-col pointer-events-none items-center min-h-[calc(100vh-10rem)]">
          <div className="h-[300px] md:h-[350px] pointer-events-none" />
          <div className="pointer-events-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Luis Brose</h1>
            <p className="mt-2 text-lg text-muted-foreground">Software Developer</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center pointer-events-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/luisbrose/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 text-sm md:text-base font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
                  onMouseEnter={() => linkedinIconRef.current?.startAnimation()}
                  onMouseLeave={() => linkedinIconRef.current?.stopAnimation()}
                >
                  <LinkedinIcon ref={linkedinIconRef} size={18} className="mr-1.5 md:mr-2 md:size-5" />
                  LinkedIn
                </a>
                <a href="#about" onClick={handleAnchorClick("#about")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <span>More</span>
                  <ChevronDown className="size-4 animate-bounce" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/LuisBrose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 text-sm md:text-base font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
                  onMouseEnter={() => githubIconRef.current?.startAnimation()}
                  onMouseLeave={() => githubIconRef.current?.stopAnimation()}
                >
                  <GithubIcon ref={githubIconRef} size={18} className="mr-1.5 md:mr-2 md:size-5" />
                  GitHub
                </a>
                <a href="#about" onClick={handleAnchorClick("#about")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <span>More</span>
                  <ChevronDown className="size-4 animate-bounce" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-nowrap justify-center items-center gap-2 md:gap-3 pointer-events-auto">
            <span className="text-sm md:text-base text-muted-foreground shrink-0">{email}</span>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center h-8 px-2.5 md:px-3 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors shrink-0"
              onMouseEnter={() => emailIconRef.current?.startAnimation()}
              onMouseLeave={() => emailIconRef.current?.stopAnimation()}
            >
              <AtSignIcon ref={emailIconRef} size={16} className="mr-1" />
              Mail
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center h-8 px-2.5 md:px-3 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors shrink-0"
              onMouseEnter={() => copyIconRef.current?.startAnimation()}
              onMouseLeave={() => copyIconRef.current?.stopAnimation()}
            >
              <CopyIcon ref={copyIconRef} size={16} className="mr-1" />
              Copy
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div id="about" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6">About</h2>
          <div className="flex flex-wrap items-start justify-center gap-6">
          <GlowCard className="rounded-lg w-full max-w-[495px] mx-auto md:mx-0">
            <div className="github-card">
              {githubStreakFailed ? (
                <a
                  href="https://github.com/LuisBrose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <GithubIcon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">LuisBrose</p>
                    <p className="text-xs text-muted-foreground">github.com/LuisBrose</p>
                  </div>
                </a>
              ) : (
                <div className="relative w-full" style={{ aspectRatio: "464/183" }}>
                  <Skeleton className="absolute inset-0 rounded-none" />
                  {mounted && (
                    <img
                      src={`${isDark ? "/gh-streak-dark.svg" : "/gh-streak.svg"}?t=${themeCounter}`}
                      alt="GitHub contribution streak for LuisBrose"
                      className="absolute inset-0 w-full h-full object-contain z-10"
                      suppressHydrationWarning
                    />
                  )}
                </div>
              )}
              <div>
                {githubLangsFailed ? (
                  <a
                    href="https://github.com/LuisBrose?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <GithubIcon size={16} />
                    <span>Top languages</span>
                  </a>
                ) : (
                  <div className="relative w-full" style={{ aspectRatio: "464/255" }}>
                    <Skeleton className="absolute inset-0 rounded-none" />
                    {mounted && (
                      <img
                        src={`${isDark ? "/gh-langs-dark.svg" : "/gh-langs.svg"}?t=${themeCounter}`}
                        alt="Top languages for LuisBrose"
                        className="absolute inset-0 w-full h-full object-contain z-10"
                        suppressHydrationWarning
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </GlowCard>
          
          <GlowCard className="rounded-[10px] w-full max-w-[330px] mx-auto md:mx-0">
            <div className="linkedin-badge-wrapper" style={{ minHeight: 277 }}>
              {isLinkedinBadgeLoading && !showLinkedinFallback && <LinkedinBadgeSkeleton />}
              {showLinkedinFallback && (
                <>
                  <LinkedinBadgeFallback theme="light" className="linkedin-badge-light" />
                  <LinkedinBadgeFallback theme="dark" className="linkedin-badge-dark" />
                </>
              )}
              <div
                className="badge-base LI-profile-badge linkedin-badge-light"
                data-locale="de_DE"
                data-size="large"
                data-theme="light"
                data-type="HORIZONTAL"
                data-vanity="luisbrose"
                data-version="v1"
                suppressHydrationWarning
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://de.linkedin.com/in/luisbrose?trk=profile-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Luis Brose
                </a>
              </div>
              <div
                className="badge-base LI-profile-badge linkedin-badge-dark"
                data-locale="de_DE"
                data-size="large"
                data-theme="dark"
                data-type="HORIZONTAL"
                data-vanity="luisbrose"
                data-version="v1"
                suppressHydrationWarning
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://de.linkedin.com/in/luisbrose?trk=profile-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Luis Brose
                </a>
              </div>
            </div>
          </GlowCard>
        </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl space-y-10">
        <div id="projects" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {products
              .filter((product) => product.isBuiltByMe)
              .map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
          </div>
        </div>

        <div id="hosting" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6">Hosting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {products
              .filter((product) => !product.isBuiltByMe)
              .map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}