import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Map, Rocket, HeartHandshake, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const stages = [
  {
    n: '01',
    icon: Search,
    eyebrow: 'Discover',
    title: 'A comprehensive consult',
    body: 'We help identify gaps and opportunities — a deep-dive that frames the real problem before any solution is proposed.',
    accent: 'from-titan-gold/40 to-titan-gold-dark/10',
    items: ['Stakeholder mapping', 'Current-state audit', 'Opportunity sizing'],
  },
  {
    n: '02',
    icon: Map,
    eyebrow: 'Plan',
    title: 'A clear project plan',
    body: 'A detailed report with timelines, milestones, and a cost analysis. No surprises, no scope creep.',
    accent: 'from-titan-teal/40 to-titan-teal-deep/10',
    items: ['Timelines & milestones', 'Cost analysis', 'Risk register'],
  },
  {
    n: '03',
    icon: Rocket,
    eyebrow: 'Execute',
    title: 'Quality, delivered fast',
    body: 'A suite of quality products that help you get there quickly and smoothly — reducing the communication gap between your business and your clients.',
    accent: 'from-titan-rust/40 to-orange-900/10',
    items: ['Senior-led delivery', 'Weekly demos', 'Quality gates'],
  },
  {
    n: '04',
    icon: HeartHandshake,
    eyebrow: 'Empower',
    title: 'Tools to succeed',
    body: 'Our ramp-up process empowers your teams and outfits them with the tools your business needs to succeed — long after we go.',
    accent: 'from-titan-gold/40 to-titan-teal/10',
    items: ['Team enablement', 'Documentation', 'Knowledge transfer'],
  },
]

function Visual({ stage }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${stage.accent} opacity-30 blur-3xl`}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-ink-500">/{stage.eyebrow.toLowerCase()}</span>
          <span className="font-mono text-ink-500">{stage.n}/04</span>
        </div>

        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/5 bg-black/40">
          <ClipPathReveal accent={stage.accent}>
            <StageArt stage={stage} />
          </ClipPathReveal>
        </div>

        <div className="mt-4 flex-1 space-y-2">
          {stage.items.map((it, i) => (
            <motion.div
              key={it}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.2 + i * 0.12, ease }}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/30 px-3 py-2"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${stage.accent}`}
              />
              <span className="text-sm text-ink-100">{it}</span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '40%' }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.8 }}
                className={`ml-auto h-1 rounded-full bg-gradient-to-r ${stage.accent}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClipPathReveal({ children, accent }) {
  return (
    <div className="relative h-full w-full">
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1.2, ease }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ x: '0%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1.2, ease }}
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent`}
        style={{ filter: 'blur(12px)' }}
      />
    </div>
  )
}

