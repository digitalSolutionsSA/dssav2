import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const DURATION = 3400 // ms minimum

const SPLINE_URLS = [
  '/scenes/hero-dna.splinecode',
  '/scenes/intro-hands.splinecode',
]

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'load' | 'exit'>('load')
  const rafRef = useRef(0)

  useEffect(() => {
    // Pre-warm Spline JS bundle
    import('@splinetool/react-spline').catch(() => {})
    // Pre-fetch all scene files so they're cached
    SPLINE_URLS.forEach(url =>
      fetch(url, { mode: 'no-cors' }).catch(() => {})
    )

    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION * 100, 100)
      setProgress(Math.floor(p))
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setPhase('exit')
          setTimeout(onComplete, 900)
        }, 300)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      animate={phase === 'exit' ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      {/* ── Dot grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Scanning line ── */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Corner brackets ── */}
      {[
        { top: 20, left: 20, rotate: 0 },
        { top: 20, right: 20, rotate: 90 },
        { bottom: 20, right: 20, rotate: 180 },
        { bottom: 20, left: 20, rotate: 270 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ ...pos, width: 28, height: 28 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
            <path d="M2 14V2H14" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* ── Top label ── */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-white/60"
        />
        <span className="font-bank-gothic-lt text-white/40 text-[11px] tracking-[0.35em] uppercase">
          Initializing System
        </span>
      </motion.div>

      {/* ── Main logo ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">

        {/* DIGITAL SOLUTIONS with staggered letter reveal */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
          >
            {'DIGITAL SOLUTIONS'.split('').map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: '110%', opacity: 0 },
                  show: { y: '0%', opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="font-bank-gothic text-white leading-none"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', letterSpacing: '0.08em', display: 'inline-block', whiteSpace: 'pre' }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* SA — large offset */}
        <div className="overflow-hidden self-end pr-[12%]">
          <motion.p
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 0.15 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-bank-gothic text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '0.04em', marginTop: '-0.15em' }}
          >
            SA
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="font-bank-gothic-lt text-white/30 tracking-[0.3em] uppercase mt-4"
          style={{ fontSize: 'clamp(0.55rem, 1vw, 0.8rem)' }}
        >
          Innovation Without Limits
        </motion.p>
      </div>

      {/* ── Progress section ── */}
      <div className="absolute bottom-10 left-8 right-8">
        {/* Progress bar track */}
        <div className="w-full h-px bg-white/10 mb-4 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white/70"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          {/* Glow on progress head */}
          <motion.div
            className="absolute top-0 h-full pointer-events-none"
            style={{
              width: 40,
              left: `calc(${progress}% - 40px)`,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5))',
            }}
          />
        </div>

        {/* Counter row */}
        <div className="flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-bank-gothic-lt text-white/25 text-[11px] tracking-[0.2em] uppercase"
          >
            Loading assets
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-bank-gothic text-white/60 tabular-nums"
            style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)', letterSpacing: '0.05em' }}
          >
            {String(progress).padStart(3, '0')}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
