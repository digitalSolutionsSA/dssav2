import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  {
    light: 'INNOVATION',
    bold: 'WITHOUT LIMITS.',
    sub: 'Websites. Apps. AI. Marketing.',
  },
  {
    light: 'EVERY BUSINESS',
    bold: 'DESERVES TO GROW.',
    sub: 'We create digital systems that attract, convert and scale.',
  },
  {
    light: 'FROM IDEAS',
    bold: 'TO REALITY.',
    sub: 'Custom websites, apps and AI solutions built for the future.',
  },
  {
    light: 'MORE THAN',
    bold: 'A PROJECT.',
    sub: 'A complete digital ecosystem for your business.',
  },
  {
    light: 'BUILT TO',
    bold: 'STAND OUT.',
    sub: 'Design that captures attention. Technology that delivers results.',
  },
]

// Animation variants — each line slides up independently with stagger
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const lineVariants = {
  hidden: { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -40,
    clipPath: 'inset(100% 0 0% 0)',
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

const subVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 } },
  exit:  { opacity: 0, y: -16, transition: { duration: 0.3 } },
}

const btnVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay: 0.28 } },
  exit:  { opacity: 0, transition: { duration: 0.2 } },
}

export default function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1) // 1 = scrolling down, -1 = up
  const prevActive = useRef(0)

  useEffect(() => {
    const panels = containerRef.current?.querySelectorAll('[data-panel]')
    if (!panels) return

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.panel)
            setDir(idx > prevActive.current ? 1 : -1)
            prevActive.current = idx
            setActive(idx)
          }
        })
      },
      { threshold: 0.55 }
    )

    panels.forEach(p => obs.observe(p))
    return () => obs.disconnect()
  }, [])

  const scroll = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div ref={containerRef} className="relative bg-black" data-dark>

      {/* ─── Sticky viewport ─── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ marginBottom: `-${sections.length * 100}vh` }}
      >
        {/* Orb — right side */}
        <div className="absolute right-0 top-[11.2%] w-[52.7%] h-[77.7%]">
          <img src="/orb.png" alt="" className="w-full h-full object-cover" />
        </div>

        {/* ─── Animated text — left side ─── */}
        <div className="absolute left-[1.39%] top-0 h-full w-[46%] flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Light heading line */}
              <div className="overflow-hidden">
                <motion.p
                  variants={lineVariants}
                  className="text-white font-semibold text-[clamp(2.2rem,4.86vw,4.375rem)] leading-[1.05] uppercase"
                >
                  {sections[active].light}
                </motion.p>
              </div>

              {/* Bold heading line */}
              <div className="overflow-hidden mb-6">
                <motion.p
                  variants={lineVariants}
                  className="text-white font-semibold text-[clamp(2.2rem,4.86vw,4.375rem)] leading-[1.05] uppercase"
                >
                  {sections[active].bold}
                </motion.p>
              </div>

              {/* Subtitle */}
              <motion.p
                variants={subVariants}
                className="text-white/55 font-extralight text-[clamp(1rem,2.22vw,2rem)] leading-snug mb-8 max-w-[90%]"
              >
                {sections[active].sub}
              </motion.p>

              {/* CTA */}
              <motion.button
                variants={btnVariants}
                onClick={scroll}
                className="border border-white text-white font-bank-gothic-lt text-[13px] tracking-[0.2em] uppercase px-7 py-3 hover:bg-white hover:text-black transition-colors duration-300"
              >
                CONTACT US
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicator */}
          <div className="flex items-end gap-[6px] mt-10">
            {sections.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: i === active ? 28 : 4,
                  opacity: i === active ? 1 : 0.3,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-[3px] bg-white rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Invisible scroll-trigger panels */}
      {sections.map((_, i) => (
        <div key={i} data-panel={i} className="h-screen w-full" style={{ position: 'relative', zIndex: 1 }} />
      ))}
    </div>
  )
}
