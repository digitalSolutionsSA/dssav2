import { Suspense, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { lockScroll, unlockScroll } from '../utils/scrollLock'
import { getHeroStartZoomed, setHeroStartZoomed } from '../utils/heroEntry'
import Spline from '@splinetool/react-spline'
import { useIsMobile } from '../utils/useIsMobile'

const SCALES = [1.0]
const TRANSITION = 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)'

export default function Hero() {
  const isMobile = useIsMobile()
  const startIdx = getHeroStartZoomed() ? SCALES.length - 1 : 0
  const [zoom, setZoom]       = useState(startIdx)
  const [splineReady, setSplineReady] = useState(false)
  const [mountSpline, setMountSpline] = useState(false)
  const zoomRef  = useRef(startIdx)
  const navLock  = useRef(false)

  const updateZoom = (z: number) => { zoomRef.current = z; setZoom(z) }

  useEffect(() => {
    setHeroStartZoomed(false)
    if (zoomRef.current < SCALES.length - 1) lockScroll()
    // Delay Spline mount by one frame so page renders first
    const id = setTimeout(() => setMountSpline(true), 80)
    return () => { unlockScroll(); clearTimeout(id) }
  }, [])

  const goForward = () => {
    if (navLock.current) return
    navLock.current = true
    if (zoomRef.current < SCALES.length - 1) {
      updateZoom(zoomRef.current + 1)
      if (zoomRef.current + 1 >= SCALES.length - 1) unlockScroll()
      setTimeout(() => { navLock.current = false }, 1100)
    } else {
      unlockScroll()
      window.dispatchEvent(new CustomEvent('fp:go', { detail: 1 }))
    }
  }

  useEffect(() => {
    let acc = 0, last = 0
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - last > 400) acc = 0
      last = now
      if (e.deltaY > 0) { acc += e.deltaY; if (acc > 60) { goForward(); acc = 0 } }
      else acc = 0
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goForward()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    let sy = 0
    const onStart = (e: TouchEvent) => { sy = e.touches[0].clientY }
    const onEnd   = (e: TouchEvent) => { if (sy - e.changedTouches[0].clientY > 50) goForward() }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [])

  return (
    <section className="relative w-full h-full bg-white">

      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute"
              style={{ top: '-10%', right: '-20%', width: '80vw', height: '80vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute"
              style={{ bottom: '-15%', left: '-15%', width: '70vw', height: '70vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          </>
        ) : mountSpline ? (
          <div
            className="absolute left-0 right-0 origin-center"
            style={{
              top: 0, bottom: '-60px',
              transform: `scale(${SCALES[zoom]})`,
              transition: TRANSITION,
              // GPU layer isolation — prevents compositing fights with other elements
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* White bg shown until Spline is ready — no flash */}
            <div className="absolute inset-0 bg-white" style={{ opacity: splineReady ? 0 : 1, transition: 'opacity 0.4s' }} />
            <Suspense fallback={null}>
              <Spline
                scene="/scenes/hero-dna.splinecode"
                style={{ width: '100%', height: '100%', opacity: splineReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
                onLoad={() => setSplineReady(true)}
              />
            </Suspense>
          </div>
        ) : (
          <div className="absolute inset-0 bg-white" />
        )}
      </div>

      {/* TOP-RIGHT heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-4 md:right-[4.44%] top-[10%] md:top-[10.9%] text-right leading-none pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.9)) drop-shadow(0 2px 8px rgba(255,255,255,0.6))' }}
      >
        <p className="text-black font-extralight text-[clamp(1.3rem,3.33vw,3rem)] leading-tight">INNOVATION</p>
        <p className="text-black font-semibold  text-[clamp(1.3rem,3.33vw,3rem)] leading-tight">WITHOUT LIMITS.</p>
      </motion.div>

      {/* BOTTOM-LEFT heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-4 md:left-[1.39%] bottom-[14%] md:bottom-[12.7%] leading-none pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.9)) drop-shadow(0 2px 8px rgba(255,255,255,0.6))' }}
      >
        <p className="text-black font-extralight text-[clamp(1.3rem,3.33vw,3rem)] leading-tight">DIGITAL GROWTH</p>
        <p className="text-black font-semibold  text-[clamp(1.3rem,3.33vw,3rem)] leading-tight">WITHOUT COMPROMISE.</p>
      </motion.div>

      {/* CONTACT US */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => { unlockScroll(); window.dispatchEvent(new CustomEvent('fp:go', { detail: 5 })) }}
        className="absolute right-4 md:right-[5.56%] bottom-[6%] md:bottom-[8.5%] bg-black text-white font-bank-gothic-lt text-[11px] md:text-[13px] tracking-[0.2em] uppercase px-5 md:px-8 py-3 md:py-4 hover:bg-white hover:text-black border border-black transition-colors duration-300 z-10"
      >
        CONTACT US
      </motion.button>
    </section>
  )
}
