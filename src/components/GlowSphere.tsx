import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface GlowSphereProps {
  color?: string      // CSS color for the glow blob (e.g. '#ff9a3c')
  glowOpacity?: number
}

interface Point3D { x: number; y: number; z: number }

export default function GlowSphere({ color = '#ff9a3c', glowOpacity = 0.55 }: GlowSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let rotY = 0
    const rotX = 0.25

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const project = (p: Point3D, w: number, h: number) => {
      const fov = 900
      const z = p.z + 900
      return {
        x: (p.x * fov) / z + w / 2,
        y: (p.y * fov) / z + h / 2,
        scale: fov / z,
      }
    }

    const rotate = (p: Point3D, ry: number, rx: number): Point3D => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const x1 = p.x * cosY - p.z * sinY
      const z1 = p.x * sinY + p.z * cosY
      const cosX = Math.cos(rx), sinX = Math.sin(rx)
      const y2 = p.y * cosX - z1 * sinX
      const z2 = p.y * sinX + z1 * cosX
      return { x: x1, y: y2, z: z2 }
    }

    const LATITUDE_LINES = 12
    const LONGITUDE_LINES = 16
    const POINTS_PER_LINE = 80

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      const RADIUS = Math.min(w, h) * 0.38

      ctx.clearRect(0, 0, w, h)
      rotY += 0.0018

      const drawLine = (points: { x: number; y: number; opacity: number }[]) => {
        for (let i = 0; i < points.length - 1; i++) {
          const opacity = Math.max(0, points[i].opacity)
          ctx.beginPath()
          ctx.moveTo(points[i].x, points[i].y)
          ctx.lineTo(points[i + 1].x, points[i + 1].y)
          ctx.strokeStyle = `rgba(0,0,0,${opacity * 0.18})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }

      // Latitude lines
      for (let i = 1; i < LATITUDE_LINES; i++) {
        const lat = (i / LATITUDE_LINES) * Math.PI - Math.PI / 2
        const r = Math.cos(lat) * RADIUS
        const y0 = Math.sin(lat) * RADIUS
        const pts = []
        for (let j = 0; j <= POINTS_PER_LINE; j++) {
          const lon = (j / POINTS_PER_LINE) * Math.PI * 2
          const raw: Point3D = { x: Math.cos(lon) * r, y: y0, z: Math.sin(lon) * r }
          const rotated = rotate(raw, rotY, rotX)
          const proj = project(rotated, w, h)
          const opacity = (rotated.z + RADIUS) / (2 * RADIUS)
          pts.push({ x: proj.x, y: proj.y, opacity })
        }
        drawLine(pts)
      }

      // Longitude lines
      for (let i = 0; i < LONGITUDE_LINES; i++) {
        const lon = (i / LONGITUDE_LINES) * Math.PI * 2
        const pts = []
        for (let j = 0; j <= POINTS_PER_LINE; j++) {
          const lat = (j / POINTS_PER_LINE) * Math.PI - Math.PI / 2
          const raw: Point3D = {
            x: Math.cos(lat) * Math.cos(lon) * RADIUS,
            y: Math.sin(lat) * RADIUS,
            z: Math.cos(lat) * Math.sin(lon) * RADIUS,
          }
          const rotated = rotate(raw, rotY, rotX)
          const proj = project(rotated, w, h)
          const opacity = (rotated.z + RADIUS) / (2 * RADIUS)
          pts.push({ x: proj.x, y: proj.y, opacity })
        }
        drawLine(pts)
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const glowStyle = `radial-gradient(ellipse at center, ${color}cc 0%, ${color}88 30%, ${color}33 60%, transparent 78%)`

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Glow blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: glowOpacity, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          width: '75vw',
          height: '75vw',
          borderRadius: '50%',
          background: glowStyle,
          filter: 'blur(40px)',
        }}
      />
      {/* Wireframe on top */}
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  )
}
