import { motion } from 'framer-motion'
import { navigateTo } from '../utils/navigate'

export default function WhyUs() {
  return (
    <section className="relative w-full h-full bg-white overflow-hidden flex flex-col">

      {/* Background decorative element */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large soft circle — bottom left */}
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: '65vw', height: '65vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #f0f0f0 0%, transparent 70%)',
        }} />
        {/* Smaller circle — top right */}
        <div style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #ebebeb 0%, transparent 70%)',
        }} />
        {/* Subtle grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="h-[56px] flex-shrink-0" />

      {/* Centre content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-[8%] gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-black uppercase leading-[1.05]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: 'clamp(2rem, 6.67vw, 6rem)' }}>
            DIGITAL GROWTH
          </p>
          <p className="text-black uppercase leading-[1.05]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 6.67vw, 6rem)' }}>
            WITHOUT COMPROMISE.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-black w-full md:max-w-[65%]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 'clamp(0.85rem, 1.5vw, 1.35rem)', lineHeight: 1.8 }}
        >
          We don't believe in shortcuts. Every project is approached with strategy, precision,
          and a commitment to excellence. From web development and AI solutions to digital
          marketing and branding, we create powerful digital ecosystems that help businesses
          thrive in a competitive world.
        </motion.p>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-4 md:px-[1.39%] pb-4 md:pb-5 flex-shrink-0"
      >
        <p className="text-black leading-none"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1rem, 3.33vw, 3rem)' }}>
          <span style={{ fontWeight: 200 }}>WHY </span>
          <span style={{ fontWeight: 700 }}>US.</span>
        </p>
        <button onClick={() => navigateTo('contact')}
          className="bg-black text-white font-bank-gothic-lt tracking-[0.2em] uppercase hover:bg-white hover:text-black border border-black transition-colors duration-300 px-5 md:px-8 py-3 md:py-4"
          style={{ fontSize: 'clamp(0.55rem, 1vw, 0.9rem)' }}>
          CONTACT US
        </button>
      </motion.div>
    </section>
  )
}