function StageArt({ stage }) {
  const Icon = stage.icon
  if (stage.eyebrow === 'Discover') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-ink-900 via-ink-950 to-black">
        <div className={`absolute inset-0 bg-gradient-to-br ${stage.accent} opacity-50`} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.line
              key={i}
              x1={20 + i * 20}
              y1="0"
              x2={20 + i * 20}
              y2="225"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 + i * 0.02, duration: 0.6 }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={20 + i * 20}
              x2="400"
              y2={20 + i * 20}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6 + i * 0.02, duration: 0.6 }}
            />
          ))}
        </svg>
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8, duration: 0.8, ease }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-titan-gold-light/60 bg-gradient-to-br from-titan-gold/30 to-transparent backdrop-blur">
            <Icon className="h-9 w-9 text-titan-gold-light" />
          </div>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1.6, opacity: [0, 0.4, 0] }}
            viewport={{ once: false }}
            transition={{ delay: 1.2, duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-titan-gold-light/40"
          />
        </motion.div>
      </div>
    )
  }
  if (stage.eyebrow === 'Plan') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-ink-900 to-black">
        <div className={`absolute inset-0 bg-gradient-to-br ${stage.accent} opacity-40`} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
          {[
            { x: 80, y: 60 },
            { x: 200, y: 110 },
            { x: 320, y: 70 },
            { x: 140, y: 170 },
            { x: 290, y: 175 },
          ].map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r="5"
              fill="#2dd4bf"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 + i * 0.15 }}
            />
          ))}
          <motion.path
            d="M 80 60 L 200 110 L 320 70 L 290 175 L 140 170 Z"
            stroke="#2dd4bf"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 1.5, ease }}
          />
          {[
            [80, 60, 200, 110],
            [200, 110, 320, 70],
            [320, 70, 290, 175],
            [290, 175, 140, 170],
            [140, 170, 80, 60],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(45,212,191,0.3)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
            />
          ))}
        </svg>
        <div className="absolute right-4 top-4 rounded-md border border-titan-teal/30 bg-titan-teal/10 px-2 py-1 font-mono text-[10px] text-titan-teal">
          v 1.0
        </div>
      </div>
    )
  }
  if (stage.eyebrow === 'Execute') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-ink-900 to-black">
        <div className={`absolute inset-0 bg-gradient-to-br ${stage.accent} opacity-40`} />
        <div className="absolute inset-0 flex items-end justify-center gap-1.5 p-6">
          {[40, 55, 48, 70, 62, 78, 65, 88, 75, 95, 82, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: `${h}%`, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease }}
              className="w-4 rounded-t-sm bg-gradient-to-t from-orange-500/60 to-titan-rust"
            />
          ))}
        </div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1.2, duration: 0.8, ease }}
          className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-titan-rust to-orange-500 shadow-lg"
        >
          <Rocket className="h-5 w-5 text-white" />
        </motion.div>
      </div>
    )
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-ink-900 to-black">
      <div className={`absolute inset-0 bg-gradient-to-br ${stage.accent} opacity-40`} />
      <div className="absolute inset-0 grid place-items-center">
        <svg className="h-3/4 w-3/4" viewBox="0 0 200 200">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={i}
              cx="100"
              cy="100"
              r={20 + i * 15}
              stroke="rgba(232,196,104,0.4)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
            />
          ))}
          <motion.path
            d="M 60 100 Q 100 60 140 100 Q 100 140 60 100 Z"
            fill="rgba(45,212,191,0.3)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 1.2, duration: 0.8, ease }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="6"
            fill="#e8c468"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 1.5 }}
          />
        </svg>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-4 rounded-md border border-titan-gold/30 bg-titan-gold/10 px-2 py-1 font-mono text-[10px] text-titan-gold-light"
      >
        +247% capacity
      </motion.div>
    </div>
  )
}

function Stage({ stage, index, total, scrollYProgress }) {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2
  const fade = (end - start) * 0.35

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
    { clamp: true }
  )
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [40, 0, -40],
    { clamp: true }
  )
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.94, 1, 0.94],
    { clamp: true }
  )

  const Icon = stage.icon
  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 grid grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-12"
    >
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-200">
          <Icon className="h-3 w-3 text-titan-gold-light" />
          {stage.eyebrow}
          <span className="ml-1 font-mono text-ink-500">— step {stage.n}</span>
        </div>
        <h3 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
          {stage.title}
        </h3>
        <p className="mt-5 max-w-md text-base text-ink-300 sm:text-lg">
          {stage.body}
        </p>
      </div>

      <div className="aspect-[5/4] w-full">
        <Visual stage={stage} />
      </div>
    </motion.div>
  )
}

export default function Approach() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={ref}
      id="approach"
      className="relative"
      style={{ height: `${stages.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid-light bg-grid-32 mask-fade-b opacity-30" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease }}
            className="mb-10 text-center"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-300">
              <Sparkles className="h-3 w-3" />
              Our approach
            </div>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Scroll to see how we <span className="gradient-text">work</span>
            </h2>
          </motion.div>

          <div className="relative h-[58vh] min-h-[440px]">
            {stages.map((s, i) => (
              <Stage
                key={s.title}
                stage={s}
                index={i}
                total={stages.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-titan-gold-dark via-titan-gold to-titan-teal"
              />
            </div>
            <div className="font-mono text-xs text-ink-500">
              <IndexText progress={scrollYProgress} total={stages.length} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IndexText({ progress, total }) {
  const text = useTransform(progress, (v) => {
    const idx = Math.min(total, Math.max(1, Math.ceil(v * total) || 1))
    return `0${idx} / 0${total}`
  })
  return <motion.span>{text}</motion.span>
}
