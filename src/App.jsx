import SmoothScroll from './components/SmoothScroll.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Customers from './components/Customers.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Approach from './components/Approach.jsx'
import WhyUs from './components/WhyUs.jsx'
import Stats from './components/Stats.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-ink-100">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,155,60,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.08),transparent_55%)]" />
          <div className="absolute inset-0 bg-grid-light bg-grid-32 mask-fade-b opacity-50" />
        </div>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Customers />
          <About />
          <Services />
          <Approach />
          <WhyUs />
          <Stats />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
