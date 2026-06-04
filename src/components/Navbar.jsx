import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'

const serviceLinks = [
  { href: '#services', label: 'IT Consultancy' },
  { href: '#services', label: 'Digital Marketing' },
  { href: '#services', label: 'UI/UX Design' },
  { href: '#services', label: 'Business Analysis' },
  { href: '#services', label: 'Software Development' },
  { href: '#services', label: 'Resourcing' },
]

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services', hasMenu: true },
  { href: '#approach', label: 'Approach' },
  { href: '#customers', label: 'Customers' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div
        className={[
          'flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500',
          scrolled
            ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]'
            : 'border border-transparent',
        ].join(' ')}
      >
        <a href="#" className="group flex items-center gap-2.5">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-titan-gold-light to-titan-gold-dark opacity-80 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-titan-gold-light to-titan-gold-dark">
              <span className="font-display text-lg font-bold text-ink-950">T</span>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-tight text-white">
              Titan
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-300">
              Consultancy
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l.hasMenu ? (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={() => setMenuOpen(true)}
              >
                <button
                  className="group inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm text-ink-300 transition-colors hover:text-white"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {l.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      menuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl"
                    >
                      {serviceLinks.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink-200 transition-colors hover:bg-white/5 hover:text-white"
                          onClick={() => setMenuOpen(false)}
                        >
                          {s.label}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-3.5 py-1.5 text-sm text-ink-300 transition-colors hover:text-white"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 -z-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/5" />
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-titan-gold-light to-titan-gold px-4 py-2 text-sm font-medium text-ink-950 shadow-[0_0_0_1px_rgba(232,196,104,0.3),0_8px_30px_-8px_rgba(200,155,60,0.6)] transition-shadow hover:shadow-[0_0_30px_-5px_rgba(232,196,104,0.6)]"
          >
            Let's talk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 mx-4 w-[calc(100%-2rem)] max-w-6xl rounded-2xl border border-white/10 bg-ink-900/95 p-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ink-200 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-gradient-to-r from-titan-gold-light to-titan-gold px-3 py-2 text-center text-sm font-medium text-ink-950"
              >
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
