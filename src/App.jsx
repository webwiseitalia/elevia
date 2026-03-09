import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type'

import logoBeige from './assets/loghi/logo beige senza sfondo.svg'
import logoBianco from './assets/loghi/logo bianco senza sfondo.svg'
import monogrammaBeige from './assets/foto/monogramma beige senza sfondo.svg'
import monogrammaBianco from './assets/foto/monogramma bianco senza sfondo.svg'
import foto1 from './assets/foto/foto-1.webp'
import foto2 from './assets/foto/foto-2.webp'
import foto3 from './assets/foto/foto-3.webp'
import foto4 from './assets/foto/foto-4.webp'
import foto7 from './assets/foto/foto-7.webp'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════
   CTA Button — Riusabile, sempre visibile
   ═══════════════════════════════════════════ */
function CTAButton({ href = '#contatti', children = 'Prenota una Call Gratuita', variant = 'gold', className = '', large = false }) {
  const baseClasses = large
    ? 'px-12 md:px-16 py-5 md:py-6 text-[12px] md:text-[13px]'
    : 'px-10 py-4 text-[11px]'

  if (variant === 'gold') {
    return (
      <a
        href={href}
        data-hover
        className={`group relative inline-flex items-center justify-center gap-3 ${baseClasses} bg-gold text-navy font-sans font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:bg-beige hover:scale-[1.02] active:scale-[0.98] ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <svg className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    )
  }

  return (
    <a
      href={href}
      data-hover
      className={`group relative inline-flex items-center justify-center gap-3 ${baseClasses} bg-transparent border-2 border-gold text-gold font-sans font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:bg-gold hover:text-navy ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <svg className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  )
}

/* ═══════════════════════════════════════════
   Custom Cursor
   ═══════════════════════════════════════════ */
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 768) return
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 })
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX - 20, y: ringY - 20 })
      requestAnimationFrame(animate)
    }

    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    window.addEventListener('mousemove', onMove)
    animate()

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}

/* ═══════════════════════════════════════════
   Lenis Smooth Scroll
   ═══════════════════════════════════════════ */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute('href'))
        if (target) lenis.scrollTo(target, { offset: -80 })
      })
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}

