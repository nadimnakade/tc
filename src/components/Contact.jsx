import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Send, Mail, MapPin, Clock, CheckCircle2, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const hours = [
  { d: 'Monday', h: '09:00 am – 05:00 pm' },
  { d: 'Tuesday', h: '09:00 am – 05:00 pm' },
  { d: 'Wednesday', h: '09:00 am – 05:00 pm' },
  { d: 'Thursday', h: '09:00 am – 05:00 pm' },
  { d: 'Friday', h: '09:00 am – 05:00 pm' },
  { d: 'Saturday', h: 'Closed', closed: true },
  { d: 'Sunday', h: 'Closed', closed: true },
]

export default function Contact() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 15 })
  const sy = useSpring(my, { stiffness: 80, damping: 15 })
  const rotateX = useTransform(sy, [-200, 200], [6, -6])
  const rotateY = useTransform(sx, [-200, 200], [-6, 6])

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!form.email) return
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            mx.set(e.clientX - r.left - r.width / 2)
            my.set(e.clientY - r.top - r.height / 2)
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 p-8 shadow-[0_30px_120px_-20px_rgba(0,212,255,0.4)] sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-titan-cyan/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-titan-navy/15 blur-3xl" />
            <div className="absolute inset-0 bg-grid-light bg-grid-32 opacity-20" />
          </div>
          <div className="noise" />

          <div className="relative grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-titan-cyan/20 bg-titan-cyan/5 px-3 py-1 text-xs text-titan-cyan-light">
                <Sparkles className="h-3 w-3" />
                Drop us a line
              </div>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
                Tell us about
                <br />
                <span className="gradient-text">your project.</span>
              </h2>
              <p className="mt-5 text-ink-300">
                Better yet — let's meet in person. We love our customers, so
                feel free to visit during normal business hours.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="mailto:letstalk@titan-consultancy.com"
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-titan-cyan/20 bg-titan-cyan/10">
                    <Mail className="h-4 w-4 text-titan-cyan-light" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-400">
                      Email
                    </div>
                    <div className="text-sm text-white">
                      letstalk@titan-consultancy.com
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-titan-cyan/20 bg-titan-cyan/10">
                    <MapPin className="h-4 w-4 text-titan-cyan-light" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-400">
                      Headquartered
                    </div>
                    <div className="text-sm text-white">Malta</div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Your name"
              />
              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@company.com"
              />
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink-300">
                  Message (optional)
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you're working on..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-ink-500 transition-colors focus:border-titan-cyan/40 focus:outline-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={sent}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-titan-cyan to-titan-cyan-deep px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_0_0_1px_rgba(0,212,255,0.3),0_10px_40px_-10px_rgba(0,212,255,0.6)] disabled:opacity-80"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {sent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Thanks — we'll be in touch
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </motion.button>

              <p className="text-[10px] text-ink-500">
                Protected by reCAPTCHA. By submitting, you agree to our terms and
                privacy policy.
              </p>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur"
        >
          <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
            <Clock className="h-4 w-4 text-titan-cyan-light" />
            <h3 className="font-display text-lg font-semibold tracking-tight text-white">
              Opening hours
            </h3>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ink-500">
              Mon – Fri
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {hours.map((row, i) => (
              <motion.div
                key={row.d}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="flex items-center justify-between px-6 py-3 text-sm"
              >
                <span className="text-ink-200">{row.d}</span>
                <span
                  className={
                    row.closed
                      ? 'font-mono text-xs uppercase tracking-widest text-ink-500'
                      : 'font-mono text-xs text-ink-300'
                  }
                >
                  {row.h}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink-300">
        {label}
        {required && <span className="ml-1 text-titan-cyan">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-ink-500 transition-colors focus:border-titan-cyan/40 focus:outline-none"
      />
    </div>
  )
}
