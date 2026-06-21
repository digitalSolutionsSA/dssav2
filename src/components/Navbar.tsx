import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  dark?: boolean
  onNavigate?: (id: string) => void
}

export default function Navbar({ dark = false, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false)

  const scroll = (id: string) => {
    setOpen(false)
    onNavigate?.(id)
  }

  const c = dark ? 'text-white' : 'text-[#010101]'
  const bg = 'bg-transparent'
  const bar = dark ? 'bg-white' : 'bg-[#010101]'

  return (
    <>
      {/* ─── Fixed nav bar ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center px-5`} style={{ background: 'transparent' }}>
        {/* Logo */}
        <button onClick={() => scroll('hero')} className="relative flex items-center">
          {/* Big faded SA behind */}
          <span
            className={`font-bank-gothic absolute text-[52px] leading-none ${dark ? 'text-white/40' : 'text-black/40'} select-none pointer-events-none`}
            style={{ top: '-14px', left: '62px' }}
          >
            SA
          </span>
          {/* DIGITAL SOLUTIONS text */}
          <span className={`font-bank-gothic-lt text-[17px] tracking-[0.12em] uppercase relative z-10 ${c}`}>
            DIGITAL&nbsp;&nbsp;SOLUTIONS
          </span>
        </button>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={() => scroll('contact')}
            className={`font-bank-gothic-lt text-[13px] tracking-[0.2em] uppercase ${c} hover:opacity-50 transition-opacity`}
          >
            CONTACT US
          </button>
          <span className={`${dark ? 'text-white/30' : 'text-black/30'} text-sm`}>|</span>
          {/* Hamburger — 2 lines as per Figma */}
          <button onClick={() => setOpen(!open)} className="flex flex-col gap-[5px]" aria-label="Menu">
            <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className={`block h-px w-[22px] ${bar}`} />
            <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className={`block h-px w-[22px] ${bar}`} />
          </button>
        </div>
      </nav>

      {/* ─── Full-screen menu overlay ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-2"
          >
            {[
              { label: 'HOME', id: 'hero' },
              { label: 'ABOUT US', id: 'about' },
              { label: 'WHY US', id: 'why' },
              { label: 'OUR WORK', id: 'work' },
              { label: 'CONTACT', id: 'contact' },
            ].map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: i * 0.06 + 0.1 }}
                onClick={() => scroll(item.id)}
                className="font-bank-gothic text-white text-5xl md:text-7xl uppercase tracking-wider py-2 hover:opacity-40 transition-opacity"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
