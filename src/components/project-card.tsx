"use client"

import { useRef } from "react"
import Link from "next/link"
import { GithubIcon, ChevronRightIcon } from "lucide-animated"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/glow-card"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
}

export function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const githubIconRef = useRef<React.ComponentRef<typeof GithubIcon>>(null)
  const liveIconRef = useRef<React.ComponentRef<typeof ChevronRightIcon>>(null)

  return (
    <GlowCard className="rounded-xl">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-base text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-3">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
              onMouseEnter={() => githubIconRef.current?.startAnimation()}
              onMouseLeave={() => githubIconRef.current?.stopAnimation()}
            >
              <GithubIcon ref={githubIconRef} size={16} className="mr-2" />
              Code
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
              onMouseEnter={() => liveIconRef.current?.startAnimation()}
              onMouseLeave={() => liveIconRef.current?.stopAnimation()}
            >
              <ChevronRightIcon ref={liveIconRef} size={16} className="mr-2" />
              Demo
            </Link>
          )}
        </CardFooter>
      </Card>
    </GlowCard>
  )
}
