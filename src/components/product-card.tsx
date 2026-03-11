"use client"

import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GlowCard } from "@/components/glow-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ProductCardProps {
  title: string
  description: string
  note?: string
  url: string
  urlLabel?: string
  secondaryUrl?: string
  secondaryLabel?: string
  images?: { src: string; alt: string }[]
  isBuiltByMe?: boolean
}

export function ProductCard({
  title,
  description,
  note,
  url,
  urlLabel,
  secondaryUrl,
  secondaryLabel,
  images,
  isBuiltByMe = false,
}: ProductCardProps) {
  return (
    <GlowCard className="rounded-xl">
      <Card>
        {images && images.length > 0 && (
          <div className="relative w-full">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image) => (
                  <CarouselItem key={image.src}>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 768px) 384px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="mt-2 text-base">{description}</CardDescription>
          {note && (
            <p className="mt-1 text-[10px] text-muted-foreground/80 italic">
              {note}
            </p>
          )}
        </CardHeader>
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              <span className="mr-1">{urlLabel ?? "Visit"}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            {secondaryUrl && (
              <Link
                href={secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                <span className="mr-1">{secondaryLabel ?? "Open VSX"}</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </Card>
    </GlowCard>
  )
}
