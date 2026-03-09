import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

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

/* ── Colori (hardcoded per sicurezza) ── */
const C = {
  navy: '#0E1B2A',
  beige: '#E6DCCB',
  anthracite: '#2B2E34',
  warmwhite: '#F7F6F3',
  gold: '#B8A46A',
}

/* ═══════════════════════════════════════════
   CTA Button
   ═══════════════════════════════════════════ */
function CTAButton({ href = '#contatti', children = 'Prenota una Call Gratuita', variant = 'gold', large = false }) {
  const pad = large ? '16px 48px' : '14px 40px'
  const fs = large ? '13px' : '11px'

  if (variant === 'gold') {
    return (
      <a
        href={href}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: pad, fontSize: fs,
          backgroundColor: C.gold, color: C.anthracite,
          fontFamily: 'Poppins, sans-serif', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          textDecoration: 'none', transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.beige }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold }}
      >
        <span>{children}</span>
        <span style={{ fontSize: '16px' }}>→</span>
      </a>
    )
  }

  return (
    <a
      href={href}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: pad, fontSize: fs,
        backgroundColor: 'transparent', color: C.gold,
        border: `2px solid ${C.gold}`,
        fontFamily: 'Poppins, sans-serif', fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        textDecoration: 'none', transition: 'all 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.color = C.anthracite }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.gold }}
    >
      <span>{children}</span>
      <span style={{ fontSize: '16px' }}>→</span>
    </a>
  )
}

/* ═══════════════════════════════════════════
   Lenis Smooth Scroll
   ═══════════════════════════════════════════ */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true })
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

    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf) }
  }, [])
}

/* ═══════════════════════════════════════════
   Navbar
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Come Funziona', href: '#come-funziona' },
    { label: 'Perché ELEVIA', href: '#perche' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '12px 0' : '20px 0',
      backgroundColor: scrolled ? 'rgba(14,27,42,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      transition: 'all 0.5s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <a href="#">
          <img src={logoBeige} alt="ELEVIA" style={{ height: scrolled ? '28px' : '36px', transition: 'height 0.5s' }} />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="nav-desktop">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'rgba(230,220,203,0.5)', fontFamily: 'Poppins, sans-serif',
                fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = C.gold }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(230,220,203,0.5)' }}
            >
              {link.label}
            </a>
          ))}
          <CTAButton />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            flexDirection: 'column', alignItems: 'flex-end', gap: '6px', padding: '8px', zIndex: 60, position: 'relative',
          }}
          aria-label="Menu"
        >
          <span style={{
            display: 'block', height: '1px', backgroundColor: C.beige,
            width: menuOpen ? '24px' : '32px',
            transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
            transition: 'all 0.4s',
          }} />
          <span style={{
            display: 'block', height: '1px', backgroundColor: C.beige,
            width: menuOpen ? '24px' : '20px',
            transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
            transition: 'all 0.4s',
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed', inset: 0, backgroundColor: C.navy, zIndex: 55,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px',
            }}
          >
            {[...links, { label: 'Contatti', href: '#contatti' }].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                style={{
                  display: 'block', fontFamily: '"Playfair Display", serif',
                  color: C.beige, fontSize: '32px', padding: '16px 0',
                  borderBottom: `1px solid rgba(230,220,203,0.1)`,
                  width: '100%', textAlign: 'center', textDecoration: 'none',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <div style={{ marginTop: '40px' }}>
              <CTAButton large />
            </div>
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
    <section id="hero" style={{ height: '100vh', minHeight: '700px', backgroundColor: C.navy }} />
  )
}

/* ═══════════════════════════════════════════
   SOCIAL PROOF — Numeri
   ═══════════════════════════════════════════ */
