import { motion } from 'framer-motion'
import { Sparkles, Globe2, Award, Users } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const pillars = [
  {
    icon: Award,
    title: '20+ years',
    body: 'A Maltese company with two decades of service in IT, design, and marketing.',
  },
  {
    icon: Globe2,
    title: 'Global reach',
    body: 'Projects delivered across the US, UK, and beyond — for every market dynamic.',
  },
  {
    icon: Users,
    title: 'Senior team',
    body: 'Master-level graduates and certified UX experts who care about the work.',
  },
  {
    icon: Sparkles,
    title: 'Full spectrum',
    body: 'From consulting to implementation, end-to-end digital support under one roof.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-300">
              <Sparkles className="h-3 w-3" />
              About
            </div>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Welcome to{' '}
              <span className="gradient-text">Titan Consultancy</span>, a
              Maltese company with
              <br />
              <span className="italic text-titan-cyan-light">20+ years</span> of
              service.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="space-y-5 text-base text-ink-300 sm:text-lg"
          >
            <p>
              From consulting to implementation, we offer a full spectrum of
              services to support your digital journey.
            </p>
            <p>
              We have successfully executed projects across the globe, from the
              US to the UK and beyond — committed to helping businesses navigate
              the complexities of the digital world and achieve their goals.
            </p>
            <div className="pt-2">
              <a
                href="mailto:letstalk@titan-consultancy.com?subject=I%20would%20like%20to%20know%20more%20about...&body=Hi%2C%20%0A%0AI%20would%20like%20to%20know%20more%20about..."
                className="group inline-flex items-center gap-2 rounded-full border border-titan-cyan/30 bg-titan-cyan/5 px-4 py-2 text-sm text-titan-cyan-light transition-colors hover:bg-titan-cyan/10"
              >
                <span>Get in touch</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur transition-colors hover:bg-white/[0.04]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-titan-cyan/20 to-titan-steel/10 opacity-50 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-titan-cyan-light" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-400">{p.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
