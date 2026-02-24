import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Menu, X, Zap, Activity, Calendar, ChevronRight } from 'lucide-react'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Design Tokens ──────────────────────────────────────────────────────────
const T = {
  void: '#0D0F0E',
  moss: '#2E4036',
  clay: '#5EB8D4',   // metallic light blue (was clay orange)
  clayL: '#7ECFE6',  // lighter hover variant
  cream: '#F2F0E9',
  surf1: '#141714',
  surf2: '#1c201d',
  surf3: '#252a26',
  border: '#2a2f2b',
}

// ─── Unsplash Images (matching night-mode organic tech mood) ─────────────────
const HERO_IMG = 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1920&q=85&auto=format&fit=crop'  // dark server/tech
const TEXTURE_IMG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=70&auto=format&fit=crop'  // dark office / minimal
const PHIL_IMG = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=70&auto=format&fit=crop'  // dark data/tech abstract

// ─── A. NAVBAR ───────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  const links = ['Features', 'Philosophy', 'Protocol', 'Pricing']

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full
        ${scrolled
          ? 'bg-[#0D0F0E]/80 backdrop-blur-xl border border-[#2a2f2b] shadow-2xl'
          : 'bg-transparent'
        }
      `}
      style={{ width: 'min(900px, calc(100vw - 2rem))' }}
    >
      <div className="flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: T.clay }}>
            <Zap size={14} color={T.cream} strokeWidth={2.5} />
          </div>
          <span
            className="font-bold text-sm tracking-tight"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: scrolled ? T.cream : T.cream }}
          >
            Demystify<span style={{ color: T.clay }}>AI</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="nav-link text-sm font-medium"
              style={{
                color: scrolled ? 'rgba(242,240,233,0.75)' : 'rgba(242,240,233,0.7)',
                textDecoration: 'none',
              }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#pricing" className="btn-primary hidden md:inline-flex text-sm py-2 px-5">
          <span className="btn-bg" />
          <span>Book Consultation</span>
          <ArrowRight size={14} />
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          style={{ color: T.cream, background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-5 pb-5 flex flex-col gap-4 rounded-b-3xl"
          style={{ background: T.surf1 }}
        >
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
              style={{ color: 'rgba(242,240,233,0.8)', textDecoration: 'none', paddingTop: '0.5rem' }}
            >
              {l}
            </a>
          ))}
          <a href="#pricing" className="btn-primary text-sm py-2.5">
            <span className="btn-bg" />
            <span>Book Consultation</span>
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── B. HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-item', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex flex-col justify-end overflow-hidden"
      style={{
        height: '100dvh',
        minHeight: 600,
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMG}
          alt="AI transformation technology"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${T.void} 0%, ${T.void}dd 25%, ${T.void}88 55%, transparent 100%)`,
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${T.void}cc 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Content — anchored at bottom-left, no top padding leaking upward */}
      <div className="relative z-10 w-full max-w-[820px] px-6 md:px-10 xl:px-16 pb-10">
        {/* Eyebrow */}
        <div className="hero-item flex items-center gap-3 mb-5">
          <div className="h-px w-10" style={{ background: T.clay }} />
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: T.clay, fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Forward Deployed AI Engineering
          </span>
        </div>

        {/* Headline — Preset A pattern */}
        <h1 className="hero-item leading-none tracking-tight mb-4">
          <span
            className="block font-extrabold"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)',
              color: T.cream,
              letterSpacing: '-0.03em',
            }}
          >
            Bottlenecks are
          </span>
          <span
            className="block"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(3rem, 7.5vw, 8rem)',
              color: T.cream,
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
            }}
          >
            the Past.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="hero-item text-sm md:text-base mb-7 max-w-lg leading-relaxed"
          style={{ color: 'rgba(242,240,233,0.65)' }}
        >
          We embed inside your operations as forward-deployed AI engineers — diagnosing inefficiencies,
          building custom automations, and shipping results. Not slides. Results.
        </p>

        {/* CTAs */}
        <div className="hero-item flex flex-wrap items-center gap-4">
          <a href="#pricing" className="btn-primary text-base px-7 py-3.5">
            <span className="btn-bg" />
            <span>Book a Consultation</span>
            <ArrowRight size={16} />
          </a>
          <a href="#protocol" className="btn-outline">
            <span>See Our Method</span>
            <ChevronRight size={15} />
          </a>
        </div>

        {/* Stats row */}
        <div className="hero-item flex flex-wrap gap-8 mt-8">
          {[['98%', 'Process efficiency gain'], ['3×', 'Average velocity increase'], ['<30d', 'Time to first automation']].map(([val, label]) => (
            <div key={val}>
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: T.cream }}
              >
                {val}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: 'rgba(242,240,233,0.45)', fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: '"IBM Plex Mono"', color: T.cream }}>Scroll</span>
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(242,240,233,0.2)' }}>
          <div
            className="w-full h-1/2 absolute top-0"
            style={{ background: T.cream, animation: 'scan-h 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}

// ─── C. FEATURES ─────────────────────────────────────────────────────────────

// Card 1 — Diagnostic Shuffler (Refined Process Flows)
function ShufflerCard() {
  const [items, setItems] = useState([
    { id: 1, label: 'Intake Workflow', status: 'Optimized', pct: 94 },
    { id: 2, label: 'Approval Chain', status: 'Automated', pct: 87 },
    { id: 3, label: 'Data Pipeline', status: 'Deployed', pct: 99 },
  ])

  useEffect(() => {
    const id = setInterval(() => {
      setItems(prev => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="rounded-[2rem] p-7 flex flex-col h-full"
      style={{ background: T.surf2, border: `1px solid ${T.border}` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Activity size={14} color={T.clay} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>Process Flows</span>
      </div>
      <h3 className="font-bold text-xl mb-1" style={{ fontFamily: '"Plus Jakarta Sans"', color: T.cream }}>Refined Process Flows</h3>
      <p className="text-sm mb-6" style={{ color: 'rgba(242,240,233,0.5)' }}>Every workflow mapped, optimized, automated.</p>

      {/* Shuffler stack */}
      <div className="relative flex-1" style={{ minHeight: 160 }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute w-full rounded-2xl px-5 py-4 flex items-center justify-between"
            style={{
              background: i === 0 ? T.moss : i === 1 ? T.surf3 : T.surf1,
              border: `1px solid ${i === 0 ? T.clay + '55' : T.border}`,
              top: `${i * 40}px`,
              zIndex: 10 - i,
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              opacity: i === 2 ? 0.45 : 1,
              transform: i === 0 ? 'scale(1)' : i === 1 ? 'scale(0.97)' : 'scale(0.94)',
            }}
          >
            <div>
              <div className="text-sm font-semibold" style={{ color: T.cream }}>{item.label}</div>
              <div className="text-xs mt-0.5" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>{item.status}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold" style={{ color: T.cream, fontFamily: '"IBM Plex Mono"' }}>{item.pct}%</div>
              <div className="w-1 h-8 rounded-full" style={{ background: T.moss }}>
                <div className="w-full rounded-full" style={{ height: `${item.pct}%`, background: T.clay }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Card 2 — Telemetry Typewriter (Industry Level Expertise)
function TypewriterCard() {
  const lines = [
    '> Analyzing CRM integration bottleneck...',
    '> Mapping 47 manual handoff points',
    '> Deploying NLP classifier [accuracy: 97.3%]',
    '> Routing automation: ACTIVE',
    '> Lead qualification: 3.2s avg → 0.1s',
    '> Enterprise blueprint loaded',
    '> Cross-industry pattern matched ✓',
    '> Compliance layer: VERIFIED',
  ]

  const [displayed, setDisplayed] = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const blinkId = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(blinkId)
  }, [])

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const id = setTimeout(() => { setDisplayed([]); setLineIdx(0); setCharIdx(0) }, 2000)
      return () => clearTimeout(id)
    }
    const line = lines[lineIdx]
    if (charIdx < line.length) {
      const id = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev]
          if (next.length < lineIdx + 1) next.push('')
          next[lineIdx] = line.slice(0, charIdx + 1)
          return next
        })
        setCharIdx(c => c + 1)
      }, 28)
      return () => clearTimeout(id)
    } else {
      const id = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 400)
      return () => clearTimeout(id)
    }
  }, [lineIdx, charIdx])

  return (
    <div
      className="rounded-[2rem] p-7 flex flex-col h-full"
      style={{ background: T.surf2, border: `1px solid ${T.border}` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="pulse-dot" />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>Live Feed</span>
      </div>
      <h3 className="font-bold text-xl mb-1" style={{ fontFamily: '"Plus Jakarta Sans"', color: T.cream }}>Industry-Level Expertise</h3>
      <p className="text-sm mb-5" style={{ color: 'rgba(242,240,233,0.5)' }}>Deep domain knowledge, deployed on day one.</p>

      {/* Terminal */}
      <div
        className="rounded-2xl p-4 flex-1 overflow-hidden"
        style={{ background: T.surf1, border: `1px solid ${T.border}`, minHeight: 180 }}
      >
        <div className="flex items-center gap-1.5 mb-3">
          {['#E63B2E', '#F5A623', '#22c55e'].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
          ))}
          <span className="ml-2 text-xs" style={{ color: 'rgba(242,240,233,0.3)', fontFamily: '"IBM Plex Mono"' }}>demystify-ai — diagnostic</span>
        </div>
        <div className="space-y-1">
          {displayed.map((line, i) => (
            <div key={i} className="text-xs leading-relaxed" style={{ color: i === displayed.length - 1 ? T.cream : 'rgba(242,240,233,0.55)', fontFamily: '"IBM Plex Mono"' }}>
              {line}
              {i === displayed.length - 1 && (
                <span style={{ color: T.clay, opacity: cursor ? 1 : 0 }}>█</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Card 3 — Cursor Protocol Scheduler (Real-Time Data Tracking)
function SchedulerCard() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const [activeDay, setActiveDay] = useState(null)
  const [savedDay, setSavedDay] = useState(null)
  const [phase, setPhase] = useState('idle') // idle, moving, clicking, saving, done
  const targetDay = 3 // Wednesday

  useEffect(() => {
    let t1, t2, t3, t4, t5
    const run = () => {
      setActiveDay(null); setSavedDay(null); setPhase('moving')
      t1 = setTimeout(() => setPhase('clicking'), 900)
      t2 = setTimeout(() => { setActiveDay(targetDay); setPhase('saving') }, 1300)
      t3 = setTimeout(() => { setSavedDay(targetDay); setPhase('done') }, 2200)
      t4 = setTimeout(() => { setPhase('idle') }, 3200)
      t5 = setTimeout(run, 4500)
    }
    run()
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  const metrics = [
    { label: 'Processes Tracked', value: '2,847', delta: '+12%' },
    { label: 'Data Events / hr', value: '94.3K', delta: '↑ live' },
    { label: 'Anomalies Flagged', value: '3', delta: '−85%' },
  ]

  return (
    <div
      className="rounded-[2rem] p-7 flex flex-col h-full"
      style={{ background: T.surf2, border: `1px solid ${T.border}` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Calendar size={14} color={T.clay} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>Data Visibility</span>
      </div>
      <h3 className="font-bold text-xl mb-1" style={{ fontFamily: '"Plus Jakarta Sans"', color: T.cream }}>Real-Time Tracking</h3>
      <p className="text-sm mb-5" style={{ color: 'rgba(242,240,233,0.5)' }}>Full operational visibility, always on.</p>

      {/* Week grid */}
      <div className="flex gap-2 mb-5">
        {days.map((d, i) => (
          <div
            key={i}
            className="flex-1 aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold relative overflow-hidden"
            style={{
              background: activeDay === i ? T.clay : savedDay === i ? T.moss : T.surf1,
              color: activeDay === i || savedDay === i ? T.cream : 'rgba(242,240,233,0.4)',
              border: `1px solid ${activeDay === i ? T.clay : T.border}`,
              transform: activeDay === i && phase === 'clicking' ? 'scale(0.92)' : 'scale(1)',
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontFamily: '"IBM Plex Mono"',
            }}
          >
            {d}
            {savedDay === i && (
              <div className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{ background: T.clay }} />
            )}
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-2.5">
        {metrics.map(m => (
          <div key={m.label} className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ background: T.surf1 }}>
            <span className="text-xs" style={{ color: 'rgba(242,240,233,0.55)', fontFamily: '"IBM Plex Mono"' }}>{m.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold" style={{ color: T.cream, fontFamily: '"IBM Plex Mono"' }}>{m.value}</span>
              <span className="text-xs" style={{ color: T.clay }}>{m.delta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-title',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={ref} className="section-pad" style={{ background: T.void }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: T.clay }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>Capabilities</span>
          </div>
          <h2
            className="features-title font-extrabold leading-tight"
            style={{
              fontFamily: '"Plus Jakarta Sans"',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: T.cream,
              letterSpacing: '-0.03em',
              maxWidth: '600px',
            }}
          >
            Built to move at the<br />
            <span style={{ fontFamily: '"Cormorant Garamond"', fontStyle: 'italic', fontWeight: 500, fontSize: '1.15em', color: T.clay }}>speed of your business.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="feature-card md:col-span-1">
            <ShufflerCard />
          </div>
          <div className="feature-card md:col-span-1">
            <TypewriterCard />
          </div>
          <div className="feature-card md:col-span-1">
            <SchedulerCard />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── D. PHILOSOPHY ────────────────────────────────────────────────────────────
function Philosophy() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = ref.current.querySelectorAll('.phil-word')
      gsap.from(words, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 65%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
      })

      // Parallax texture
      gsap.to('.phil-texture', {
        scrollTrigger: {
          trigger: ref.current,
          scrub: 1.5,
        },
        y: -80,
        ease: 'none',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const part1 = 'Most AI consultancies focus on: strategy decks, workshops, and 90-day roadmaps.'.split(' ')
  const part2 = ['We', 'focus', 'on:', 'forward', 'deployment', '—', 'embedded', 'engineers,', 'real', 'automations,', 'actual', 'results.']

  return (
    <section id="philosophy" ref={ref} className="relative section-pad overflow-hidden" style={{ background: T.charcoal || '#141714' }}>
      {/* Parallax texture */}
      <div className="phil-texture absolute inset-0 z-0">
        <img
          src={PHIL_IMG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.07, filter: 'grayscale(100%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #141714, transparent, #141714)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8" style={{ background: T.clay }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>Manifesto</span>
        </div>

        {/* Part 1 — neutral */}
        <div className="mb-8">
          <p className="leading-relaxed text-lg md:text-xl" style={{ color: 'rgba(242,240,233,0.5)' }}>
            {part1.map((w, i) => (
              <span key={i} className="phil-word inline-block mr-[0.28em]">{w}</span>
            ))}
          </p>
        </div>

        {/* Part 2 — massive */}
        <div>
          <p
            className="leading-tight"
            style={{
              fontFamily: '"Cormorant Garamond"',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
              color: T.cream,
              letterSpacing: '-0.02em',
            }}
          >
            {part2.map((w, i) => {
              const highlight = ['forward', 'deployment', '—', 'real', 'automations,', 'actual', 'results.'].includes(w)
              return (
                <span
                  key={i}
                  className="phil-word inline-block mr-[0.2em]"
                  style={{ color: highlight ? T.clay : T.cream }}
                >
                  {w}
                </span>
              )
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── E. PROTOCOL — Sticky Stacking Archive ────────────────────────────────────

// SVG animation 1 — Concentric orbits
function OrbitAnimation() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.9 }}>
      <circle cx="100" cy="100" r="80" stroke={T.border} strokeWidth="1" />
      <circle cx="100" cy="100" r="55" stroke={T.border} strokeWidth="1" />
      <circle cx="100" cy="100" r="30" stroke={T.border} strokeWidth="1" />
      <g className="orbit-slow" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="180" cy="100" r="7" fill={T.clay} />
        <circle cx="100" cy="20" r="4" fill={T.moss} />
      </g>
      <g className="counter-orbit" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="155" cy="100" r="5" fill={T.clay} opacity="0.6" />
        <circle cx="100" cy="45" r="3" fill={T.cream} opacity="0.4" />
      </g>
      <circle cx="100" cy="100" r="8" fill={T.clay} />
    </svg>
  )
}

// SVG animation 2 — Dot grid scanner
function ScannerAnimation() {
  const cols = 8, rows = 5
  return (
    <div className="relative" style={{ width: 200, height: 120 }}>
      {/* Dots */}
      <svg width="200" height="120" viewBox="0 0 200 120">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={14 + c * 25} cy={15 + r * 22} r="2.5" fill={T.border} />
          ))
        )}
      </svg>
      {/* Laser line */}
      <div
        className="scan-line absolute left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${T.clay}, transparent)`, opacity: 0.9, boxShadow: `0 0 8px ${T.clay}` }}
      />
    </div>
  )
}

// SVG animation 3 — EKG waveform
function EKGAnimation() {
  const path = "M0,40 Q20,40 30,40 L40,40 L50,10 L60,70 L70,20 L80,60 L90,40 Q110,40 130,40 L140,40 L150,10 L160,70 L170,20 L180,60 L190,40 L220,40"
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
      <path d={path} stroke={T.border} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d={path}
        stroke={T.clay}
        strokeWidth="2"
        strokeLinecap="round"
        className="ekg-path"
        style={{ filter: `drop-shadow(0 0 4px ${T.clay})` }}
      />
    </svg>
  )
}

function Protocol() {
  const containerRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

  const steps = [
    {
      num: '01',
      title: 'Diagnose',
      desc: 'We embed inside your operations for 5–7 days. Every bottleneck, every manual handoff, every inefficiency gets mapped with surgical precision.',
      Anim: OrbitAnimation,
      ref: card1Ref,
    },
    {
      num: '02',
      title: 'Engineer',
      desc: 'Custom AI automations, integrations, and workflows are designed and built — not templated, not generic. Engineered for your exact stack and scale.',
      Anim: ScannerAnimation,
      ref: card2Ref,
    },
    {
      num: '03',
      title: 'Deploy',
      desc: 'We ship live into your production environment. Fully integrated, fully monitored, with real-time dashboards so nothing moves without you seeing it.',
      Anim: EKGAnimation,
      ref: card3Ref,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current]

      cards.forEach((card, i) => {
        if (i === 0) return // first card is always visible

        gsap.set(card, { scale: 0.88, opacity: 0.3, filter: 'blur(8px)', y: 100 })
      })

      cards.forEach((card, i) => {
        if (i === 0) return
        const prevCard = cards[i - 1]

        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          end: 'top 20%',
          onEnter: () => {
            gsap.to(card, { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.7, ease: 'power3.out' })
            gsap.to(prevCard, { scale: 0.92, opacity: 0.4, filter: 'blur(6px)', duration: 0.7, ease: 'power2.inOut' })
          },
          onLeaveBack: () => {
            gsap.to(card, { scale: 0.88, opacity: 0.3, filter: 'blur(8px)', y: 100, duration: 0.5, ease: 'power2.inOut' })
            gsap.to(prevCard, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' })
          },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="protocol" ref={containerRef} className="section-pad" style={{ background: T.void }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: T.clay }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>Methodology</span>
          </div>
          <h2
            className="font-extrabold leading-tight"
            style={{
              fontFamily: '"Plus Jakarta Sans"',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: T.cream,
              letterSpacing: '-0.03em',
            }}
          >
            The Forward Deployed<br />
            <span style={{ fontFamily: '"Cormorant Garamond"', fontStyle: 'italic', fontWeight: 500, fontSize: '1.1em', color: T.clay }}>Engineer Method.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={step.ref}
              className="rounded-[2rem] overflow-hidden"
              style={{
                background: T.surf2,
                border: `1px solid ${T.border}`,
                willChange: 'transform, opacity, filter',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Text side */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <div
                    className="text-xs mb-6"
                    style={{ color: T.clay, fontFamily: '"IBM Plex Mono"', letterSpacing: '0.1em' }}
                  >
                    PHASE {step.num}
                  </div>
                  <h3
                    className="font-bold mb-4"
                    style={{
                      fontFamily: '"Plus Jakarta Sans"',
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      color: T.cream,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: 'rgba(242,240,233,0.6)', maxWidth: '380px' }}>
                    {step.desc}
                  </p>
                </div>
                {/* Animation side */}
                <div
                  className="flex items-center justify-center p-12"
                  style={{ background: T.surf1, borderLeft: `1px solid ${T.border}` }}
                >
                  <step.Anim />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── F. PRICING / CTA ─────────────────────────────────────────────────────────
function Pricing() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const tiers = [
    {
      name: 'Essential',
      label: 'For growing teams',
      price: 'Custom',
      features: [
        '5-day operational audit',
        '2 core automations deployed',
        'Process flow mapping',
        'Email + Slack integration',
        '30-day support window',
      ],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Performance',
      label: 'Most popular — Forward Deployed',
      price: 'Custom',
      features: [
        'Full FDE 30-day embedding',
        'Unlimited automation builds',
        'Real-time monitoring dashboard',
        'Cross-system AI integrations',
        'Dedicated engineer on-call',
        '90-day success guarantee',
      ],
      cta: 'Book a Consultation',
      featured: true,
    },
    {
      name: 'Enterprise',
      label: 'For large organizations',
      price: 'Custom',
      features: [
        'Multi-team deployment',
        'Enterprise security & compliance',
        'Custom AI model fine-tuning',
        'White-label dashboard',
        'Quarterly strategic reviews',
        'Dedicated success pod',
      ],
      cta: 'Contact Us',
      featured: false,
    },
  ]

  return (
    <section id="pricing" ref={ref} className="section-pad" style={{ background: T.surf1 }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: T.clay }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: T.clay, fontFamily: '"IBM Plex Mono"' }}>Pricing</span>
            <div className="h-px w-8" style={{ background: T.clay }} />
          </div>
          <h2
            className="font-extrabold leading-tight mb-4"
            style={{
              fontFamily: '"Plus Jakarta Sans"',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: T.cream,
              letterSpacing: '-0.03em',
            }}
          >
            Transformation on<br />
            <span style={{ fontFamily: '"Cormorant Garamond"', fontStyle: 'italic', fontWeight: 500, fontSize: '1.1em', color: T.clay }}>your terms.</span>
          </h2>
          <p className="text-base" style={{ color: 'rgba(242,240,233,0.5)', maxWidth: 480, margin: '0 auto' }}>
            Every engagement is scoped to your exact needs. No retainers, no lock-ins. Just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {tiers.map(tier => (
            <div
              key={tier.name}
              className={`pricing-card rounded-[2rem] p-8 flex flex-col ${tier.featured ? '' : ''}`}
              style={{
                background: tier.featured ? T.moss : T.surf2,
                border: `1px solid ${tier.featured ? T.clay + '88' : T.border}`,
                ...(tier.featured ? { boxShadow: `0 0 0 2px ${T.clay}55, 0 32px 80px rgba(204,88,51,0.2)`, transform: 'scale(1.03)' } : {}),
              }}
            >
              <div className="mb-6">
                <div className="text-xs font-medium mb-1" style={{ color: tier.featured ? T.clay : 'rgba(242,240,233,0.4)', fontFamily: '"IBM Plex Mono"' }}>
                  {tier.label}
                </div>
                <div className="text-2xl font-bold" style={{ color: T.cream, fontFamily: '"Plus Jakarta Sans"' }}>{tier.name}</div>
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: tier.featured ? 'rgba(242,240,233,0.85)' : 'rgba(242,240,233,0.6)' }}>
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: T.clay }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={tier.featured ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}
                style={tier.featured ? {} : { borderColor: `${T.border}` }}
              >
                {tier.featured && <span className="btn-bg" />}
                <span>{tier.cta}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── G. FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear()
  const cols = {
    'Services': ['AI Audit', 'Process Automation', 'Data Pipelines', 'Integration Engineering'],
    'Company': ['About', 'Methodology', 'Case Studies', 'Blog'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Security'],
  }

  return (
    <footer
      className="relative"
      style={{ background: '#0A0C0B', borderTopLeftRadius: '4rem', borderTopRightRadius: '4rem', marginTop: '2px' }}
    >
      <div className="section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: T.clay }}>
                  <Zap size={16} color={T.cream} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-base" style={{ fontFamily: '"Plus Jakarta Sans"', color: T.cream }}>
                  Demystify<span style={{ color: T.clay }}>AI</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(242,240,233,0.45)', maxWidth: 260 }}>
                Removing business bottlenecks and inefficiencies with forward-deployed AI engineering.
              </p>
              {/* Status indicator */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ background: T.surf2, border: `1px solid ${T.border}` }}
              >
                <div className="pulse-dot" style={{ background: '#22c55e' }} />
                <span className="text-xs" style={{ color: 'rgba(242,240,233,0.6)', fontFamily: '"IBM Plex Mono"' }}>
                  System Operational
                </span>
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(cols).map(([heading, links]) => (
              <div key={heading}>
                <div className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(242,240,233,0.35)', fontFamily: '"IBM Plex Mono"' }}>
                  {heading}
                </div>
                <ul className="flex flex-col gap-3">
                  {links.map(l => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm nav-link"
                        style={{ color: 'rgba(242,240,233,0.5)', textDecoration: 'none' }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${T.border}` }}
          >
            <span className="text-xs" style={{ color: 'rgba(242,240,233,0.25)', fontFamily: '"IBM Plex Mono"' }}>
              © {year} DemystifyAI. All rights reserved.
            </span>
            <span className="text-xs" style={{ color: 'rgba(242,240,233,0.2)', fontFamily: '"IBM Plex Mono"' }}>
              v2.4.1 — Build 20260223
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
