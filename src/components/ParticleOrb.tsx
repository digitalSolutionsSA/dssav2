import { useEffect, useRef } from 'react'

interface Dot {
  x: number; y: number; z: number
  px: number; py: number
  size: number; opacity: number
}

export default function ParticleOrb({ size = 220 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const DOTS = 420
    const R = size * 0.42
    const cx = size / 2
    const cy = size / 2
    const dots: Dot[] = []

    // Golden-ratio sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = phi * i
      dots.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        px: 0, py: 0, size: 0, opacity: 0,
      })
    }

    let angle = 0
    let rafId = 0

    const draw = () => {
      rafId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, size, size)
      angle += 0.003

      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      for (const d of dots) {
        // Rotate around Y axis
        const rx = d.x * cos - d.z * sin
        const rz = d.x * sin + d.z * cos

        // Project to 2D with slight perspective
        const perspective = 1.4 / (1.4 - rz * 0.4)
        d.px = cx + rx * R * perspective
        d.py = cy + d.y * R * perspective

        // Depth-based opacity and size
        const depth = (rz + 1) / 2          // 0 = back, 1 = front
        d.opacity = 0.08 + depth * 0.55
        d.size    = (0.6 + depth * 1.2) * perspective
      }

      // Sort back-to-front so front dots render on top
      dots.sort((a, b) => a.px - b.px)

      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.px, d.py, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,0,0,${d.opacity.toFixed(2)})`
        ctx.fill()
      }
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="pointer-events-none select-none"
    />
  )
}
