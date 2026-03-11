"use client"

import { useEffect, useState } from "react"
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
    title: "Poker Leaderboard",
    description: "Poker leaderboard tracking player stats and rankings.",
    techStack: ["Next.js", "PostgreSQL", "Docker"],
    url: "https://poker.lbrose.dev",
    isBuiltByMe: true,
  },
  {
    title: "AIOStreams",
    description: "Self-hosted streaming solution.",
    techStack: ["Python", "Docker", "Nginx"],
    url: "https://aiostreams.lbrose.dev",
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
  const { isLoading: isLinkedinBadgeLoading, showFallback: showLinkedinFallback } = useLinkedinBadge()
  const email = "contact@lbrose.dev"

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Luis Brose</h1>
        <p className="text-muted-foreground mt-2">Software Developer</p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="https://www.linkedin.com/in/luisbrose/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <LinkedinIcon className="mr-2 h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/LuisBrose"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
          >
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied" : "Copy Email"}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
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
                <a href="https://github.com/LuisBrose" target="_blank" rel="noopener noreferrer" className="relative block">
                  {!githubStreakLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
                  <img
                    ref={(el) => { if (el?.complete && el.naturalWidth > 0) setGithubStreakLoaded(true) }}
                    src={mounted && isDark ? "/gh-streak-dark.svg" : "/gh-streak.svg"}
                    alt="GitHub contribution streak for LuisBrose"
                    onLoad={() => setGithubStreakLoaded(true)}
                    onError={() => setGithubStreakFailed(true)}
                    className={githubStreakLoaded ? "opacity-100" : "opacity-0"}
                  />
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
                  <div className="relative">
                    {!githubLangsLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
                    <img
                      ref={(el) => { if (el?.complete && el.naturalWidth > 0) setGithubLangsLoaded(true) }}
                      src={mounted && isDark ? "/gh-langs-dark.svg" : "/gh-langs.svg"}
                      alt="Top languages for LuisBrose"
                      onLoad={() => setGithubLangsLoaded(true)}
                      onError={() => setGithubLangsFailed(true)}
                      className={githubLangsLoaded ? "opacity-100" : "opacity-0"}
                    />
                  </div>
                )}
              </div>
            </div>
          </GlowCard>
          
          <GlowCard className="rounded-[10px]">
            <div className="linkedin-badge-wrapper">
              {isLinkedinBadgeLoading && !showLinkedinFallback ? (
                <LinkedinBadgeSkeleton />
              ) : null}
              {showLinkedinFallback ? (
                <LinkedinBadgeFallback />
              ) : null}
              <div
                className="badge-base LI-profile-badge linkedin-badge-light"
                data-locale="de_DE"
                data-size="large"
                data-theme="light"
                data-type="HORIZONTAL"
                data-vanity="luisbrose"
                data-version="v1"
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

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </section>
    </div>
  )
}
