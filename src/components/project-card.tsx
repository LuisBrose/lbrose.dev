import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-7 px-2.5 text-xs font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
          >
            <Github className="mr-2 h-3.5 w-3.5" />
            Code
          </Link>
        )}
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-7 px-2.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <ExternalLink className="mr-2 h-3.5 w-3.5" />
            Demo
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
