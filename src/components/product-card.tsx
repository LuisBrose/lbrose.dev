import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/glow-card"

interface ProductCardProps {
  title: string
  description: string
  techStack: string[]
  url: string
  isBuiltByMe?: boolean
}

export function ProductCard({
  title,
  description,
  techStack,
  url,
  isBuiltByMe = false,
}: ProductCardProps) {
  return (
    <GlowCard className="rounded-xl">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{title}</CardTitle>
            {isBuiltByMe && (
              <Badge variant="secondary">Built</Badge>
            )}
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div className="px-6 pb-4">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium hover:underline"
          >
            Visit <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </Card>
    </GlowCard>
  )
}
