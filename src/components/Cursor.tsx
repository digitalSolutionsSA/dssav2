import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0, id: number

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', move)

    const tick = () => {
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      id = requestAnimationFrame(tick)
    }
    tick()

    // Update cursor colour based on current page background
    const checkDark = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      const isDark = !!el?.closest('[data-dark]')
      dot.classList.toggle('white', isDark)
      ring.classList.toggle('white', isDark)
    }

    // Check on page changes via fp:go event
    window.addEventListener('fp:go', checkDark)
    // Also update on mouse move (covers initial state)
    document.addEventListener('mousemove', checkDark)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousemove', checkDark)
      window.removeEventListener('fp:go', checkDark)
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-follower" />
    </>
  )
}
