import { motion } from 'framer-motion'

const customers = [
  { name: 'King Luxury Services', domain: 'kingluxuryservices.com' },
  { name: 'TechMark', domain: 'techmark.sg' },
  { name: 'Crossover', domain: 'crossover.com' },
  { name: 'Aria Cybersecurity', domain: 'ariacybersecurity.com' },
  { name: 'CSPI', domain: 'cspi.com' },
  { name: 'Talexio', domain: 'talexio.com' },
  { name: 'Furever Clean', domain: 'fureverclean.ca' },
  { name: 'MGM Business Consulting', domain: 'mgmbusinessconsulting.com' },
  { name: 'Wireless Home Solutions', domain: 'wirelesshomesolutions.net' },
  { name: 'PureSport', domain: 'puresport.net' },
  { name: 'Stay Wild Backcountry', domain: 'staywildbackcountry.ca' },
]

export default function Customers() {
  const row = [...customers, ...customers]
  return (
    <section
      id="customers"
      aria-label="Some of our customers"
      className="relative border-y border-white/5 bg-ink-950/40 py-16"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] text-ink-400"
        >
          Some of our customers
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 font-display text-sm italic text-ink-300"
        >
          We've delivered for teams across the US, UK, and EU.
        </motion.p>
      </div>
      <div className="mt-10 mask-fade-x overflow-hidden">
        <div className="flex w-max gap-10 animate-marquee">
          {row.map((c, i) => (
            <LogoMark key={`a-${i}`} customer={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoMark({ customer }) {
  return (
    <a
      href={`https://${customer.domain}`}
      target="_blank"
      rel="noreferrer"
      className="group flex shrink-0 items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 transition-all hover:border-titan-cyan/30 hover:bg-titan-cyan/5"
    >
      <span className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-gradient-to-br from-titan-cyan/30 to-titan-navy/20">
        <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-br from-titan-cyan to-titan-cyan-deep" />
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-display text-sm font-semibold tracking-tight text-ink-100 transition-colors group-hover:text-titan-cyan-light">
          {customer.name}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-500">
          {customer.domain}
        </span>
      </div>
    </a>
  )
}
