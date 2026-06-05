import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['BUILD', 'SCALE', 'TRANSFORM', 'DELIVER']

const cards = [
  { title: 'Strategy', desc: 'Deep discovery that maps your landscape and unlocks opportunity.', icon: '01' },
  { title: 'Design', desc: 'Interfaces crafted for clarity, conversion, and brand resonance.', icon: '02' },
  { title: 'Develop', desc: 'Production-grade engineering — web, mobile, and systems.', icon: '03' },
  { title: 'Deploy', desc: 'Infrastructure, CI/CD, and cloud-native delivery pipelines.', icon: '04' },
  { title: 'Scale', desc: 'Performance tuning, analytics, and growth experimentation.', icon: '05' },
  { title: 'Support', desc: 'Ongoing maintenance, monitoring, and iteration cycles.', icon: '06' },
]

const slides = [
  { num: '01', title: 'Discovery', body: 'We begin every engagement with a rigorous audit — stakeholders, systems, and market position. No assumptions.' },
  { num: '02', title: 'Architecture', body: 'Technical blueprints designed for scale. We define the stack, the integrations, and the path to production.' },
  { num: '03', title: 'Build', body: 'Senior engineers write production code from day one. No junior hand-offs. Weekly demos keep everything aligned.' },
  { num: '04', title: 'Launch', body: 'Infrastructure provisioned, CI/CD configured, monitoring live. We ship with confidence.' },
  { num: '05', title: 'Iterate', body: 'Post-launch, we measure, learn, and refine. Data drives every decision.' },
]