function SocialProof() {
  const stats = [
    { value: '€2.5M+', label: 'Capitale gestito' },
    { value: '12+', label: 'Operazioni completate' },
    { value: '100%', label: 'Trasparenza sui dati' },
    { value: '6-18', label: 'Mesi per operazione' },
  ]

  return (
    <section style={{ backgroundColor: C.anthracite, padding: 'clamp(48px, 5vw, 80px) 0' }}>
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <p style={{ fontFamily: '"Playfair Display", serif', color: C.gold, fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '8px' }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.4)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   COME FUNZIONA — 3 step + CTA
   ═══════════════════════════════════════════ */
function ComeFunziona() {
  const steps = [
    { num: '01', title: 'Parliamone', desc: 'Fissiamo una call gratuita di 20 minuti. Ti spieghiamo tutto: come funziona, cosa facciamo, quanto puoi aspettarti.', image: foto1, cta: 'È gratis, senza impegno' },
    { num: '02', title: 'Scegli l\'operazione', desc: 'Ti presentiamo le operazioni disponibili con tutti i numeri: costi, margini previsti, tempistiche e analisi del rischio.', image: foto4, cta: 'Dati reali, zero fumo' },
    { num: '03', title: 'Guadagna con noi', desc: 'Partecipi all\'operazione e segui tutto in tempo reale. Report periodici, comunicazione diretta, massima trasparenza.', image: foto3, cta: 'Sempre aggiornato' },
  ]

  return (
    <section id="come-funziona" style={{ backgroundColor: C.warmwhite, padding: 'clamp(64px, 8vw, 144px) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-128px', top: '80px', opacity: 0.03, pointerEvents: 'none' }}>
        <img src={monogrammaBeige} alt="" style={{ width: '400px', height: '400px' }} />
      </div>

      <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 96px)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>— Come funziona</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: C.anthracite, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '24px' }}>
            Tre passi. Nessuna sorpresa.
          </h2>
          <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(43,46,52,0.5)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Il nostro processo è semplice e trasparente. Ecco come funziona, dall'inizio alla fine.
          </p>
        </div>

        {/* Steps */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 5vw, 80px)' }}>
          {steps.map((step, i) => (
            <div key={i} className="step-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'center' }}>
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', order: i % 2 !== 0 ? 2 : 0 }}>
                <img src={step.image} alt={step.title} style={{ width: '100%', height: 'clamp(250px, 30vw, 400px)', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', top: '16px', left: '16px', width: '48px', height: '48px',
                  backgroundColor: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: C.anthracite, fontSize: '14px',
                }}>
                  {step.num}
                </div>
              </div>
              {/* Content */}
              <div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', color: C.anthracite, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '16px' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(43,46,52,0.5)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                  {step.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: C.gold, fontSize: '18px' }}>✓</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {step.cta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 96px)' }}>
          <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(43,46,52,0.4)', fontSize: '14px', marginBottom: '24px' }}>Pronto a fare il primo passo?</p>
          <CTAButton large />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   PERCHÉ ELEVIA — Benefici + CTA
   ═══════════════════════════════════════════ */
function PercheElevia() {
  const benefits = [
    { icon: '🛡️', title: 'Rischio controllato', desc: 'Non inseguiamo rendimenti fuori scala. Ogni operazione è analizzata, calcolata e protetta.' },
    { icon: '👁️', title: 'Trasparenza totale', desc: 'Vedi tutto: costi, margini, tempistiche. Report periodici e comunicazione diretta.' },
    { icon: '🏢', title: 'Asset reali e concreti', desc: 'Investiamo in immobili veri, non in strumenti finanziari astratti. Il tuo patrimonio è tangibile.' },
    { icon: '🤝', title: 'Rapporto umano', desc: 'Non sei un numero. Costruiamo relazioni di fiducia, con un team sempre raggiungibile.' },
  ]

  return (
    <section id="perche" style={{ backgroundColor: C.navy, padding: 'clamp(64px, 8vw, 144px) 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background photo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
        <img src={foto2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 96px)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>— Perché sceglierci</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: C.warmwhite, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '24px' }}>
            Non ti promettiamo la luna.
          </h2>
          <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(230,220,203,0.4)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Ti promettiamo metodo, trasparenza e risultati concreti. Ecco cosa ci rende diversi.
          </p>
        </div>

        {/* Benefits grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto 64px' }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              padding: 'clamp(24px, 3vw, 40px)',
              backgroundColor: 'rgba(247,246,243,0.05)', border: '1px solid rgba(247,246,243,0.1)',
              transition: 'all 0.3s',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '20px' }}>{b.icon}</div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: C.warmwhite, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {b.title}
              </h3>
              <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(230,220,203,0.4)', fontSize: '14px', lineHeight: 1.7 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <CTAButton large />
          <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.2)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '16px' }}>
            Nessun vincolo · Nessun costo · 20 minuti
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   TRUST STRIP — Citazione + foto
   ═══════════════════════════════════════════ */
function TrustStrip() {
  return (
    <section style={{ position: 'relative', height: 'clamp(300px, 50vh, 500px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={foto7} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(14,27,42,0.7)' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '24px clamp(24px, 5vw, 80px)', maxWidth: '800px' }}>
        <img src={monogrammaBianco} alt="" style={{ width: '56px', height: '56px', margin: '0 auto 32px', opacity: 0.3 }} />
        <blockquote style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', color: C.warmwhite, fontSize: 'clamp(1.3rem, 3vw, 2.5rem)', lineHeight: 1.3, marginBottom: '24px' }}>
          "Crescita strutturata.<br />Livello dopo livello."
        </blockquote>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>— La filosofia ELEVIA</p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: 'Cos\'è il flipping immobiliare?', a: 'Compriamo immobili sotto valore, li ristrutturiamo e li rivendiamo a un prezzo superiore. Tu partecipi all\'operazione e guadagni dalla differenza.' },
    { q: 'Quanto devo investire come minimo?', a: 'L\'importo varia in base all\'operazione. Contattaci per conoscere le soglie di ingresso attuali e trovare l\'opportunità più adatta a te.' },
    { q: 'Quali sono i rischi?', a: 'Come ogni investimento, ci sono rischi legati al mercato e ai tempi. Noi li minimizziamo con analisi rigorosa, selezione accurata e controllo costante dei costi. Nessuna promessa irrealistica.' },
    { q: 'Quanto durano le operazioni?', a: 'In media tra 6 e 18 mesi, dall\'acquisizione alla rivendita. Ti teniamo aggiornato in ogni fase con report periodici.' },
    { q: 'Devo avere esperienza per investire?', a: 'Assolutamente no. Ti spieghiamo tutto nella call gratuita e ti accompagniamo in ogni fase. Il nostro lavoro è rendere l\'investimento semplice per te.' },
  ]

  return (
    <section id="faq" style={{ backgroundColor: C.warmwhite, padding: 'clamp(64px, 8vw, 144px) 0' }}>
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 4vw, 64px)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>— Domande frequenti</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: C.anthracite, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Hai domande? Abbiamo risposte.
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'clamp(36px, 4vw, 64px)' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: `1px solid rgba(43,46,52,0.1)`, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'clamp(16px, 2vw, 24px)', textAlign: 'left', backgroundColor: 'transparent',
                  border: 'none', cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, color: C.anthracite, fontSize: 'clamp(13px, 1.2vw, 16px)', paddingRight: '24px' }}>
                  {faq.q}
                </span>
                <div style={{
                  width: '32px', height: '32px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid rgba(184,164,106,0.3)`,
                  backgroundColor: openIndex === i ? C.gold : 'transparent',
                  transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  transition: 'all 0.3s',
                }}>
                  <span style={{ color: openIndex === i ? C.anthracite : C.gold, fontSize: '18px', fontWeight: 300 }}>+</span>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ padding: '0 24px 24px', fontFamily: '"Libre Baskerville", serif', color: 'rgba(43,46,52,0.5)', fontSize: '14px', lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(43,46,52,0.4)', fontSize: '15px', marginBottom: '16px' }}>Hai altre domande? Parliamone.</p>
          <CTAButton />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   CONTATTI
   ═══════════════════════════════════════════ */
function Contatti() {
  const [formData, setFormData] = useState({ nome: '', email: '', telefono: '', messaggio: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  const inputStyle = {
    width: '100%', backgroundColor: 'transparent',
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: `2px solid rgba(247,246,243,0.15)`,
    color: C.warmwhite, padding: '16px 0',
    fontFamily: '"Libre Baskerville", serif', fontSize: '15px',
    outline: 'none', transition: 'border-color 0.3s',
  }

  return (
    <section id="contatti" style={{ backgroundColor: C.navy, padding: 'clamp(64px, 8vw, 144px) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', opacity: 0.02, pointerEvents: 'none' }}>
        <img src={monogrammaBianco} alt="" style={{ width: '500px', height: '500px' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 5vw, 80px)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '24px' }}>— Inizia ora</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: C.warmwhite, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '24px' }}>
            Il primo passo?<br />
            <span style={{ color: C.gold }}>Contattaci.</span>
          </h2>
          <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(230,220,203,0.4)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Nessun vincolo, nessun costo. Una call di 20 minuti per capire se fa per te.
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center', padding: '64px 0' }}
          >
            <div style={{ width: '80px', height: '80px', backgroundColor: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '36px' }}>
              ✓
            </div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', color: C.warmwhite, fontSize: '28px', marginBottom: '12px' }}>Perfetto!</h3>
            <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(230,220,203,0.5)', fontSize: '15px' }}>Ti ricontatteremo entro 24 ore per fissare la call.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
              <input
                type="text" required placeholder="Nome e Cognome *"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                onFocus={(e) => { e.target.style.borderBottomColor = C.gold }}
                onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(247,246,243,0.15)' }}
                style={{ ...inputStyle, '::placeholder': { color: 'rgba(247,246,243,0.2)' } }}
              />
              <input
                type="email" required placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={(e) => { e.target.style.borderBottomColor = C.gold }}
                onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(247,246,243,0.15)' }}
                style={inputStyle}
              />
            </div>
            <input
              type="tel" placeholder="Telefono (facoltativo)"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              onFocus={(e) => { e.target.style.borderBottomColor = C.gold }}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(247,246,243,0.15)' }}
              style={inputStyle}
            />
            <textarea
              rows={3} placeholder="Come possiamo aiutarti?"
              value={formData.messaggio}
              onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
              onFocus={(e) => { e.target.style.borderBottomColor = C.gold }}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(247,246,243,0.15)' }}
              style={{ ...inputStyle, resize: 'none' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', paddingTop: '16px' }}>
              <button type="submit" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '16px 48px', fontSize: '12px',
                backgroundColor: C.gold, color: C.anthracite,
                fontFamily: 'Poppins, sans-serif', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }}>
                <span>Invia Richiesta</span>
                <span>→</span>
              </button>
              <span style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.2)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Risposta entro 24h</span>
            </div>
          </form>
        )}

        {/* Contact info */}
        <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid rgba(247,246,243,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {[
            { label: 'Sede', value: 'Via Paolo Sarpi 88, Brescia' },
            { label: 'Telefono', value: '+39 897 376 2004' },
            { label: 'Email', value: 'info@elevia.it' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(184,164,106,0.5)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(247,246,243,0.5)', fontSize: '14px' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ backgroundColor: '#0a1118' }}>
      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, rgba(184,164,106,0.2), transparent)` }} />

      <div style={{ padding: '48px clamp(24px, 5vw, 80px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <img src={logoBianco} alt="ELEVIA" style={{ height: '32px', opacity: 0.4 }} />
            <span style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', color: 'rgba(247,246,243,0.15)', fontSize: '14px' }}>"Elevare il capitale. Con metodo."</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <a href="#" style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.2)', fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.2)', fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
        </div>
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(247,246,243,0.05)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.1)', fontSize: '10px', letterSpacing: '0.15em' }}>
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
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <ComeFunziona />
      <PercheElevia />
      <TrustStrip />
      <FAQ />
      <Contatti />
      <Footer />
    </>
  )
}

export default App
