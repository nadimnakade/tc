import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ArrowRight, Sparkles, MapPin } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

// Real, stable Unsplash photos (consulting/team/workspace/data themes)
const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team strategy session around a table',
    label: 'Strategy',
  },
  {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80',
    alt: 'Whiteboard planning with sticky notes',
    label: 'Plan',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    alt: 'Analytics dashboard on a screen',
    label: 'Insights',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
    alt: 'Team collaborating in a bright office',
    label: 'Build',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Two consultants in conversation',
    label: 'Partner',
  },
]

function WordReveal({ children, delay = 0 }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, ease, delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  )
}

function CursorBlob() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 })
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => {
      const rect = ref.current?.parentElement?.getBoundingClientRect()
      if (!rect) return
      x.set(e.clientX - rect.left - 300)
      y.set(e.clientY - rect.top - 300)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute h-[600px] w-[600px] rounded-full"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(200,155,60,0.20),rgba(45,212,191,0.08)_45%,transparent_75%)] blur-3xl" />
      </motion.div>
    </div>
  )
}

function Orb({ className, color, scrollYProgress, speed = 0 }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed])
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ background: color, y }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// One "scenelet" — a positioned image with a scroll-driven position/transform.
function ImageCard({ img, index, scrollYProgress }) {
  // Each image has a different rest position and start position.
  // start -> mid -> end
  const presets = [
    {
      // top-left
      start: { x: '-60%', y: '40%', scale: 0.7, rotate: -8, opacity: 0 },
      end: { x: '0%', y: '0%', scale: 1, rotate: -3, opacity: 1 },
      final: { x: '0%', y: '0%', scale: 0.95, rotate: -3, opacity: 0.85 },
      cls: 'left-[4%] top-[8%] h-[34%] w-[28%]',
      z: 3,
    },
    {
      // top-right
      start: { x: '70%', y: '40%', scale: 0.7, rotate: 10, opacity: 0 },
      end: { x: '0%', y: '0%', scale: 1, rotate: 4, opacity: 1 },
      final: { x: '0%', y: '0%', scale: 0.95, rotate: 4, opacity: 0.85 },
      cls: 'right-[4%] top-[6%] h-[38%] w-[32%]',
      z: 2,
    },
    {
      // bottom-left
      start: { x: '-50%', y: '-30%', scale: 0.6, rotate: -6, opacity: 0 },
      end: { x: '0%', y: '0%', scale: 1, rotate: 2, opacity: 1 },
      final: { x: '0%', y: '0%', scale: 0.92, rotate: 2, opacity: 0.8 },
      cls: 'left-[6%] bottom-[8%] h-[32%] w-[26%]',
      z: 4,
    },
    {
      // bottom-right
      start: { x: '60%', y: '-30%', scale: 0.6, rotate: 8, opacity: 0 },
      end: { x: '0%', y: '0%', scale: 1, rotate: -2, opacity: 1 },
      final: { x: '0%', y: '0%', scale: 0.92, rotate: -2, opacity: 0.8 },
      cls: 'right-[5%] bottom-[10%] h-[30%] w-[28%]',
      z: 5,
    },
    {
      // center feature
      start: { x: '0%', y: '20%', scale: 0.8, rotate: 0, opacity: 0 },
      end: { x: '0%', y: '0%', scale: 1.05, rotate: 0, opacity: 1 },
      final: { x: '0%', y: '-4%', scale: 1, rotate: 0, opacity: 0.9 },
      cls: 'left-1/2 top-1/2 h-[55%] w-[40%] -translate-x-1/2 -translate-y-1/2',
      z: 6,
    },
  ]
  const p = presets[index]

  const x = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [p.start.x, p.end.x, p.final.x],
    { clamp: true }
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [p.start.y, p.end.y, p.final.y],
    { clamp: true }
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [p.start.scale, p.end.scale, p.final.scale],
    { clamp: true }
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [p.start.rotate, p.end.rotate, p.final.rotate],
    { clamp: true }
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.55, 0.95, 1],
    [0, p.end.opacity, p.end.opacity, p.final.opacity, p.final.opacity],
    { clamp: true }
  )

  return (
    <motion.div
      style={{ x, y, scale, rotate, opacity, zIndex: p.z }}
      className={`absolute overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5 ${p.cls}`}
    >
      <motion.img
        src={img.src}
        alt={img.alt}
        loading={index === 4 ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-titan-gold-light" />
        {img.label}
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Text transforms: scale down + move up as scroll progresses
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9],
    [1, 0.85, 0.7],
    { clamp: true }
  )
  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9],
    [0, -40, -90],
    { clamp: true }
  )
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 1, 0.15],
    { clamp: true }
  )

  // CTAs fade out as images take over
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4],
    [1, 1, 0],
    { clamp: true }
  )
  const ctaY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [0, 30],
    { clamp: true }
  )

  // Eyebrow tag
  const eyebrowScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0.9],
    { clamp: true }
  )

  // 3D mouse tilt for the image stage
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useTransform(my, [-200, 200], [4, -4])
  const rotY = useTransform(mx, [-200, 200], [-4, 4])

  const handleScrollDown = () => {
    if (lenis) lenis.scrollTo('#customers', { offset: -20, duration: 1.6 })
    else
      document
        .querySelector('#customers')
        ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <CursorBlob />
        <Orb
          className="left-[-10%] top-[-10%] h-[480px] w-[480px] opacity-50"
          color="radial-gradient(circle,#c89b3c,transparent 70%)"
          scrollYProgress={scrollYProgress}
          speed={160}
        />
        <Orb
          className="right-[-10%] top-[10%] h-[400px] w-[400px] opacity-40"
          color="radial-gradient(circle,#2dd4bf,transparent 70%)"
          scrollYProgress={scrollYProgress}
          speed={220}
        />
        <Orb
          className="bottom-[-10%] left-[30%] h-[500px] w-[500px] opacity-30"
          color="radial-gradient(circle,#c2410c,transparent 70%)"
          scrollYProgress={scrollYProgress}
          speed={280}
        />
        <div className="noise" />

        {/* 3D image stage */}
        <motion.div
          ref={stageRef}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            mx.set(e.clientX - r.left - r.width / 2)
            my.set(e.clientY - r.top - r.height / 2)
          }}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
          className="pointer-events-none absolute inset-0"
        >
          {HERO_IMAGES.map((img, i) => (
            <ImageCard
              key={img.src}
              img={img}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Centered text content */}
        <motion.div
          style={{ scale: textScale, y: textY, opacity: textOpacity }}
          className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center"
        >
          <motion.div
            style={{ scale: eyebrowScale }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-titan-gold/20 bg-titan-gold/5 px-3 py-1.5 text-xs text-titan-gold-light backdrop-blur"
          >
            <Sparkles className="h-3 w-3" />
            <span className="font-medium">Maltese Consultancy</span>
            <span className="text-ink-400">·</span>
            <span className="text-ink-300">20+ years of service</span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-medium leading-[0.98] tracking-tight text-balance sm:text-7xl md:text-[5.25rem]">
            <span className="block">
              <WordReveal delay={0.2}>Experience that</WordReveal>
            </span>
            <span className="block">
              <WordReveal delay={0.35}>
                <span className="italic text-ink-300">leads,</span>
              </WordReveal>{' '}
              <WordReveal delay={0.45}>
                <span className="text-ink-300">...</span>
              </WordReveal>
            </span>
            <span className="block">
              <WordReveal delay={0.55}>value that</WordReveal>{' '}
              <WordReveal delay={0.65}>
                <span className="gradient-text">lasts.</span>
              </WordReveal>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="mx-auto mt-6 max-w-2xl text-base text-ink-200 text-balance sm:text-lg"
          >
            Unparalleled website, software &amp; technology services —{' '}
            <span className="text-white">at your budget.</span> From consulting
            to implementation, across the US, UK, and beyond.
          </motion.p>

          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-titan-gold-light to-titan-gold px-6 py-3 text-sm font-semibold text-ink-950 shadow-[0_0_0_1px_rgba(232,196,104,0.3),0_10px_40px_-10px_rgba(200,155,60,0.6)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-ink-100 backdrop-blur transition-colors hover:bg-white/20"
            >
              Explore services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
          className="group absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-ink-400 transition-colors hover:text-titan-gold-light"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-9 w-5 rounded-full border border-white/20 p-1 transition-colors group-hover:border-titan-gold/50"
          >
            <div className="h-1.5 w-full rounded-full bg-titan-gold/60" />
          </motion.div>
        </motion.button>

        {/* Decorative corner marks */}
        <div className="pointer-events-none absolute left-6 top-6 z-10 hidden items-center gap-2 text-[10px] uppercase tracking-widest text-ink-500 md:flex">
          <MapPin className="h-3 w-3" />
          Malta · 2004 →
        </div>
        <div className="pointer-events-none absolute right-6 top-6 z-10 hidden items-center gap-2 text-[10px] uppercase tracking-widest text-ink-500 md:flex">
          <span>est.</span>
          <span className="font-mono text-titan-gold-light">20+</span>
          <span>years</span>
        </div>
      </div>
    </section>
  )
}
