import { motion } from 'framer-motion'
import { Sparkles, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

const cols = [
  {
    title: 'Services',
    links: [
      'IT Consultancy',
      'Digital Transformation',
      'Digital Marketing',
      'UI/UX Design',
      'Business Analysis',
      'Software Development',
    ],
  },
  {
    title: 'Company',
    links: ['About', 'Approach', 'Customers', 'Contact', 'Careers'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Case studies', 'Insights', 'Support', 'Privacy'],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-titan-gold-light to-titan-gold-dark">
                <span className="font-display text-lg font-bold text-ink-950">
                  T
                </span>
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
            <p className="mt-4 max-w-xs text-sm text-ink-300">
              Experience that leads, value that lasts. Made with care in Malta.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-colors hover:border-titan-gold/30 hover:text-titan-gold-light"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold text-white">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-ink-300 transition-colors hover:text-titan-gold-light"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-thin my-12" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-start justify-between gap-4 text-xs text-ink-500 sm:flex-row sm:items-center"
        >
          <span>
            © {new Date().getFullYear()} Titan Consultancy — All rights
            reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-titan-gold-light">
              Privacy
            </a>
            <a href="#" className="hover:text-titan-gold-light">
              Terms
            </a>
            <a href="#" className="hover:text-titan-gold-light">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