export default function Showcase() {
  const sectionRef = useRef(null)
  const kineticRef = useRef(null)
  const horizontalRef = useRef(null)
  const cardsRef = useRef(null)
  const parallaxRef = useRef(null)
  const revealRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. KINETIC TYPOGRAPHY — pinned hero with rotating words ──
      const kineticTl = gsap.timeline({
        scrollTrigger: {
          trigger: kineticRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 1,
          pin: true,
        },
      })

      words.forEach((word, i) => {
        const el = kineticRef.current.querySelector(`.word-${i}`)
        if (!el) return

        kineticTl.fromTo(
          el,
          { yPercent: 120, opacity: 0, scale: 0.8 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          i * 1.2
        )
        if (i < words.length - 1) {
          kineticTl.to(
            el,
            { yPercent: -120, opacity: 0, scale: 0.8, duration: 1, ease: 'power3.in' },
            i * 1.2 + 0.8
          )
        }
      })

      // ── 2. PARALLAX DEPTH LAYERS ──
      const parallaxLayers = parallaxRef.current?.querySelectorAll('.parallax-layer')
      if (parallaxLayers) {
        parallaxLayers.forEach((layer, i) => {
          const depth = (i + 1) * 0.15
          gsap.to(layer, {
            yPercent: -30 * depth,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }

      // ── 3. PIN + REVEAL ──
      const revealItems = revealRef.current?.querySelectorAll('.reveal-item')
      if (revealItems) {
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: revealRef.current,
            start: 'top top',
            end: '+=1500',
            scrub: 1,
            pin: true,
          },
        })

        revealItems.forEach((item, i) => {
          revealTl.fromTo(
            item,
            { opacity: 0, y: 80, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
            i * 0.4
          )
        })
      }

      // ── 4. HORIZONTAL SCROLL ──
      const horizontalContainer = horizontalRef.current?.querySelector('.horizontal-track')
      if (horizontalContainer) {
        const totalScroll = horizontalContainer.scrollWidth - window.innerWidth

        gsap.to(horizontalContainer, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
      }

      // ── 5. CARD STAGGER REVEALS ──
      const cards = cardsRef.current?.querySelectorAll('.stagger-card')
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, rotateX: 15 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: (i % 3) * 0.15,
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      {/* ── SECTION 1: KINETIC TYPOGRAPHY ── */}
      <div
        ref={kineticRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.08),transparent_60%)]" />
        {words.map((word, i) => (
          <h2
            key={word}
            className={`word-${i} absolute font-display text-[8rem] font-bold tracking-tighter text-white/[0.04] sm:text-[12rem] md:text-[16rem] lg:text-[20rem]`}
          >
            {word}
          </h2>
        ))}
        <div className="relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-titan-cyan-light">
            Scroll to reveal
          </p>
          <h2 className="mt-4 font-display text-5xl font-medium tracking-tight text-white sm:text-7xl md:text-8xl">
            We{' '}
            <span className="gradient-text">
              {words.map((w, i) => (
                <span key={w} className={`word-${i}`}>
                  {w.toLowerCase()}
                </span>
              )).find((_, i) => i === 0)}
            </span>
          </h2>
          <div className="mt-8 flex justify-center">
            <motion.div className="h-px w-20 bg-gradient-to-r from-transparent via-titan-cyan to-transparent" />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: PARALLAX DEPTH ── */}
      <div
        ref={parallaxRef}
        className="relative h-screen overflow-hidden"
      >
        <div className="parallax-layer absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[600px] w-[600px] rounded-full bg-titan-cyan/5 blur-[100px]" />
        </div>
        <div className="parallax-layer absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[400px] w-[400px] rounded-full border border-titan-cyan/10" />
          <div className="absolute h-[500px] w-[500px] rounded-full border border-titan-cyan/5" />
          <div className="absolute h-[600px] w-[600px] rounded-full border border-titan-cyan/[0.03]" />
        </div>
        <div className="parallax-layer absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-titan-cyan-light">
              Depth & Dimension
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl">
              Layers that{' '}
              <span className="gradient-text">breathe</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-ink-300">
              Every interaction has weight, rhythm, and spatial awareness.
              Motion creates meaning — not decoration.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: PIN + REVEAL ── */}
      <div
        ref={revealRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,212,255,0.06),transparent_60%)]" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {slides.slice(0, 3).map((s) => (
              <div
                key={s.num}
                className="reveal-item rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
              >
                <span className="font-mono text-xs text-titan-cyan-light">{s.num}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-ink-300">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {slides.slice(3).map((s) => (
              <div
                key={s.num}
                className="reveal-item rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
              >
                <span className="font-mono text-xs text-titan-cyan-light">{s.num}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-ink-300">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 4: HORIZONTAL SCROLL ── */}
      <div ref={horizontalRef} className="relative overflow-hidden">
        <div className="horizontal-track flex h-screen w-max items-center">
          {slides.map((s, i) => (
            <div
              key={s.num}
              className="flex h-full w-screen flex-shrink-0 items-center justify-center px-12"
            >
              <div className="flex max-w-4xl items-center gap-16">
                <div className="flex-1">
                  <span className="font-mono text-6xl font-bold text-titan-cyan/20">
                    {s.num}
                  </span>
                  <h3 className="mt-4 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-md text-lg text-ink-300">
                    {s.body}
                  </p>
                  <div className="mt-8 h-px w-full max-w-xs bg-gradient-to-r from-titan-cyan/40 to-transparent" />
                </div>
                <div className="hidden h-[300px] w-[300px] flex-shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] md:flex md:items-center md:justify-center">
                  <span className="font-display text-8xl font-bold text-white/[0.04]">
                    {s.num}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-ink-500">
          ← Scroll horizontally →
        </div>
      </div>

      {/* ── SECTION 5: CARD STAGGER REVEALS ── */}
      <div ref={cardsRef} className="relative py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-titan-cyan-light">
              Capabilities
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Every phase,{' '}
              <span className="gradient-text">covered.</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <div
                key={c.icon}
                className="stagger-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.04]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-titan-cyan/10 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                <span className="font-mono text-4xl font-bold text-titan-cyan/10">
                  {c.icon}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-ink-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
