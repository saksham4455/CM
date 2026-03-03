import { useEffect, useRef, useState } from "react"

// A lightweight glow cursor with a flowing trail
const TRAIL_LENGTH = 8
const LERP = 0.2 // tuned for smoother, slightly faster response

export default function FlowCursor() {
  const [positions, setPositions] = useState(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  )
  const [enabled, setEnabled] = useState(false)
  const target = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    // Disable custom cursor on touch / coarse pointer devices for performance
    const prefersCoarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches

    if (prefersCoarse) {
      document.body.style.cursor = "auto"
      setEnabled(false)
      return
    }

    setEnabled(true)

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const step = () => {
      setPositions((prev) => {
        const next = [...prev]
        next[0] = {
          x: prev[0].x + (target.current.x - prev[0].x) * LERP,
          y: prev[0].y + (target.current.y - prev[0].y) * LERP,
        }
        for (let i = 1; i < TRAIL_LENGTH; i++) {
          next[i] = {
            x: next[i - 1].x + (prev[i].x - next[i - 1].x) * LERP,
            y: next[i - 1].y + (prev[i].y - next[i - 1].y) * LERP,
          }
        }
        return next
      })
      rafId.current = requestAnimationFrame(step)
    }

    rafId.current = requestAnimationFrame(step)
    window.addEventListener("mousemove", handleMove)
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", handleMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      document.body.style.cursor = "auto"
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-screen">
      {positions.map((p, idx) => {
        const opacity = 1 - idx / TRAIL_LENGTH
        const size = 18 - idx * 1.2
        return (
          <div
            key={idx}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: p.x - size / 2,
              top: p.y - size / 2,
              background:
                "radial-gradient(circle at 30% 30%, rgba(0,243,255,0.45), rgba(0,243,255,0.12) 45%, transparent 70%)",
              filter: "blur(6px)",
              opacity,
              willChange: "transform, opacity",
            }}
          />
        )
      })}
    </div>
  )
}
