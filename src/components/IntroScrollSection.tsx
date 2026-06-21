import { useState, useEffect, useRef, Suspense, lazy, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lockScroll, unlockScroll } from '../utils/scrollLock'
import { getIntroStart } from '../utils/introEntry'
import { useIsMobile } from '../utils/useIsMobile'

const Spline = lazy(() => import('@splinetool/react-spline'))

const HandsScene = memo(() => {
  const [ready, setReady] = useState(false)
  return (
    <Suspense fallback={null}>
      <Spline
        scene="/scenes/intro-hands.splinecode"
        style={{ width: '100%', height: '100%', opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
        onLoad={() => setReady(true)}
      />
    </Suspense>
  )
})

const sections = [
  { light: 'INNOVATION',     bold: 'WITHOUT LIMITS.',        sub: 'Websites. Apps. AI. Marketing.' },
  { light: 'EVERY BUSINESS', bold: 'DESERVES TO GROW.',      sub: 'We create digital systems that attract, convert and scale.' },
  { light: 'FROM IDEAS',     bold: 'TO REALITY.',            sub: 'Custom websites, apps and AI solutions built for the future.' },
  { light: 'MORE THAN',      bold: 'A PROJECT.',             sub: 'A complete digital ecosystem for your business.' },
  { light: 'BUILT TO',       bold: 'STAND OUT.',             sub: 'Design that captures attention. Technology that delivers results.' },
]

const EX_DUR = 400  // ms between section changes (nav lock)
const PREV_PAGE = 0
const NEXT_PAGE = 2

// Swipe-up reveal: text slides up from behind a clip mask
const lineVariants = {
  enter: { y: '105%' },
  show:  { y: '0%', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  exit:  { y: '-105%', transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
}

const fadeVariants = {
  enter: { opacity: 0, y: 12 },
  show:  { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
  exit:  { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

export default function IntroScrollSection() {
  const isMobile = useIsMobile()
  const [active, setActive]     = useState(0)
  const [_dir, setDir]          = useState<1 | -1>(1)
  const [mountHands, setMountHands] = useState(false)
  const navLocked               = useRef(false)

  useEffect(() => {
    const startIdx = getIntroStart()
    lockScroll()
    if (startIdx !== 0) setActive(startIdx)
    // Delay Spline hands mount so text animation renders first
    const id = setTimeout(() => setMountHands(true), 400)
    return () => { unlockScroll(); clearTimeout(id) }
  }, [])

  const navigate = (d: 1 | -1) => {
    if (navLocked.current) return
    const next = active + d
    if (next >= 0 && next < sections.length) {
      navLocked.current = true
      setDir(d)
      setActive(next)
      setTimeout(() => { navLocked.current = false }, EX_DUR + 300)
    } else {
      unlockScroll()
      window.dispatchEvent(new CustomEvent('fp:go', { detail: d > 0 ? NEXT_PAGE : PREV_PAGE }))
    }
  }

  useEffect(() => {
    let acc = 0, last = 0
    const onW = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - last > 300) acc = 0
      last = now; acc += e.deltaY
      if (Math.abs(acc) > 60) { navigate(acc > 0 ? 1 : -1); acc = 0 }
    }
    const onK = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') navigate(1)
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   navigate(-1)
    }
    let sy = 0
    const onTS = (e: TouchEvent) => { sy = e.touches[0].clientY }
    const onTE = (e: TouchEvent) => {
      const d = sy - e.changedTouches[0].clientY
      if (Math.abs(d) > 50) navigate(d > 0 ? 1 : -1)
    }
    window.addEventListener('wheel',      onW,  { passive: false })
    window.addEventListener('keydown',    onK)
    window.addEventListener('touchstart', onTS, { passive: true })
    window.addEventListener('touchend',   onTE, { passive: true })
    return () => {
      window.removeEventListener('wheel',      onW)
      window.removeEventListener('keydown',    onK)
      window.removeEventListener('touchstart', onTS)
      window.removeEventListener('touchend',   onTE)
    }
  }, [active])

  const s = sections[active]

  return (
    <section className="w-full h-full bg-black overflow-hidden flex flex-col relative" data-dark>

      {/* ── Right side visual ── */}
      {isMobile ? (
        /* Mobile: animated gradient orbs */
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-10%', right: '-20%', width: '80vw', height: '80vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{ position: 'absolute', bottom: '10%', right: '5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }}
          />
        </div>
      ) : (
        /* Desktop: Spline hands scene — mounted after text animates in */
        <div className="spline-dark absolute right-0 top-0 w-[50%] h-full pointer-events-none select-none overflow-hidden" style={{ zIndex: 0, background: '#000', willChange: 'transform', backfaceVisibility: 'hidden' }}>
          {mountHands && (
            <div style={{ width: '142%', height: '142%', transform: 'scale(0.7)', transformOrigin: 'center center', marginLeft: '-21%', marginTop: '-21%' }}>
              <HandsScene />
            </div>
          )}
        </div>
      )}

      <div className="h-[56px] flex-shrink-0" />

      {/* ── Main content — vertically centred ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-[6%] max-w-full md:max-w-[58%]">

        {/* Section counter */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`counter-${active}`}
            variants={fadeVariants}
            initial="enter" animate="show" exit="exit"
            className="font-bank-gothic-lt text-white/25 text-[11px] tracking-[0.35em] uppercase mb-8"
          >
            {String(active + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
          </motion.p>
        </AnimatePresence>

        {/* Heading lines — swipe reveal */}
        <AnimatePresence mode="wait">
          <div key={`heading-${active}`}>
            {/* Light line */}
            <div className="overflow-hidden">
              <motion.p
                variants={lineVariants}
                initial="enter" animate="show" exit="exit"
                className="text-white uppercase leading-[1.0]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: 'clamp(2rem, 5.5vw, 6.5rem)' }}
              >
                {s.light}
              </motion.p>
            </div>
            {/* Bold line — slight delay */}
            <div className="overflow-hidden">
              <motion.p
                variants={lineVariants}
                initial="enter"
                animate={{ y: '0%', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.07 } }}
                exit="exit"
                className="text-white uppercase leading-[1.0]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5.5vw, 6.5rem)' }}
              >
                {s.bold}
              </motion.p>
            </div>
          </div>
        </AnimatePresence>

        {/* Divider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`div-${active}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="w-16 h-px bg-white/30 origin-left mt-6 mb-5"
          />
        </AnimatePresence>

        {/* Subheading */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${active}`}
            variants={fadeVariants}
            initial="enter" animate="show" exit="exit"
            className="text-white/50 font-extralight leading-relaxed mb-10"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)', maxWidth: '52ch' }}
          >
            {s.sub}
          </motion.p>
        </AnimatePresence>

        {/* CTA button */}
        <AnimatePresence mode="wait">
          <motion.button
            key={`btn-${active}`}
            variants={fadeVariants}
            initial="enter" animate="show" exit="exit"
            onClick={() => window.dispatchEvent(new CustomEvent('fp:go', { detail: 5 }))}
            className="self-start bg-white text-black font-bank-gothic-lt text-[13px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-transparent hover:text-white border border-white transition-colors duration-300"
          >
            CONTACT US
          </motion.button>
        </AnimatePresence>
      </div>

      {/* ── Progress dots — bottom left ── */}
      <div className="relative z-10 flex items-center gap-2 px-[6%] pb-8 flex-shrink-0">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (i !== active) { setDir(i > active ? 1 : -1); setActive(i) } }}
            className="transition-all duration-300"
            style={{
              width: i === active ? 24 : 6,
              height: 2,
              background: i === active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}
