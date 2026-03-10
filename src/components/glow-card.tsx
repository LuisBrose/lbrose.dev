"use client"

import { useRef, useEffect, useCallback, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: ReactNode
  className?: string
}

const PROXIMITY_PX = 120
const ANGLE_LERP = 0.1
const OPACITY_LERP = 0.08

function distToRect(x: number, y: number, r: DOMRect) {
  const dx = Math.max(r.left - x, 0, x - r.right)
  const dy = Math.max(r.top - y, 0, y - r.bottom)
  return Math.sqrt(dx * dx + dy * dy)
}

function lerpAngle(cur: number, tgt: number, t: number) {
  let diff = tgt - cur
  if (diff > 180) diff -= 360
  if (diff < -180) diff += 360
  return cur + diff * t
}

export function GlowCard({ children, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const s = useRef({
    angle: 0,
    targetAngle: 0,
    opacity: 0,
    targetOpacity: 0,
    raf: 0,
    running: false,
  })

  const tick = useCallback(() => {
    const el = ref.current
    const st = s.current
    if (!el) return

    st.angle = lerpAngle(st.angle, st.targetAngle, ANGLE_LERP)
    st.angle = ((st.angle % 360) + 360) % 360
    st.opacity += (st.targetOpacity - st.opacity) * OPACITY_LERP

    el.style.setProperty("--glow-start", st.angle.toFixed(1))
    el.style.setProperty("--glow-opacity", st.opacity.toFixed(3))

    if (st.opacity > 0.003 || st.targetOpacity > 0) {
      st.raf = requestAnimationFrame(tick)
    } else {
      st.running = false
      st.opacity = 0
      el.style.setProperty("--glow-opacity", "0")
    }
  }, [])

  const ensureRunning = useCallback(() => {
    if (!s.current.running) {
      s.current.running = true
      s.current.raf = requestAnimationFrame(tick)
    }
  }, [tick])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handlePointer = (px: number, py: number) => {
      const rect = el.getBoundingClientRect()
      const dist = distToRect(px, py, rect)

      if (dist < PROXIMITY_PX) {
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        let angle = Math.atan2(py - cy, px - cx) * (180 / Math.PI)
        angle = ((angle + 360) % 360) + 60

        s.current.targetAngle = angle
        s.current.targetOpacity = dist === 0 ? 1 : 1 - dist / PROXIMITY_PX
        ensureRunning()
      } else if (s.current.targetOpacity > 0) {
        s.current.targetOpacity = 0
        ensureRunning()
      }
    }

    const fadeOut = () => {
      if (s.current.targetOpacity > 0) {
        s.current.targetOpacity = 0
        ensureRunning()
      }
    }

    const onMouse = (e: MouseEvent) => handlePointer(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) handlePointer(t.clientX, t.clientY)
    }

    document.addEventListener("mousemove", onMouse, { passive: true })
    document.addEventListener("touchstart", onTouch, { passive: true })
    document.addEventListener("touchmove", onTouch, { passive: true })
    document.addEventListener("touchend", fadeOut, { passive: true })
    return () => {
      document.removeEventListener("mousemove", onMouse)
      document.removeEventListener("touchstart", onTouch)
      document.removeEventListener("touchmove", onTouch)
      document.removeEventListener("touchend", fadeOut)
      cancelAnimationFrame(s.current.raf)
    }
  }, [ensureRunning])

  return (
    <div ref={ref} className={cn("card-glow", className)}>
      {children}
    </div>
  )
}
