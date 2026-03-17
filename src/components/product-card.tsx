"use client"

import { useState, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRightIcon, GithubIcon, DownloadIcon } from "lucide-animated"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GlowCard } from "@/components/glow-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useThemeTransition } from "@/hooks/use-theme-transition"
import type { Product } from "@/data/products"

type ProductCardProps = Product

function CarouselImage({
  src,
  srcDark,
  alt,
  isDark,
  onClick,
}: {
  src: string
  srcDark?: string
  alt: string
  isDark: boolean
  onClick?: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const imageSrc = srcDark && isDark ? srcDark : src

  const onLoad = useCallback(() => setLoaded(true), [])

  return (
    <button 
      type="button"
      onClick={onClick}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl cursor-pointer"
    >
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 768px) 384px, 100vw"
        className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={onLoad}
      />
    </button>
  )
}

function PreviewImage({
  src,
  srcDark,
  alt,
  isDark,
  onLoad,
}: {
  src: string
  srcDark?: string
  alt: string
  isDark: boolean
  onLoad?: () => void
}) {
  const imageSrc = srcDark && isDark ? srcDark : src

  return (
    <div className="relative w-full aspect-[16/9]">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 1400px) 60vw, (min-width: 768px) 80vw, 95vw"
        className="object-contain"
        priority
        onLoad={onLoad}
      />
    </div>
  )
}

function ImageCarousel({
  images,
  startIndex,
  isDark,
}: {
  images: { src: string; alt: string; srcDark?: string }[]
  startIndex: number
  isDark: boolean
}) {
  return (
    <Carousel key={startIndex} className="w-full">
      <CarouselContent>
        {images.slice(startIndex).concat(images.slice(0, startIndex)).map((image) => (
          <CarouselItem key={image.src}>
            <PreviewImage
              src={image.src}
              srcDark={image.srcDark}
              alt={image.alt}
              isDark={isDark}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 !border-0 !bg-black/50 !text-white hover:!bg-black/70" />
      <CarouselNext className="right-4 !border-0 !bg-black/50 !text-white hover:!bg-black/70" />
    </Carousel>
  )
}

export function ProductCard({
  title,
  description,
  note,
  url,
  urlLabel,
  urlIcon,
  secondaryUrl,
  secondaryLabel,
  githubUrl,
  images,
  projectType,
}: ProductCardProps) {
  const primaryIconRef = useRef<React.ComponentRef<typeof ChevronRightIcon>>(null)
  const secondaryIconRef = useRef<React.ComponentRef<typeof ChevronRightIcon>>(null)
  const githubIconRef = useRef<React.ComponentRef<typeof GithubIcon>>(null)
  const { isDark } = useThemeTransition()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setPreviewIndex(index)
    setPreviewOpen(true)
  }

  return (
    <>
      <GlowCard className="rounded-xl">
        <Card>
          {images && images.length > 0 && (
            <div className="relative w-full">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={image.src}>
                      <CarouselImage 
                        src={image.src} 
                        srcDark={image.srcDark} 
                        alt={image.alt} 
                        isDark={isDark}
                        onClick={() => handleImageClick(index)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{title}</CardTitle>
              {projectType && (
                <Badge variant="secondary">
                  {projectType === "uni" ? "University" : "Personal"}
                </Badge>
              )}
            </div>
            <CardDescription className="mt-2 text-base">{description}</CardDescription>
            {note && (
              <p className="mt-1 text-[10px] text-muted-foreground/80 italic">
                {note}
              </p>
            )}
          </CardHeader>
          {(url || secondaryUrl || githubUrl) && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {url && (
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                    onMouseEnter={() => primaryIconRef.current?.startAnimation()}
                    onMouseLeave={() => primaryIconRef.current?.stopAnimation()}
                  >
                    <span className="inline-flex items-center gap-1 [&_svg]:size-[1em]">
                      {urlLabel ?? "Visit"}
                      {urlIcon === "download" ? <DownloadIcon ref={primaryIconRef} /> : <ChevronRightIcon ref={primaryIconRef} />}
                    </span>
                  </Link>
                )}
                {secondaryUrl && (
                  <Link
                    href={secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                    onMouseEnter={() => secondaryIconRef.current?.startAnimation()}
                    onMouseLeave={() => secondaryIconRef.current?.stopAnimation()}
                  >
                    <span className="inline-flex items-center gap-1 [&_svg]:size-[1em]">
                      {secondaryLabel ?? "Open VSX"}
                      <ChevronRightIcon ref={secondaryIconRef} />
                    </span>
                  </Link>
                )}
                {githubUrl && (
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                    onMouseEnter={() => githubIconRef.current?.startAnimation()}
                    onMouseLeave={() => githubIconRef.current?.stopAnimation()}
                  >
                    <span className="inline-flex items-center gap-1 [&_svg]:size-[1em]">
                      <GithubIcon ref={githubIconRef} />
                      GitHub
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </Card>
      </GlowCard>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogOverlay />
        <DialogContent className="!max-w-[95vw] min-[768px]:!max-w-[80vw] min-[1400px]:!max-w-[60vw] !w-[95vw] min-[768px]:!w-[80vw] min-[1400px]:!w-[60vw] p-0 overflow-visible bg-transparent border-0 shadow-none ring-0 rounded-none" showCloseButton={false}>
          {images && images.length > 0 && (
            <ImageCarousel images={images} startIndex={previewIndex} isDark={isDark} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
