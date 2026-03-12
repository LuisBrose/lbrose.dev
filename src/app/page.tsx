"use client"

import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useTheme } from "next-themes"
import { GithubIcon, LinkedinIcon, Mail, Copy, Check } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { LinkedinBadgeSkeleton } from "@/components/linkedin-badge-skeleton"
import { LinkedinBadgeFallback } from "@/components/linkedin-badge-fallback"
import { useLinkedinBadge } from "@/hooks/use-linkedin-badge"
import { GlowCard } from "@/components/glow-card"
import { Skeleton } from "@/components/ui/skeleton"

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
  const [copied, setCopied] = useState(false)
  const [githubStreakFailed, setGithubStreakFailed] = useState(false)
  const [githubLangsFailed, setGithubLangsFailed] = useState(false)
  const [githubStreakLoaded, setGithubStreakLoaded] = useState(false)
  const [githubLangsLoaded, setGithubLangsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const prevTheme = useRef(resolvedTheme)
  const [themeCounter, setThemeCounter] = useState(0)
  const { isLoading: isLinkedinBadgeLoading, showFallback: showLinkedinFallback } = useLinkedinBadge()
  const email = "contact@lbrose.dev"

  useEffect(() => {
    setMounted(true)
  }, [])

  useLayoutEffect(() => {
    if (mounted && resolvedTheme !== prevTheme.current) {
      prevTheme.current = resolvedTheme
      setGithubStreakLoaded(false)
      setGithubLangsLoaded(false)
      setThemeCounter((c) => c + 1)
    }
  }, [resolvedTheme, mounted])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  return (
    <div className="min-h-screen">
      <section
        id="home"
        className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] scroll-mt-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Luis Brose</h1>
        <p className="mt-2 text-lg text-muted-foreground">Software Developer</p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="https://www.linkedin.com/in/luisbrose/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-5 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <LinkedinIcon className="mr-2 h-5 w-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/LuisBrose"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-5 text-base font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
          >
            <GithubIcon className="mr-2 h-5 w-5" />
            GitHub
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center h-10 px-5 text-base font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center justify-center h-10 px-5 text-base font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
          >
            {copied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
            {copied ? "Copied" : "Copy Email"}
          </button>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6 mt-12">
          <GlowCard className="rounded-lg">
            <div className="github-card">
              {githubStreakFailed ? (
                <a
                  href="https://github.com/LuisBrose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <GithubIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">LuisBrose</p>
                    <p className="text-xs text-muted-foreground">github.com/LuisBrose</p>
                  </div>
                </a>
              ) : (
                <a href="https://github.com/LuisBrose" target="_blank" rel="noopener noreferrer" className="relative block" style={{ aspectRatio: "495/195" }}>
                  {(!mounted || !githubStreakLoaded) && <Skeleton className="absolute inset-0 rounded-none" />}
                  {mounted && (
                    <img
                      ref={(el) => { if (el?.complete && el.naturalWidth > 0) setGithubStreakLoaded(true) }}
                      src={`${isDark ? "/gh-streak-dark.svg" : "/gh-streak.svg"}?t=${themeCounter}`}
                      alt="GitHub contribution streak for LuisBrose"
                      onLoad={() => setGithubStreakLoaded(true)}
                      onError={() => setGithubStreakFailed(true)}
                      className={githubStreakLoaded ? "opacity-100" : "opacity-0"}
                    />
                  )}
                </a>
              )}
              <div className="mt-2">
                {githubLangsFailed ? (
                  <a
                    href="https://github.com/LuisBrose?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>Top languages</span>
                  </a>
                ) : (
                  <div className="relative" style={{ aspectRatio: "300/165" }}>
                    {(!mounted || !githubLangsLoaded) && <Skeleton className="absolute inset-0 rounded-none" />}
                    {mounted && (
                      <img
                        ref={(el) => { if (el?.complete && el.naturalWidth > 0) setGithubLangsLoaded(true) }}
                        src={`${isDark ? "/gh-langs-dark.svg" : "/gh-langs.svg"}?t=${themeCounter}`}
                        alt="Top languages for LuisBrose"
                        onLoad={() => setGithubLangsLoaded(true)}
                        onError={() => setGithubLangsFailed(true)}
                        className={githubLangsLoaded ? "opacity-100" : "opacity-0"}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </GlowCard>
          
          <GlowCard className="rounded-[10px]">
            <div className="linkedin-badge-wrapper">
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
