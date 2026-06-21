import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

const socials = [
  {
    label: 'Facebook', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    label: 'Instagram', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  },
  {
    label: 'LinkedIn', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  },
  {
    label: 'X', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    label: 'WhatsApp', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    label: 'YouTube', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.5"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
]

const interests = ['UI/UX', 'App Development', 'Web Development', 'Branding', 'Design', 'AI Integration']

const inputBase = "w-full bg-transparent text-black font-bank-gothic-lt text-[13px] tracking-[0.15em] placeholder-black/30 py-3 focus:outline-none uppercase"

export default function Contact() {
  const [selected, setSelected] = useState<string[]>([])
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })

  const toggle = (v: string) => setSelected(s => s.includes(v) ? s.filter(x => x !== v) : [...s, v])
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <section className="relative w-full h-full bg-white flex flex-col overflow-y-auto">
      <div className="h-[56px] flex-shrink-0" />

      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-[4.44%] pt-6 md:pt-[3%] pb-6 md:pb-[3%] gap-8 md:gap-16 min-h-0">

        {/* ─── LEFT ─── */}
        <div className="w-full md:w-[42%] flex flex-col justify-between flex-shrink-0">
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-black/50" />
              <span className="font-bank-gothic-lt text-black/40 text-[11px] tracking-[0.25em] uppercase">Get Started</span>
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden mb-6">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="text-black font-semibold uppercase leading-[1.0]"
                style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.8rem)' }}
              >
                TAKE THE<br />FIRST STEP<br />TOWARDS YOUR<br />NEW PROJECT
              </motion.p>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-px bg-black/25 origin-left mb-6"
            />

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="font-bank-gothic-lt text-black/40 uppercase leading-relaxed"
              style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)', letterSpacing: '0.12em' }}
            >
              LET'S TURN YOUR IDEA<br />INTO REALITY
            </motion.p>
          </div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-auto pt-6"
          >
            <p className="font-bank-gothic-lt text-black/30 text-[10px] tracking-[0.25em] uppercase mb-4">Follow Us</p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/40 hover:border-black/60 hover:text-black transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT — form ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col min-h-0"
        >
          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <p className="text-black font-semibold uppercase" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>Message Sent.</p>
              <p className="text-black/40 font-bank-gothic-lt tracking-[0.12em] uppercase text-sm">We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5 flex-1">

              {/* Name + Company */}
              <div className="grid grid-cols-2 gap-8">
                {[['name', 'Full Name'], ['company', 'Company']].map(([k, label]) => (
                  <div key={k} className="border-b border-black/15 group focus-within:border-black/60 transition-colors duration-300">
                    <input
                      type="text" placeholder={label}
                      value={form[k as keyof typeof form]} onChange={set(k)}
                      className={inputBase}
                    />
                  </div>
                ))}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-8">
                {[['email', 'Email'], ['phone', 'Phone']].map(([k, label]) => (
                  <div key={k} className="border-b border-black/15 group focus-within:border-black/60 transition-colors duration-300">
                    <input
                      type={k === 'email' ? 'email' : 'text'} placeholder={label}
                      value={form[k as keyof typeof form]} onChange={set(k)}
                      className={inputBase}
                    />
                  </div>
                ))}
              </div>

              {/* Interests */}
              <div>
                <p className="font-bank-gothic-lt text-black/35 text-[11px] tracking-[0.2em] uppercase mb-3">
                  I'M INTERESTED IN
                </p>
                <div className="flex flex-wrap gap-2">
                  {interests.map(tag => (
                    <button
                      key={tag} type="button" onClick={() => toggle(tag)}
                      className={`font-bank-gothic-lt text-[11px] tracking-[0.1em] px-4 py-2 rounded-full border transition-all duration-200 uppercase ${
                        selected.includes(tag)
                          ? 'bg-black text-white border-black'
                          : 'bg-transparent text-black/60 border-black/25 hover:border-black/60 hover:text-black'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex-1 flex flex-col border-b border-black/15 focus-within:border-black/60 transition-colors duration-300">
                <p className="font-bank-gothic-lt text-black/35 text-[11px] tracking-[0.2em] uppercase pt-1 mb-2">
                  ANYTHING WE NEED TO KNOW?
                </p>
                <textarea
                  value={form.message} onChange={set('message')}
                  className="flex-1 w-full bg-transparent text-black font-bank-gothic-lt text-[13px] tracking-[0.08em] resize-none focus:outline-none pb-2 min-h-[60px]"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between gap-4 flex-shrink-0">
                <p className="text-black/30 font-bank-gothic-lt text-[10px] tracking-[0.12em] uppercase">
                  * All fields are required
                </p>
                <button
                  type="submit"
                  className="bg-black text-white font-bank-gothic-lt tracking-[0.25em] uppercase px-12 py-4 rounded-full hover:bg-white hover:text-black border border-black transition-colors duration-300 flex-shrink-0"
                  style={{ fontSize: 'clamp(0.7rem, 1vw, 0.9rem)' }}
                >
                  SEND
                </button>
              </div>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
