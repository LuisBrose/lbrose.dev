"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ChevronRightIcon, GithubIcon } from "lucide-animated"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GlowCard } from "@/components/glow-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"

interface ProductCardProps {
  title: string
  description: string
  note?: string
  url: string
  urlLabel?: string
  secondaryUrl?: string
  secondaryLabel?: string
  githubUrl?: string
  images?: { src: string; alt: string; srcDark?: string }[]
  isBuiltByMe?: boolean
}

function CarouselImage({ 
  src, 
  srcDark, 
  alt, 
  onClick 
}: { 
  src: string
  srcDark?: string
  alt: string
  onClick?: () => void 
}) {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [visualTheme, setVisualTheme] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleThemeTransition = (e: CustomEvent<{ theme: string }>) => {
      setVisualTheme(e.detail.theme as "light" | "dark")
    }
    window.addEventListener("theme-transition", handleThemeTransition as EventListener)
    return () => {
      window.removeEventListener("theme-transition", handleThemeTransition as EventListener)
    }
  }, [])

  useEffect(() => {
    if (visualTheme && resolvedTheme === visualTheme) {
      setVisualTheme(null)
    }
  }, [resolvedTheme, visualTheme])

  const isDark = mounted && (visualTheme ?? resolvedTheme) === "dark"
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
  onLoad 
}: { 
  src: string
  srcDark?: string
  alt: string
  onLoad?: () => void 
}) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [visualTheme, setVisualTheme] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleThemeTransition = (e: CustomEvent<{ theme: string }>) => {
      setVisualTheme(e.detail.theme as "light" | "dark")
    }
    window.addEventListener("theme-transition", handleThemeTransition as EventListener)
    return () => {
      window.removeEventListener("theme-transition", handleThemeTransition as EventListener)
    }
  }, [])

  useEffect(() => {
    if (visualTheme && resolvedTheme === visualTheme) {
      setVisualTheme(null)
    }
  }, [resolvedTheme, visualTheme])

  const isDark = mounted && (visualTheme ?? resolvedTheme) === "dark"
  const imageSrc = srcDark && isDark ? srcDark : src

  return (
    <div className="relative w-full aspect-[16/9]">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 768px) 60vw, 95vw"
        className="object-contain"
        priority
        onLoad={onLoad}
      />
    </div>
  )
}

function ImageCarousel({ 
  images, 
  startIndex 
}: { 
  images: { src: string; alt: string; srcDark?: string }[]
  startIndex: number 
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
  secondaryUrl,
  secondaryLabel,
  githubUrl,
  images,
  isBuiltByMe = false,
}: ProductCardProps) {
  const primaryIconRef = useRef<React.ComponentRef<typeof ChevronRightIcon>>(null)
  const secondaryIconRef = useRef<React.ComponentRef<typeof ChevronRightIcon>>(null)
  const githubIconRef = useRef<React.ComponentRef<typeof GithubIcon>>(null)
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
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-2 text-base">{description}</CardDescription>
            {note && (
              <p className="mt-1 text-[10px] text-muted-foreground/80 italic">
                {note}
              </p>
            )}
          </CardHeader>
          <div className="px-6 pb-4">
            <div className="flex flex-nowrap gap-2">
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
                  <ChevronRightIcon ref={primaryIconRef} />
                </span>
              </Link>
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
        </Card>
      </GlowCard>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogOverlay />
        <DialogContent className="!max-w-[95vw] md:!max-w-[60vw] !w-[95vw] md:!w-[60vw] p-0 overflow-visible bg-transparent border-0 shadow-none ring-0 rounded-none" showCloseButton={false}>
          {images && images.length > 0 && (
            <ImageCarousel images={images} startIndex={previewIndex} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