/* ═══════════════════════════════════════════
   Navbar — Sticky, minimal, CTA always visible
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'bg-navy/95 backdrop-blur-xl py-3' : 'bg-transparent py-5'
    }`}>
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20">
        <a href="#" data-hover className="relative z-50">
          <img src={logoBeige} alt="ELEVIA" className={`w-auto transition-all duration-500 ${scrolled ? 'h-7' : 'h-9 md:h-10'}`} />
        </a>

        {/* Desktop — minimal links + CTA */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Come Funziona', href: '#come-funziona' },
            { label: 'Perché ELEVIA', href: '#perche' },
            { label: 'FAQ', href: '#faq' },
          ].map(link => (
            <a key={link.href} href={link.href} data-hover className="text-beige/50 hover:text-gold font-sans text-[11px] tracking-[0.25em] uppercase transition-colors duration-400">
              {link.label}
            </a>
          ))}
          <CTAButton className="ml-4" />
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-end justify-center gap-1.5" aria-label="Menu" data-hover>
          <span className={`block h-[1px] bg-beige transition-all duration-500 ${menuOpen ? 'w-6 rotate-45 translate-y-[3.5px]' : 'w-8'}`} />
          <span className={`block h-[1px] bg-beige transition-all duration-500 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[3.5px]' : 'w-5'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-navy z-40 flex flex-col justify-center items-center px-8"
          >
            {[
              { label: 'Come Funziona', href: '#come-funziona' },
              { label: 'Perché ELEVIA', href: '#perche' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Contatti', href: '#contatti' },
            ].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="block font-display text-beige text-4xl py-4 border-b border-beige/10 w-full text-center"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10"
            >
              <CTAButton large onClick={() => setMenuOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ═══════════════════════════════════════════
   HERO — Vuota, sfondo navy, spazio per animazione
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] bg-navy" />
  )
}

/* ═══════════════════════════════════════════
   SOCIAL PROOF — Numeri che parlano
   ═══════════════════════════════════════════ */
function SocialProof() {
  const sectionRef = useRef(null)

  const stats = [
    { value: '€2.5M+', label: 'Capitale gestito' },
    { value: '12+', label: 'Operazioni completate' },
    { value: '100%', label: 'Trasparenza sui dati' },
    { value: '6-18', label: 'Mesi per operazione' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-anthracite py-16 md:py-20 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <p className="font-display text-gold text-4xl md:text-5xl lg:text-6xl mb-2">{stat.value}</p>
              <p className="font-sans text-warmwhite/40 text-[10px] md:text-[11px] tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   COME FUNZIONA — 3 step chiarissimi + CTA
   ═══════════════════════════════════════════ */
function ComeFunziona() {
  const sectionRef = useRef(null)

  const steps = [
    {
      num: '01',
      title: 'Parliamone',
      desc: 'Fissiamo una call gratuita di 20 minuti. Ti spieghiamo tutto: come funziona, cosa facciamo, quanto puoi aspettarti.',
      image: foto1,
      cta: 'È gratis, senza impegno',
    },
    {
      num: '02',
      title: 'Scegli l\'operazione',
      desc: 'Ti presentiamo le operazioni disponibili con tutti i numeri: costi, margini previsti, tempistiche e analisi del rischio.',
      image: foto4,
      cta: 'Dati reali, zero fumo',
    },
    {
      num: '03',
      title: 'Guadagna con noi',
      desc: 'Partecipi all\'operazione e segui tutto in tempo reale. Report periodici, comunicazione diretta, massima trasparenza.',
      image: foto3,
      cta: 'Sempre aggiornato',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current.querySelector('.cf-heading')
      if (heading) {
        const split = new SplitType(heading, { types: 'words' })
        gsap.from(split.words, {
          y: 60, opacity: 0, stagger: 0.06, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: heading, start: 'top 80%' },
        })
      }

      sectionRef.current.querySelectorAll('.step-block').forEach((block, i) => {
        gsap.from(block, {
          y: 80, opacity: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: block, start: 'top 85%' },
          delay: i * 0.1,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="come-funziona" className="relative bg-warmwhite py-24 md:py-36 overflow-hidden">
      {/* Decorative monogram */}
      <div className="absolute -right-32 top-20 opacity-[0.03] pointer-events-none">
        <img src={monogrammaBeige} alt="" className="w-[400px] h-[400px]" />
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-sans text-gold text-[10px] tracking-[0.4em] uppercase mb-4">— Come funziona</p>
          <h2 className="cf-heading font-display text-navy mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}>
            Tre passi. Nessuna sorpresa.
          </h2>
          <p className="font-body text-navy/50 text-lg max-w-xl mx-auto">
            Il nostro processo è semplice e trasparente. Ecco come funziona, dall'inizio alla fine.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-20 max-w-6xl mx-auto">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0
            return (
              <div key={i} className={`step-block grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${!isEven ? 'md:direction-rtl' : ''}`}>
                {/* Image */}
                <div className={`relative overflow-hidden group ${!isEven ? 'md:order-2' : ''}`}>
                  <div className="overflow-hidden">
                    <img src={step.image} alt={step.title} className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  {/* Step number overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gold flex items-center justify-center">
                    <span className="font-sans font-bold text-navy text-sm">{step.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`${!isEven ? 'md:order-1 md:text-right' : ''}`}>
                  <h3 className="font-display text-navy text-3xl md:text-4xl mb-4">{step.title}</h3>
                  <p className="font-body text-navy/50 text-base leading-relaxed mb-6">{step.desc}</p>
                  <div className={`flex items-center gap-3 ${!isEven ? 'md:justify-end' : ''}`}>
                    <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-sans text-gold text-[11px] tracking-[0.15em] uppercase font-medium">{step.cta}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA after steps */}
        <div className="text-center mt-16 md:mt-24">
          <p className="font-body text-navy/40 text-sm mb-6">Pronto a fare il primo passo?</p>
          <CTAButton large />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   PERCHÉ ELEVIA — Benefici diretti + CTA
   ═══════════════════════════════════════════ */
function PercheElevia() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  const benefits = [
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Rischio controllato',
      desc: 'Non inseguiamo rendimenti fuori scala. Ogni operazione è analizzata, calcolata e protetta.',
    },
    {
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      title: 'Trasparenza totale',
      desc: 'Vedi tutto: costi, margini, tempistiche. Report periodici e comunicazione diretta.',
    },
    {
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      title: 'Asset reali e concreti',
      desc: 'Investiamo in immobili veri, non in strumenti finanziari astratti. Il tuo patrimonio è tangibile.',
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Rapporto umano',
      desc: 'Non sei un numero. Costruiamo relazioni di fiducia, con un team sempre raggiungibile.',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      const heading = sectionRef.current.querySelector('.pe-heading')
      if (heading) {
        const split = new SplitType(heading, { types: 'words' })
        gsap.from(split.words, {
          y: 50, opacity: 0, stagger: 0.05, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: heading, start: 'top 82%' },
        })
      }

      sectionRef.current.querySelectorAll('.benefit-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.08,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="perche" className="relative bg-navy py-24 md:py-36 overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 opacity-10">
        <img ref={imgRef} src={foto2} alt="" className="w-full h-[130%] object-cover" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-sans text-gold text-[10px] tracking-[0.4em] uppercase mb-4">— Perché sceglierci</p>
          <h2 className="pe-heading font-display text-warmwhite mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}>
            Non ti promettiamo la luna.
          </h2>
          <p className="font-body text-beige/40 text-lg max-w-xl mx-auto">
            Ti promettiamo metodo, trasparenza e risultati concreti. Ecco cosa ci rende diversi.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 md:mb-20">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card group p-8 md:p-10 bg-warmwhite/5 border border-warmwhite/10 hover:border-gold/30 hover:bg-warmwhite/10 transition-all duration-500">
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-500">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon} />
                </svg>
              </div>
              <h3 className="font-sans font-semibold text-warmwhite text-sm tracking-[0.1em] uppercase mb-3">{b.title}</h3>
              <p className="font-body text-beige/40 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <CTAButton large />
          <p className="font-sans text-warmwhite/20 text-[10px] tracking-[0.15em] uppercase mt-4">Nessun vincolo · Nessun costo · 20 minuti</p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   TRUST STRIP — Citazione + foto immersiva
   ═══════════════════════════════════════════ */
function TrustStrip() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-quote', {
        y: 50, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
      <img src={foto7} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-navy/70" />

      <div className="relative z-10 text-center px-6 md:px-20 max-w-4xl trust-quote">
        <img src={monogrammaBianco} alt="" className="w-16 h-16 mx-auto mb-8 opacity-30" />
        <blockquote className="font-display italic text-warmwhite text-2xl md:text-4xl leading-snug mb-6">
          "Crescita strutturata.<br />Livello dopo livello."
        </blockquote>
        <p className="font-sans text-gold text-[10px] tracking-[0.3em] uppercase">— La filosofia ELEVIA</p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FAQ — Corta, essenziale + CTA
   ═══════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  const faqs = [
    { q: 'Cos\'è il flipping immobiliare?', a: 'Compriamo immobili sotto valore, li ristrutturiamo e li rivendiamo a un prezzo superiore. Tu partecipi all\'operazione e guadagni dalla differenza.' },
    { q: 'Quanto devo investire come minimo?', a: 'L\'importo varia in base all\'operazione. Contattaci per conoscere le soglie di ingresso attuali e trovare l\'opportunità più adatta a te.' },
    { q: 'Quali sono i rischi?', a: 'Come ogni investimento, ci sono rischi legati al mercato e ai tempi. Noi li minimizziamo con analisi rigorosa, selezione accurata e controllo costante dei costi. Nessuna promessa irrealistica.' },
    { q: 'Quanto durano le operazioni?', a: 'In media tra 6 e 18 mesi, dall\'acquisizione alla rivendita. Ti teniamo aggiornato in ogni fase con report periodici.' },
    { q: 'Devo avere esperienza per investire?', a: 'Assolutamente no. Ti spieghiamo tutto nella call gratuita e ti accompagniamo in ogni fase. Il nostro lavoro è rendere l\'investimento semplice per te.' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current.querySelector('.faq-heading')
      if (heading) {
        const split = new SplitType(heading, { types: 'words' })
        gsap.from(split.words, {
          y: 40, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: heading, start: 'top 82%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="relative py-24 md:py-36 bg-warmwhite overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-gold text-[10px] tracking-[0.4em] uppercase mb-4">— Domande frequenti</p>
          <h2 className="faq-heading font-display text-navy" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Hai domande? Abbiamo risposte.
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-2 mb-12 md:mb-16">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-navy/10 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-hover
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-beige/30 transition-all duration-300"
              >
                <span className="font-sans font-medium text-navy text-sm md:text-base pr-6">{faq.q}</span>
                <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border border-gold/30 transition-all duration-500 ${openIndex === i ? 'rotate-45 bg-gold border-gold' : ''}`}>
                  <svg className={`w-4 h-4 transition-colors duration-300 ${openIndex === i ? 'text-navy' : 'text-gold'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 font-body text-navy/50 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <div className="text-center">
          <p className="font-body text-navy/40 text-base mb-4">Hai altre domande? Parliamone.</p>
          <CTAButton />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   CTA FINALE + CONTATTI — Il gran finale
   ═══════════════════════════════════════════ */
function Contatti() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ nome: '', email: '', telefono: '', messaggio: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current.querySelector('.final-heading')
      if (heading) {
        const split = new SplitType(heading, { types: 'chars' })
        gsap.from(split.chars, {
          y: 80, opacity: 0, stagger: 0.02, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: heading, start: 'top 80%' },
        })
      }

      gsap.from('.final-form', {
        y: 60, opacity: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.final-form', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const inputClasses = "w-full bg-transparent border-b-2 border-warmwhite/15 text-warmwhite py-4 font-body text-base focus:border-gold focus:outline-none transition-colors duration-500 placeholder:text-warmwhite/20"

  return (
    <section ref={sectionRef} id="contatti" className="relative py-24 md:py-36 bg-navy overflow-hidden">
      {/* Decorative */}
      <div className="absolute -right-20 -bottom-20 opacity-[0.02] pointer-events-none">
        <img src={monogrammaBianco} alt="" className="w-[500px] h-[500px]" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        {/* Big CTA message */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-gold text-[10px] tracking-[0.4em] uppercase mb-6">— Inizia ora</p>
          <h2 className="final-heading font-display text-warmwhite mb-6" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', lineHeight: 1, perspective: '800px' }}>
            Il primo passo?<br />
            <span className="text-gold">Contattaci.</span>
          </h2>
          <p className="font-body text-beige/40 text-lg max-w-lg mx-auto">
            Nessun vincolo, nessun costo. Una call di 20 minuti per capire se fa per te.
          </p>
        </div>

        {/* Form */}
        <div className="final-form">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gold flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-warmwhite text-3xl mb-3">Perfetto!</h3>
              <p className="font-body text-beige/50 text-base">Ti ricontatteremo entro 24 ore per fissare la call.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input
                  type="text"
                  required
                  placeholder="Nome e Cognome *"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  onFocus={() => setFocusedField('nome')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses}
                />
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses}
                />
              </div>
              <input
                type="tel"
                placeholder="Telefono (facoltativo)"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                onFocus={() => setFocusedField('telefono')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses}
              />
              <textarea
                rows={3}
                placeholder="Come possiamo aiutarti?"
                value={formData.messaggio}
                onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                onFocus={() => setFocusedField('messaggio')}
                onBlur={() => setFocusedField(null)}
                className={`${inputClasses} resize-none`}
              />

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <button
                  type="submit"
                  data-hover
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-14 py-5 bg-gold text-navy font-sans font-semibold text-[12px] tracking-[0.2em] uppercase hover:bg-beige transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Invia Richiesta</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <span className="font-sans text-warmwhite/20 text-[10px] tracking-[0.15em] uppercase">Risposta entro 24h</span>
              </div>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="mt-16 pt-12 border-t border-warmwhite/10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { label: 'Sede', value: 'Via Paolo Sarpi 88, Brescia' },
            { label: 'Telefono', value: '+39 897 376 2004' },
            { label: 'Email', value: 'info@elevia.it' },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-sans text-gold/50 text-[9px] tracking-[0.3em] uppercase mb-1">{item.label}</p>
              <p className="font-body text-warmwhite/50 text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   Footer — Minimal
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#0a1118] overflow-hidden">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="py-12 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img src={logoBianco} alt="ELEVIA" className="h-8 w-auto opacity-40" />
            <span className="font-display italic text-warmwhite/15 text-sm">"Elevare il capitale. Con metodo."</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" data-hover className="font-sans text-warmwhite/20 text-[10px] tracking-[0.15em] hover:text-gold transition-colors duration-500">Privacy Policy</a>
            <a href="#" data-hover className="font-sans text-warmwhite/20 text-[10px] tracking-[0.15em] hover:text-gold transition-colors duration-500">Cookie Policy</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-warmwhite/5 text-center">
          <p className="font-sans text-warmwhite/10 text-[10px] tracking-[0.15em]">
            © {new Date().getFullYear()} ELEVIA Investimenti Immobiliari — Tutti i diritti riservati
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
function App() {
  useLenis()

  return (
    <div className="noise-overlay">
      <CustomCursor />
      <Navbar />
      <Hero />
      <SocialProof />
      <ComeFunziona />
      <PercheElevia />
      <TrustStrip />
      <FAQ />
      <Contatti />
      <Footer />
    </div>
  )
}

export default App
