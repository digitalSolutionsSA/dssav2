import { motion } from 'framer-motion'
import { navigateTo } from '../utils/navigate'

const socials = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative w-full h-full bg-black flex flex-col overflow-hidden" data-dark>
      <div className="h-[56px] flex-shrink-0" />

      {/* ── Heading ── */}
      <div className="px-4 md:px-[4.44%] pt-4 md:pt-[3%]">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="leading-[1.0] font-semibold uppercase"
          style={{ fontSize: 'clamp(1.8rem, 4.44vw, 4.2rem)' }}
        >
          <span className="text-white">READY TO TURN </span>
          <span className="text-white/40">CLICKS INTO</span>
          <br />
          <span className="text-white/40">CUSTOMERS?</span>
        </motion.p>
      </div>

      {/* ── Email + Nav ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="px-4 md:px-[4.44%] mt-[3.5%] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <a
          href="mailto:info@digitalsolutionssa.co.za"
          className="flex items-center gap-3 group"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
            <path d="M2 7l10 7 10-7" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span className="font-bank-gothic-lt text-white group-hover:text-white/50 transition-colors tracking-[0.08em] uppercase"
            style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1.1rem)' }}>
            INFO@DIGITALSOLUTIONSSA.CO.ZA
          </span>
        </a>

        <div className="flex items-center gap-8">
          {[{ l: 'ABOUT', id: 'about' }, { l: 'SERVICES', id: 'why' }, { l: 'CONTACT', id: 'contact' }].map(({ l, id }) => (
            <button key={id} onClick={() => navigateTo(id)}
              className="font-bank-gothic-lt text-white/60 hover:text-white transition-colors tracking-[0.12em] uppercase"
              style={{ fontSize: 'clamp(0.65rem, 1vw, 0.95rem)' }}>
              {l}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-[4.44%] mt-[3%] h-px bg-white/15 origin-left flex-shrink-0"
      />

      {/* ── Logo + socials ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="px-4 md:px-[4.44%] flex items-center justify-between flex-1 min-h-0"
        style={{ minHeight: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center flex-1">
          <img
            src="/footer-logo.png"
            alt="Digital Solutions SA"
            className="object-contain object-left"
            style={{ width: 'min(320px, 55vw)', height: 'auto' }}
          />
        </div>

        {/* Social icons — stacked vertically on the right */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-white/70 hover:text-white transition-all duration-300"
            >
              {icon}
            </a>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex-shrink-0"
      >
        <div className="mx-[4.44%] h-px bg-white/10" />
        <div className="px-4 md:px-[4.44%] py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3">
          <span className="font-bank-gothic-lt text-white/35 tracking-[0.1em] uppercase"
            style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.78rem)' }}>
            © 2026 DIGITAL SOLUTIONS SA. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-6">
            {['PRIVACY POLICY', 'TERMS & CONDITIONS'].map(t => (
              <span key={t}
                className="font-bank-gothic-lt text-white/35 tracking-[0.1em] uppercase cursor-pointer hover:text-white/70 transition-colors"
                style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.78rem)' }}>
                {t}
              </span>
            ))}
            <button
              onClick={() => navigateTo('hero')}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors tracking-[0.12em] uppercase"
              style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.78rem)' }}
            >
              BACK TO TOP
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 16V8M8 12l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
