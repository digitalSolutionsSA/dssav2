import { motion } from 'framer-motion'
import { navigateTo } from '../utils/navigate'
import StripReveal from './StripReveal'

const projects = [
  {
    num: '01',
    title: 'BRAND IDENTITY',
    tag: 'Branding',
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 60%, #0f3460 100%)',
    accent: '#4f8ef7',
  },
  {
    num: '02',
    title: 'E-COMMERCE PLATFORM',
    tag: 'Web Development',
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 60%, #6b21a8 100%)',
    accent: '#c084fc',
  },
  {
    num: '03',
    title: 'AI DASHBOARD',
    tag: 'AI Solutions',
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #0a1628 60%, #0e4d4d 100%)',
    accent: '#01e8ff',
  },
  {
    num: '04',
    title: 'DIGITAL CAMPAIGN',
    tag: 'Marketing',
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #2d0a0a 60%, #7f1d1d 100%)',
    accent: '#fb7185',
  },
  {
    num: '05',
    title: 'MOBILE APPLICATION',
    tag: 'Development',
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #0a2d1a 60%, #064e3b 100%)',
    accent: '#34d399',
  },
  {
    num: '06',
    title: 'WEB EXPERIENCE',
    tag: 'Web Development',
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #1a1200 60%, #78350f 100%)',
    accent: '#fbbf24',
  },
]

const cardVariants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  visible: (i: number) => ({
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: {
      clipPath: { duration: 0.75, delay: i * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] },
      opacity:   { duration: 0.01, delay: i * 0.1 + 0.2 },
    },
  }),
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { duration: 0.6, delay: i * 0.1 + 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Work() {
  return (
    <section className="relative w-full h-full bg-black flex flex-col overflow-hidden" data-dark>
      <div className="h-[56px] flex-shrink-0" />

      {/* Heading */}
      <div className="overflow-hidden px-[4.44%] mt-[3%] mb-[2%]">
        <motion.p
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-right text-[clamp(1.5rem,3.33vw,3rem)] leading-none"
        >
          <span className="text-white font-extralight">OUR </span>
          <span className="text-white font-semibold">CREATIONS</span>
        </motion.p>
      </div>

      {/* Strip reveal — hidden on mobile */}
      <div className="hidden md:block px-[4.1%] mb-[1.2%] flex-shrink-0" style={{ height: '28vh' }}>
        <StripReveal />
      </div>

      {/* Grid */}
      <div className="px-[4.1%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-[1.2%] flex-1 pb-0 min-h-0 overflow-y-auto md:overflow-hidden">
        {projects.map((p, i) => (
          <motion.div
            key={p.num}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative group cursor-pointer overflow-hidden rounded-[16px]"
            style={{ background: p.bg }}
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Glowing accent dot */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 30% 40%, ${p.accent}33 0%, transparent 65%)`,
              }}
            />

            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {/* Top row: number + tag */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 z-10">
              <span
                className="text-white/30 font-extralight leading-none"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.55rem, 0.8vw, 0.75rem)', letterSpacing: '0.15em' }}
              >
                {p.num}
              </span>
              <span
                className="text-white/0 group-hover:text-white/50 transition-colors duration-400 uppercase leading-none"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 'clamp(0.45rem, 0.65vw, 0.6rem)', letterSpacing: '0.2em' }}
              >
                {p.tag}
              </span>
            </div>

            {/* Accent line — reveals on hover */}
            <motion.div
              custom={i}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="absolute left-4 right-4 origin-left"
              style={{
                bottom: 'clamp(2rem, 3.5vw, 3.2rem)',
                height: 1,
                background: `linear-gradient(90deg, ${p.accent}88, transparent)`,
              }}
            />

            {/* Bottom: title + arrow */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 pb-4 z-10">
              <span
                className="text-white font-semibold uppercase leading-tight"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.85rem)', letterSpacing: '0.1em' }}
              >
                {p.title}
              </span>
              <span
                className="text-white/0 group-hover:text-white/70 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.5rem, 0.75vw, 0.7rem)', letterSpacing: '0.15em' }}
              >
                VIEW →
              </span>
            </div>

            {/* Border */}
            <div className="absolute inset-0 rounded-[16px] border border-white/10 group-hover:border-white/25 transition-colors duration-400 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex items-center justify-between px-[4.1%] py-4 md:py-[2.5%] flex-shrink-0 flex-wrap gap-3"
      >
        <p className="text-[clamp(1rem,2.5vw,2.5rem)] leading-none">
          <span className="text-white font-extralight">HAVE </span>
          <span className="text-white font-semibold">YOUR NEXT IDEA</span>
          <span className="text-white font-extralight"> IN MIND?</span>
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="flex-shrink-0 ml-6 bg-white text-black font-bank-gothic-lt tracking-[0.2em] uppercase px-8 py-4 hover:bg-black hover:text-white border border-white transition-colors duration-300"
          style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}
        >
          CONTACT US
        </button>
      </motion.div>
    </section>
  )
}
