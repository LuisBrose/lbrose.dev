"use client"

import { useState, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRightIcon } from "lucide-animated"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GlowCard } from "@/components/glow-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

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

function CarouselImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  const onLoad = useCallback(() => setLoaded(true), [])

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 384px, 100vw"
        className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={onLoad}
      />
    </div>
  )
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
  const primaryIconRef = useRef<React.ComponentRef<typeof ChevronRightIcon>>(null)
  const secondaryIconRef = useRef<React.ComponentRef<typeof ChevronRightIcon>>(null)

  return (
    <GlowCard className="rounded-xl">
      <Card>
        {images && images.length > 0 && (
          <div className="relative w-full">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image) => (
                  <CarouselItem key={image.src}>
                    <CarouselImage src={image.src} alt={image.alt} />
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
              onMouseEnter={() => primaryIconRef.current?.startAnimation()}
              onMouseLeave={() => primaryIconRef.current?.stopAnimation()}
            >
              <span className="mr-1">{urlLabel ?? "Visit"}</span>
              <ChevronRightIcon ref={primaryIconRef} size={16} />
            </Link>
            {secondaryUrl && (
              <Link
                href={secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted transition-colors"
                onMouseEnter={() => secondaryIconRef.current?.startAnimation()}
                onMouseLeave={() => secondaryIconRef.current?.stopAnimation()}
              >
                <span className="mr-1">{secondaryLabel ?? "Open VSX"}</span>
                <ChevronRightIcon ref={secondaryIconRef} size={16} />
              </Link>
            )}
          </div>
        </div>
      </Card>
    </GlowCard>
  )
}
