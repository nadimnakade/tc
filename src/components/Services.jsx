import { motion } from 'framer-motion'
import {
  Cpu,
  Megaphone,
  PenTool,
  LineChart,
  Code2,
  Users,
  ArrowUpRight,
  Sparkles,
  Target,
  Layers,
  Briefcase,
  Workflow,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const services = [
  {
    title: 'IT Consultancy',
    blurb:
      'A strong blend of business, commercial and technical skills — without hidden costs and no technical compromise.',
    points: [
      'Technical architecture',
      'Dedicated expert guidance',
      'No hidden costs',
    ],
    icon: Cpu,
    className: 'md:col-span-3 md:row-span-2',
    accent: 'from-titan-cyan/30 to-titan-cyan-deep/10',
    visual: 'it',
  },
  {
    title: 'Digital Transformation',
    blurb:
      'Translate user requirements to functional specifications and liaise with dev teams throughout the lifecycle.',
    icon: Workflow,
    className: 'md:col-span-3',
    accent: 'from-titan-teal/30 to-titan-teal-deep/10',
  },
  {
    title: 'Business Strategy',
    blurb:
      'Identify issues, define solutions, and implement changes that deliver long-term business benefits.',
    icon: Target,
    className: 'md:col-span-3',
    accent: 'from-titan-rust/30 to-orange-900/10',
  },
  {
    title: 'Resourcing',
    blurb:
      'Access world-class software engineers for IT projects or product acceleration.',
    icon: Users,
    className: 'md:col-span-2',
    accent: 'from-titan-cyan/20 to-titan-cyan-deep/10',
  },
  {
    title: 'Digital Marketing',
    blurb:
      'Strategy, paid media, SEM and social — a roadmap to your targets.',
    icon: Megaphone,
    className: 'md:col-span-2',
    accent: 'from-titan-teal/20 to-titan-teal-deep/10',
  },
  {
    title: 'Branding',
    blurb:
      'Develop your brand, design your logo, build assets and guidelines.',
    icon: PenTool,
    className: 'md:col-span-2',
    accent: 'from-titan-rust/20 to-orange-900/10',
  },
  {
    title: 'UI/UX & Graphic Design',
    blurb:
      'User research, wireframing, prototyping and visual design for new and existing products.',
    icon: Layers,
    className: 'md:col-span-3',
    accent: 'from-titan-cyan/20 to-titan-steel/10',
  },
  {
    title: 'Business Analysis & BPR',
    blurb:
      'Re-engineer processes for competitive advantage — reduce overhead, improve customer experience.',
    icon: LineChart,
    className: 'md:col-span-3',
    accent: 'from-titan-steel/20 to-titan-cyan/10',
  },
  {
    title: 'Custom Software',
    blurb:
      'Mission-critical web & software projects in C, C++, C#, Java and beyond — flexible, on time, on budget.',
    icon: Code2,
    className: 'md:col-span-3',
    accent: 'from-titan-steel/20 to-titan-cyan/10',
  },
  {
    title: 'Project & Product Management',
    blurb:
      'Coherent specifications through the full lifecycle — repeat clients, proudly delivered.',
    icon: Briefcase,
    className: 'md:col-span-3',
    accent: 'from-titan-cyan/20 to-titan-steel/10',
  },
]

function ITVisual() {
  return (
    <div className="mt-6 flex-1 rounded-xl border border-white/5 bg-black/30 p-4 font-mono text-[11px] leading-relaxed">
      <div className="mb-2 flex items-center gap-2 text-ink-500">
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-amber-400/60" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        <span className="ml-2">/consultancy</span>
      </div>
      <div className="space-y-1.5">
        {[
          { c: 'text-titan-cyan', t: '$ discover' },
          { c: 'text-ink-300', t: '  ↳ map stakeholders' },
          { c: 'text-ink-300', t: '  ↳ audit systems' },
          { c: 'text-titan-cyan', t: '$ plan' },
          { c: 'text-ink-300', t: '  ↳ architecture' },
          { c: 'text-ink-300', t: '  ↳ cost & timeline' },
          { c: 'text-titan-cyan', t: '✓ no hidden costs' },
          { c: 'text-titan-cyan', t: '✓ senior on every call' },
        ].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className={line.c}
          >
            {line.t}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Card({ service, i }) {
  const Icon = service.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay: i * 0.05 }}
      whileHover={{ y: -4 }}
      className={[
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.04]',
        service.className,
      ].join(' ')}
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${service.accent} opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-100`}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5 text-titan-cyan-light" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-ink-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-titan-cyan-light" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-2 max-w-md text-sm text-ink-300">{service.blurb}</p>

        {service.points && (
          <ul className="mt-4 space-y-1.5 text-xs text-ink-300">
            {service.points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-titan-cyan" />
                {p}
              </li>
            ))}
          </ul>
        )}

        {service.visual === 'it' && <ITVisual />}
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-titan-cyan/8 blur-3xl" />
      </div>
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
            Expertise
          </div>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            A full spectrum of
            <br />
            <span className="gradient-text">digital services.</span>
          </h2>
          <p className="mt-5 text-ink-300">
            Six interlocking capabilities. End-to-end ownership. No glue code.
          </p>
        </motion.div>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {services.map((s, i) => (
            <Card key={s.title} service={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
