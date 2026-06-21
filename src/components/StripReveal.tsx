import { motion } from 'framer-motion'

const strips = [
  { heightPct: 52, bg: 'linear-gradient(180deg, #0a0a0a 0%, #111827 100%)',  accent: 'rgba(79,142,247,0.18)',  delay: 0.55 },
  { heightPct: 68, bg: 'linear-gradient(180deg, #0d0d14 0%, #1e1040 100%)',  accent: 'rgba(192,132,252,0.18)', delay: 0.43 },
  { heightPct: 82, bg: 'linear-gradient(180deg, #0a1010 0%, #064e3b 100%)',  accent: 'rgba(52,211,153,0.20)', delay: 0.31 },
  { heightPct: 100, bg: 'linear-gradient(180deg, #080808 0%, #1a1a1a 100%)', accent: 'rgba(255,255,255,0.06)', delay: 0.18 },
  { heightPct: 82, bg: 'linear-gradient(180deg, #0a0808 0%, #3b0a0a 100%)',  accent: 'rgba(251,113,133,0.18)', delay: 0.31 },
  { heightPct: 68, bg: 'linear-gradient(180deg, #0d0a08 0%, #451a03 100%)',  accent: 'rgba(251,191,36,0.18)',  delay: 0.43 },
  { heightPct: 52, bg: 'linear-gradient(180deg, #080a0d 0%, #0c1445 100%)',  accent: 'rgba(99,179,237,0.16)',  delay: 0.55 },
]

export default function StripReveal() {
  return (
    <div className="w-full flex items-end justify-center gap-[0.9%]" style={{ height: '100%' }}>
      {strips.map((s, i) => (
        <div
          key={i}
          className="relative flex-1 overflow-hidden"
          style={{ height: `${s.heightPct}%` }}
        >
          {/* Strip body — slides up from below */}
          <motion.div
            className="absolute inset-0 rounded-[14px] overflow-hidden"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Base gradient */}
            <div className="absolute inset-0" style={{ background: s.bg }} />

            {/* Accent glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 80%, ${s.accent} 0%, transparent 70%)`,
              }}
            />

            {/* Subtle grid lines */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '100% 28px',
              }}
            />

            {/* Shimmer line that sweeps down on entry */}
            <motion.div
              className="absolute left-0 right-0 pointer-events-none"
              style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
              initial={{ top: '-2px' }}
              animate={{ top: '110%' }}
              transition={{ duration: 1.1, delay: s.delay + 0.1, ease: 'easeInOut' }}
            />

            {/* Bottom border accent */}
            <div
              className="absolute bottom-0 left-[20%] right-[20%] h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${s.accent.replace(/[\d.]+\)$/, '0.7)')}, transparent)` }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  )
}
