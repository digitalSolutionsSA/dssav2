import { useEffect, useRef } from 'react'

interface Point3D { x: number; y: number; z: number }

export default function WireframeSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let rotY = 0
    let rotX = 0.3

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const project = (p: Point3D, w: number, h: number) => {
      const fov = 500
      const z = p.z + 400
      return {
        x: (p.x * fov) / z + w / 2,
        y: (p.y * fov) / z + h / 2,
        scale: fov / z,
      }
    }

    const rotate = (p: Point3D, ry: number, rx: number): Point3D => {
      // Rotate Y
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const x1 = p.x * cosY - p.z * sinY
      const z1 = p.x * sinY + p.z * cosY
      // Rotate X
      const cosX = Math.cos(rx), sinX = Math.sin(rx)
      const y2 = p.y * cosX - z1 * sinX
      const z2 = p.y * sinX + z1 * cosX
      return { x: x1, y: y2, z: z2 }
    }

    const RADIUS = Math.min(200, 160)
    const LATITUDE_LINES = 14
    const LONGITUDE_LINES = 18
    const POINTS_PER_LINE = 60

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      rotY += 0.003

      const alpha = 0.55

      // Draw latitude lines
      for (let i = 1; i < LATITUDE_LINES; i++) {
        const lat = (i / LATITUDE_LINES) * Math.PI - Math.PI / 2
        const r = Math.cos(lat) * RADIUS
        const y0 = Math.sin(lat) * RADIUS

        ctx.beginPath()
        let first = true
        for (let j = 0; j <= POINTS_PER_LINE; j++) {
          const lon = (j / POINTS_PER_LINE) * Math.PI * 2
          const raw: Point3D = {
            x: Math.cos(lon) * r,
            y: y0,
            z: Math.sin(lon) * r,
          }
          const rotated = rotate(raw, rotY, rotX)
          const proj = project(rotated, w, h)
          const opacity = (rotated.z + RADIUS) / (2 * RADIUS)
          ctx.strokeStyle = `rgba(255,255,255,${alpha * (0.2 + opacity * 0.8)})`
          if (first) { ctx.moveTo(proj.x, proj.y); first = false }
          else ctx.lineTo(proj.x, proj.y)
        }
        ctx.lineWidth = 0.4
        ctx.stroke()
      }

      // Draw longitude lines
      for (let i = 0; i < LONGITUDE_LINES; i++) {
        const lon = (i / LONGITUDE_LINES) * Math.PI * 2

        ctx.beginPath()
        let first = true
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
          ctx.strokeStyle = `rgba(255,255,255,${alpha * (0.2 + opacity * 0.8)})`
          if (first) { ctx.moveTo(proj.x, proj.y); first = false }
          else ctx.lineTo(proj.x, proj.y)
        }
        ctx.lineWidth = 0.4
        ctx.stroke()
      }

      // Draw dots at intersections
      for (let i = 0; i < LATITUDE_LINES; i++) {
        for (let j = 0; j < LONGITUDE_LINES; j++) {
          const lat = (i / LATITUDE_LINES) * Math.PI - Math.PI / 2
          const lon = (j / LONGITUDE_LINES) * Math.PI * 2
          const raw: Point3D = {
            x: Math.cos(lat) * Math.cos(lon) * RADIUS,
            y: Math.sin(lat) * RADIUS,
            z: Math.cos(lat) * Math.sin(lon) * RADIUS,
          }
          const rotated = rotate(raw, rotY, rotX)
          const proj = project(rotated, w, h)
          const opacity = (rotated.z + RADIUS) / (2 * RADIUS)
          ctx.beginPath()
          ctx.arc(proj.x, proj.y, proj.scale * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`
          ctx.fill()
        }
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

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  )
}
