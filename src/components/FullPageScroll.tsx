import { useState, useEffect, useCallback, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { isScrollLocked } from '../utils/scrollLock'
import { setIntroStart } from '../utils/introEntry'
import { setHeroStartZoomed } from '../utils/heroEntry'

const INTRO_PAGE = 1   // index of IntroScrollSection in the pages array

interface Props {
  pages: ReactNode[]
  onPageChange?: (index: number) => void
}

export default function FullPageScroll({ pages, onPageChange }: Props) {
  const [current, setCurrent] = useState(0)
  const [locked, setLocked] = useState(false)
  const total = pages.length

  const goTo = useCallback((idx: number) => {
    if (locked || idx < 0 || idx >= total) return
    // Tell intro section which heading to start on based on direction
    if (idx === INTRO_PAGE) setIntroStart(current > INTRO_PAGE ? 4 : 0)
    // When returning to hero from below, tell it to start fully zoomed out
    if (idx === 0) setHeroStartZoomed(current > 0)
    setLocked(true)
    setCurrent(idx)
    onPageChange?.(idx)
    setTimeout(() => setLocked(false), 750)
  }, [locked, total, current, onPageChange])

  // Wheel
  useEffect(() => {
    let acc = 0
    let last = 0

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      // Reset accumulator after 300ms pause
      if (now - last > 300) acc = 0
      last = now
      acc += e.deltaY

      if (Math.abs(acc) > 60) {
        if (!isScrollLocked()) goTo(current + (acc > 0 ? 1 : -1))
        acc = 0
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [current, goTo])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isScrollLocked()) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(current + 1)
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo])

  // Touch — must check isScrollLocked() so intro page can handle its own swipes
  useEffect(() => {
    let startY = 0
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onEnd   = (e: TouchEvent) => {
      if (isScrollLocked()) return
      const diff = startY - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1))
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [current, goTo])

  // Custom event navigation (from buttons)
  useEffect(() => {
    const handler = (e: Event) => goTo((e as CustomEvent<number>).detail)
    window.addEventListener('fp:go', handler)
    return () => window.removeEventListener('fp:go', handler)
  }, [goTo])

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {pages[current]}
        </motion.div>
      </AnimatePresence>

      {/* Page dots — right edge (hidden on mobile) */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 flex-col gap-2 z-40">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-400 focus:outline-none"
            style={{
              width: 4,
              height: i === current ? 20 : 4,
              background: current > 4 && current < 9
                ? `rgba(255,255,255,${i === current ? 1 : 0.3})`
                : `rgba(0,0,0,${i === current ? 0.7 : 0.2})`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
