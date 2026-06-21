import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const mouse = { x: -9999, y: -9999 }
    const particles: Particle[] = []
    const COUNT = 900

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      particles.length = 0
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      // Radius scales with viewport — roughly 38% of the shorter dimension
      const maxR = Math.min(canvas.width, canvas.height) * 0.38

      for (let i = 0; i < COUNT; i++) {
        // Gaussian-ish distribution: cluster more points near centre
        const t = Math.random()
        const radius = maxR * Math.sqrt(t) // sqrt gives more density near centre
        const angle = Math.random() * Math.PI * 2
        // Slightly squash vertically to match the design's oval cloud
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius * 0.85
        particles.push({
          x, y, baseX: x, baseY: y,
          vx: 0, vy: 0,
          size: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.55 + 0.1,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelR = 90

        if (dist < repelR && dist > 0) {
          const force = (repelR - dist) / repelR
          p.vx -= (dx / dist) * force * 5
          p.vy -= (dy / dist) * force * 5
        }

        // Spring back
        p.vx += (p.baseX - p.x) * 0.045
        p.vy += (p.baseY - p.y) * 0.045
        p.vx *= 0.86
        p.vy *= 0.86
        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,0,0,${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ cursor: 'none' }} />
}
