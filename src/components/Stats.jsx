import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

const stats = [
  { value: 20, suffix: '+', label: 'Years of service', sub: 'Maltese roots' },
  { value: 11, suffix: '', label: 'Customers served', sub: 'And counting' },
  { value: 3, suffix: '', label: 'Continents reached', sub: 'US · UK · EU' },
  { value: 100, suffix: '%', label: 'Senior on every call', sub: 'No junior hand-offs' },
]

function Counter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 1800, bounce: 0 })
  const display = useTransform(spring, (v) =>
    decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString()
  )
  const [text, setText] = useState(decimals ? '0.0' : '0')

  useEffect(() => {
    const unsub = display.on('change', setText)
    return () => unsub()
  }, [display])

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-gradient-to-b from-ink-950/40 via-ink-900/40 to-ink-950/40 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.10),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center md:text-left"
            >
              <div className="font-display text-5xl font-medium tracking-tight sm:text-6xl">
                <span className="gradient-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
              </div>
              <div className="mt-2 text-sm font-medium text-white">{s.label}</div>
              <div className="mt-1 text-xs text-ink-500">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
