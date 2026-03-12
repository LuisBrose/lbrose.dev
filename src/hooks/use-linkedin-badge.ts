import { useEffect, useState } from "react"

export function useLinkedinBadge() {
  const [isLoading, setIsLoading] = useState(true)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    const iframeObservers = new Map<HTMLIFrameElement, MutationObserver>()
    const iframeLoadHandlers = new Map<HTMLIFrameElement, () => void>()

    const patchBadgeIframe = (iframe: HTMLIFrameElement) => {
      try {
        const doc = iframe.contentDocument
        if (!doc) return

        iframe.setAttribute("scrolling", "no")
        iframe.style.overflow = "hidden"

        // Auto-size iframe and wrapper height to content
        const body = doc.body || doc.documentElement
        if (body) {
          const contentHeight = body.scrollHeight
          if (contentHeight > 0) {
            iframe.style.height = `${contentHeight}px`
            const wrapper = iframe.closest(".linkedin-badge-wrapper") as HTMLElement | null
            if (wrapper) {
              wrapper.style.height = `${contentHeight}px`
              wrapper.style.setProperty("min-height", `${contentHeight}px`, "important")
            }
          }
        }

        const head = doc.head || doc.getElementsByTagName("head")[0]
        if (head && !head.querySelector('base[data-linkedin-badge-base="true"]')) {
          const base = doc.createElement("base")
          base.target = "_blank"
          base.setAttribute("data-linkedin-badge-base", "true")
          head.prepend(base)
        }

        const patchLinks = () => {
          doc.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
            link.target = "_blank"
            link.rel = "noopener noreferrer"
          })
        }

        patchLinks()

        if (!iframeObservers.has(iframe)) {
          if (!body) return

          const observer = new MutationObserver(() => {
            patchLinks()
          })
          observer.observe(body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["href"],
          })
          iframeObservers.set(iframe, observer)
        }
      } catch {
        // If LinkedIn ever changes how the iframe is written, fail silently.
      }
    }

    const registerIframe = (iframe: HTMLIFrameElement) => {
      if (iframeLoadHandlers.has(iframe)) return

      const onLoad = () => {
        patchBadgeIframe(iframe)
        globalThis.setTimeout(() => patchBadgeIframe(iframe), 150)
        globalThis.setTimeout(() => patchBadgeIframe(iframe), 600)
      }

      iframe.addEventListener("load", onLoad)
      iframeLoadHandlers.set(iframe, onLoad)
      onLoad()
    }

    const scanBadges = () => {
      const iframes = document.querySelectorAll<HTMLIFrameElement>(".linkedin-badge-wrapper iframe")
      if (iframes.length > 0) {
        setIsLoading(false)
        setShowFallback(false)
      }
      iframes.forEach(registerIframe)
    }

    const observer = new MutationObserver(scanBadges)
    observer.observe(document.body, { childList: true, subtree: true })
    scanBadges()

    const fallbackTimer = globalThis.setTimeout(() => {
      const hasBadgeIframe = document.querySelector(".linkedin-badge-wrapper iframe")
      if (!hasBadgeIframe) {
        setIsLoading(false)
        setShowFallback(true)
      }
    }, 1500)

    return () => {
      observer.disconnect()
      globalThis.clearTimeout(fallbackTimer)
      iframeObservers.forEach((iframeObserver) => iframeObserver.disconnect())
      iframeLoadHandlers.forEach((onLoad, iframe) => iframe.removeEventListener("load", onLoad))
    }
  }, [])

  return { isLoading, showFallback }
}

