import { motion } from 'framer-motion'
import { navigateTo } from '../utils/navigate'

interface Props {
  light: string
  bold: string
  sub: string
}

const line = {
  hidden: { opacity: 0, y: 48, clipPath: 'inset(0 0 100% 0)' },
  show:   { opacity: 1, y: 0,  clipPath: 'inset(0 0 0% 0)',   transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const sub = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
}
const btn = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.4, ease: 'easeOut', delay: 0.26 } },
}

export default function IntroPage({ light, bold, sub: subtitle }: Props) {
  return (
    <section className="w-full h-full bg-black flex items-center" data-dark>
      {/* ─── Orb — right half ─── */}
      <div className="absolute right-0 top-[11.2%] w-[52.7%] h-[77.7%] pointer-events-none">
        <img src="/orb.png" alt="" className="w-full h-full object-cover" />
      </div>

      {/* ─── Text — left ─── */}
      <div className="relative z-10 pl-[1.39%] w-[48%] flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          <div className="overflow-hidden">
            <motion.p variants={line} className="text-white font-semibold text-[clamp(2.2rem,4.86vw,4.375rem)] leading-[1.05] uppercase">
              {light}
            </motion.p>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.p variants={line} className="text-white font-semibold text-[clamp(2.2rem,4.86vw,4.375rem)] leading-[1.05] uppercase">
              {bold}
            </motion.p>
          </div>
          <motion.p variants={sub} className="text-white/55 font-extralight text-[clamp(1rem,2.22vw,2rem)] leading-snug mb-8 max-w-[85%]">
            {subtitle}
          </motion.p>
          <motion.button
            variants={btn}
            onClick={() => navigateTo('contact')}
            className="bg-white text-black font-bank-gothic-lt text-[13px] tracking-[0.2em] uppercase px-7 py-3 hover:bg-transparent hover:text-white border border-white transition-colors duration-300 w-fit"
          >
            CONTACT US
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
