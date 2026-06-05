import { motion } from 'framer-motion'
import { Brain, Award, Compass, Heart, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const pillars = [
  {
    icon: Brain,
    tag: 'Expertise',
    title: 'Specialists, not generalists',
    body: 'We are experts in digital marketing, data management, data interchange and integration software, and analytical and decision support software.',
    accent: 'from-titan-cyan/30 to-titan-cyan-deep/10',
  },
  {
    icon: Award,
    tag: 'Experience',
    title: 'Two decades of delivery',
    body: 'A proven track record of high-quality projects for diverse markets worldwide. We specialize in varied business needs and market dynamics to drive successful digital transformations.',
    accent: 'from-titan-teal/30 to-titan-teal-deep/10',
  },
  {
    icon: Compass,
    tag: 'Attitude',
    title: 'With you, at every stage',
    body: 'We endeavour to work with you at every step, ensuring your specific goals are reached. Business mentors are key — that\u2019s why when it comes to client selection, we\u2019re choosy.',
    accent: 'from-titan-rust/30 to-orange-900/10',
  },
  {
    icon: Heart,
    tag: 'Culture',
    title: 'Time and guidance',
    body: 'We want to give each of you the time and guidance they deserve. We didn\u2019t get there alone... and neither will you.',
    accent: 'from-titan-cyan/30 to-titan-steel/10',
  },
]

export default function WhyUs() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-300">
            <Sparkles className="h-3 w-3" />
            Why us
          </div>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Four reasons clients
            <br />
            <span className="gradient-text">come back.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.04]"
              >
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${p.accent} opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-100`}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-titan-cyan-light" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-titan-cyan-light">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300 sm:text-base">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
