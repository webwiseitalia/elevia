import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Eye, Building2, Handshake, Mail, Phone, MapPin, ArrowUpRight, Linkedin, Instagram } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
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

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

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
      padding: scrolled ? '14px 0' : '24px 0',
      backgroundColor: scrolled ? 'rgba(14,27,42,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      transition: 'all 0.5s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(32px, 5vw, 80px)' }}>
        <a href="#">
          <img src={logoBeige} alt="ELEVIA" style={{ height: scrolled ? '52px' : '72px', transition: 'height 0.5s' }} />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }} className="nav-desktop">
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
   HERO — Frecce-aeroplanini dal basso, distorte,
   si compongono dall'alto verso il basso
   ═══════════════════════════════════════════ */

function Hero() {
  const [phase, setPhase] = useState(0)
  const svgRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),    // freccia TOP decolla dal basso
      setTimeout(() => setPhase(2), 1000),   // freccia CENTRO decolla dal basso
      setTimeout(() => setPhase(3), 1600),   // freccia BOTTOM decolla dal basso
      setTimeout(() => setPhase(4), 2600),   // logo diventa gold
      setTimeout(() => setPhase(5), 3200),   // tagline + scroll
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Griglia animata di sfondo
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const lineCount = 15
      for (let i = 0; i < lineCount; i++) {
        const y = (canvas.height / lineCount) * i + Math.sin(time + i * 0.5) * 20
        const alpha = 0.02 + Math.sin(time + i) * 0.01
        ctx.strokeStyle = `rgba(184, 164, 106, ${Math.max(0, alpha)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      const vlineCount = 10
      for (let i = 0; i < vlineCount; i++) {
        const x = (canvas.width / vlineCount) * i + Math.cos(time + i * 0.7) * 15
        const alpha = 0.015 + Math.cos(time + i) * 0.008
        ctx.strokeStyle = `rgba(184, 164, 106, ${Math.max(0, alpha)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Animazione GSAP: frecce salgono dal basso come aerei,
  // inizialmente distorte (skew + scaleY compresso + rotazione),
  // si raddrizzano atterrando nella posizione del logo dall'alto verso il basso
  useEffect(() => {
    if (!svgRef.current) return

    const arrowBot = svgRef.current.querySelector('#arrow-bot')
    const arrowMid = svgRef.current.querySelector('#arrow-mid')
    const arrowTop = svgRef.current.querySelector('#arrow-top')

    if (!arrowBot || !arrowMid || !arrowTop) return

    // Stato iniziale: tutte fuori schermo in basso, distorte come in prospettiva di volo
    gsap.set(arrowTop, {
      opacity: 0, y: 900, x: 300,
      scaleX: 0.3, scaleY: 0.6,
      skewX: -25, skewY: 10,
      rotation: -15,
      transformOrigin: 'center center',
    })
    gsap.set(arrowMid, {
      opacity: 0, y: 900, x: 200,
      scaleX: 0.3, scaleY: 0.6,
      skewX: -25, skewY: 10,
      rotation: -15,
      transformOrigin: 'center center',
    })
    gsap.set(arrowBot, {
      opacity: 0, y: 900, x: 100,
      scaleX: 0.3, scaleY: 0.6,
      skewX: -25, skewY: 10,
      rotation: -15,
      transformOrigin: 'center center',
    })

    const tl = gsap.timeline({ delay: 0.4 })

    // Funzione per creare l'animazione di volo per ogni freccia
    const flyIn = (arrow, delay) => {
      // Fase 1: appare e inizia a salire, ancora distorta
      tl.to(arrow, {
        opacity: 1,
        y: 400,
        x: 150,
        scaleX: 0.5, scaleY: 0.7,
        skewX: -15, skewY: 6,
        rotation: -8,
        duration: 0.3,
        ease: 'power1.in',
      }, delay)

      // Fase 2: sale e inizia a raddrizzarsi
      tl.to(arrow, {
        y: 100,
        x: 50,
        scaleX: 0.8, scaleY: 0.9,
        skewX: -5, skewY: 2,
        rotation: -3,
        duration: 0.25,
        ease: 'none',
      }, delay + 0.3)

      // Fase 3: atterra nella posizione finale, completamente raddrizzata
      tl.to(arrow, {
        y: 0,
        x: 0,
        scaleX: 1, scaleY: 1,
        skewX: 0, skewY: 0,
        rotation: 0,
        duration: 0.35,
        ease: 'power2.out',
      }, delay + 0.55)
    }

    // 1) Freccia TOP — prima a decollare, atterra in cima
    flyIn(arrowTop, 0)

    // 2) Freccia CENTRO — seconda
    flyIn(arrowMid, 0.5)

    // 3) Freccia BOTTOM — terza, completa il logo
    flyIn(arrowBot, 1.0)

    // Logo completo → transizione gold + glow
    tl.to([arrowTop, arrowMid, arrowBot], {
      fill: C.gold,
      filter: 'drop-shadow(0 0 25px rgba(184,164,106,0.7))',
      duration: 0.5,
      ease: 'power2.inOut',
    }, 2.0)

    return () => tl.kill()
  }, [])

  return (
    <section id="hero" style={{
      height: '100vh', minHeight: '700px', backgroundColor: C.navy,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      zIndex: 2,
    }}>
      {/* Canvas griglia animata */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      {/* Glow radiale che appare quando il logo è completo */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: phase >= 4 ? '800px' : '0px',
        height: phase >= 4 ? '800px' : '0px',
        background: 'radial-gradient(circle, rgba(184,164,106,0.1) 0%, rgba(184,164,106,0.03) 40%, transparent 70%)',
        transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
      }} />

      {/* Logo container */}
      <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* SVG Monogramma */}
        <svg ref={svgRef} viewBox="0 0 1080 1080" style={{
          width: 'clamp(240px, 34vw, 440px)',
          height: 'clamp(240px, 34vw, 440px)',
          overflow: 'visible',
          display: 'block',
        }}>
          {/* Freccia TOP */}
          <path id="arrow-top" fill={C.warmwhite} d="M453.77,130.98l363.7,139.11c4.21,1.61,6.98,5.64,6.98,10.15v166.73c0,7.61-7.63,12.87-14.74,10.15l-360.91-138.04c-3.55-1.36-7.55-.76-10.55,1.57l-165.18,128.47c-7.14,5.55-17.53.46-17.53-8.57v-162.46c0-3.35,1.55-6.52,4.19-8.57l174.32-135.58c5.61-4.36,13.09-5.47,19.72-2.94Z"/>
          {/* Freccia CENTRO */}
          <path id="arrow-mid" fill={C.warmwhite} d="M448.8,375.67l223.98,85.67c4.21,1.61,6.98,5.64,6.98,10.15v166.73c0,7.61-7.63,12.87-14.74,10.15l-216.22-82.7c-3.55-1.36-7.55-.76-10.55,1.57l-165.18,128.47c-7.14,5.55-17.53.46-17.53-8.57v-162.46c0-3.35,1.55-6.52,4.19-8.57l178.52-138.85c3-2.33,7-2.93,10.55-1.57Z"/>
          {/* Freccia BOTTOM */}
          <path id="arrow-bot" fill={C.warmwhite} d="M448.8,621.6l368.67,141.01c4.21,1.61,6.98,5.64,6.98,10.15v166.73c0,7.61-7.63,12.87-14.74,10.15l-360.91-138.04c-3.55-1.36-7.55-.76-10.55,1.57l-165.18,128.47c-7.14,5.55-17.53.46-17.53-8.57v-162.46c0-3.35,1.55-6.52,4.19-8.57l178.52-138.85c3-2.33,7-2.93,10.55-1.57Z"/>
        </svg>

        {/* Linee decorative */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
          <div style={{
            width: phase >= 4 ? 'clamp(40px, 8vw, 100px)' : '0px',
            height: '1px', backgroundColor: C.gold,
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }} />
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: C.gold,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }} />
          <div style={{
            width: phase >= 4 ? 'clamp(40px, 8vw, 100px)' : '0px',
            height: '1px', backgroundColor: C.gold,
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
          color: C.beige, fontSize: 'clamp(15px, 1.8vw, 22px)',
          letterSpacing: '0.2em', marginTop: '28px',
          opacity: phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          Elevare il capitale. Con metodo.
        </p>

        {/* CTA */}
        <div style={{
          marginTop: '36px',
          opacity: phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
        }}>
          <CTAButton large />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
        opacity: phase >= 5 ? 1 : 0,
        transition: 'opacity 1s ease 0.5s',
      }}>
        <span style={{
          fontFamily: 'Poppins, sans-serif', color: 'rgba(230,220,203,0.3)',
          fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
        }}>Scorri</span>
        <div style={{
          width: '1px', height: '50px',
          background: `linear-gradient(to bottom, ${C.gold}, transparent)`,
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SOCIAL PROOF — Numeri
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
    const section = sectionRef.current
    if (!section) return
    const items = section.querySelectorAll('.sp-item')
    const divider = section.querySelector('.sp-divider')

    gsap.set(items, { opacity: 0, y: 40, scale: 0.9 })
    if (divider) gsap.set(divider, { scaleX: 0 })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' },
    })

    tl.to(items, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power3.out' })
    if (divider) tl.to(divider, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.3')

    return () => { tl.kill(); ScrollTrigger.getAll().forEach(st => { if (st.trigger === section) st.kill() }) }
  }, [])

  return (
    <section ref={sectionRef} style={{
      backgroundColor: C.anthracite, padding: 'clamp(48px, 5vw, 80px) 0', position: 'relative', overflow: 'hidden',
    }}>
      {/* Diagonal lines texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(184,164,106,0.3) 40px, rgba(184,164,106,0.3) 41px)`,
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(184,164,106,0.06) 0%, transparent 70%)',
      }} />
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i} className="sp-item">
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
  const sectionRef = useRef(null)
  const steps = [
    { num: '01', title: 'Parliamone', desc: 'Fissiamo una call gratuita di 20 minuti. Ti spieghiamo tutto: come funziona, cosa facciamo, quanto puoi aspettarti.', image: foto1, cta: 'È gratis, senza impegno' },
    { num: '02', title: 'Scegli l\'operazione', desc: 'Ti presentiamo le operazioni disponibili con tutti i numeri: costi, margini previsti, tempistiche e analisi del rischio.', image: foto4, cta: 'Dati reali, zero fumo' },
    { num: '03', title: 'Guadagna con noi', desc: 'Partecipi all\'operazione e segui tutto in tempo reale. Report periodici, comunicazione diretta, massima trasparenza.', image: foto3, cta: 'Sempre aggiornato' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Header animation
      const header = section.querySelector('.cf-header')
      if (header) {
        gsap.from(header.children, {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      // Step rows - alternate slide directions + parallax on images
      const rows = section.querySelectorAll('.step-row')
      rows.forEach((row, i) => {
        const imgWrap = row.querySelector('.step-img')
        const content = row.querySelector('.step-content')
        const img = row.querySelector('.step-img img')
        const dir = i % 2 === 0 ? -1 : 1

        if (imgWrap) {
          gsap.from(imgWrap, {
            opacity: 0, x: dir * 60, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none reverse' },
          })
        }
        if (content) {
          gsap.from(content.children, {
            opacity: 0, x: -dir * 35, stagger: 0.06, duration: 0.45, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none reverse' },
          })
        }
        // Parallax on image
        if (img) {
          gsap.fromTo(img, { yPercent: -8 }, {
            yPercent: 8, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        }
      })

      // CTA at bottom
      const cta = section.querySelector('.cf-cta')
      if (cta) {
        gsap.from(cta, {
          opacity: 0, y: 30, duration: 0.45, ease: 'power3.out',
          scrollTrigger: { trigger: cta, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="come-funziona" className="section-cf" style={{
      backgroundColor: C.warmwhite, padding: 'clamp(64px, 8vw, 144px) 0 clamp(100px, 10vw, 180px)', position: 'relative', overflow: 'hidden',
      clipPath: 'polygon(0 0, 100% 0, 100% 94%, 0 100%)',
      marginBottom: '-50px', zIndex: 3,
    }}>
      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(43,46,52,0.08) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
      <div style={{ position: 'absolute', right: '-128px', top: '80px', opacity: 0.03, pointerEvents: 'none' }}>
        <img src={monogrammaBeige} alt="" style={{ width: '400px', height: '400px' }} />
      </div>

      <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div className="cf-header" style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 96px)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>— Come funziona</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: C.anthracite, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '24px' }}>
            Tre passi. Nessuna sorpresa.
          </h2>
          <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(43,46,52,0.5)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Il nostro processo è semplice e trasparente. Ecco come funziona, dall'inizio alla fine.
          </p>
        </div>

        {/* Steps */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 5vw, 80px)' }}>
          {steps.map((step, i) => (
            <div key={i} className="step-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'center' }}>
              {/* Image */}
              <div className="step-img" style={{ position: 'relative', overflow: 'hidden', order: i % 2 !== 0 ? 2 : 0 }}>
                <img src={step.image} alt={step.title} style={{ width: '100%', height: 'clamp(250px, 30vw, 400px)', objectFit: 'cover', display: 'block', willChange: 'transform' }} />
                <div style={{
                  position: 'absolute', top: '16px', left: '16px', width: '48px', height: '48px',
                  backgroundColor: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: C.anthracite, fontSize: '14px',
                }}>
                  {step.num}
                </div>
              </div>
              {/* Content */}
              <div className="step-content">
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
        <div className="cf-cta" style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 96px)' }}>
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
  const sectionRef = useRef(null)
  const benefits = [
    { icon: ShieldCheck, title: 'Rischio controllato', desc: 'Non inseguiamo rendimenti fuori scala. Ogni operazione è analizzata, calcolata e protetta.' },
    { icon: Eye, title: 'Trasparenza totale', desc: 'Vedi tutto: costi, margini, tempistiche. Report periodici e comunicazione diretta.' },
    { icon: Building2, title: 'Asset reali e concreti', desc: 'Investiamo in immobili veri, non in strumenti finanziari astratti. Il tuo patrimonio è tangibile.' },
    { icon: Handshake, title: 'Rapporto umano', desc: 'Non sei un numero. Costruiamo relazioni di fiducia, con un team sempre raggiungibile.' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Header stagger
      const header = section.querySelector('.pe-header')
      if (header) {
        gsap.from(header.children, {
          opacity: 0, y: 35, stagger: 0.08, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      // Benefit cards - staggered from bottom with scale
      const cards = section.querySelectorAll('.pe-card')
      gsap.from(cards, {
        opacity: 0, y: 50, scale: 0.9, stagger: 0.06, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      // Hover effect on cards with GSAP
      cards.forEach(card => {
        const icon = card.querySelector('.pe-icon')
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -8, borderColor: 'rgba(184,164,106,0.4)', backgroundColor: 'rgba(247,246,243,0.1)', duration: 0.25, ease: 'power2.out' })
          if (icon) gsap.to(icon, { scale: 1.15, rotation: 5, duration: 0.25, ease: 'back.out(2)' })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, borderColor: 'rgba(247,246,243,0.1)', backgroundColor: 'rgba(247,246,243,0.05)', duration: 0.25, ease: 'power2.out' })
          if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: 0.2, ease: 'power2.out' })
        })
      })

      // Background parallax on the photo
      const bgImg = section.querySelector('.pe-bg-img')
      if (bgImg) {
        gsap.fromTo(bgImg, { yPercent: -10 }, {
          yPercent: 10, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      // CTA fade up
      const cta = section.querySelector('.pe-cta')
      if (cta) {
        gsap.from(cta, {
          opacity: 0, y: 20, duration: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: cta, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="perche" className="section-pe" style={{
      backgroundColor: C.navy, padding: 'clamp(160px, 16vw, 280px) 0 clamp(160px, 16vw, 280px)', position: 'relative', overflow: 'hidden',
      marginTop: '-200px', paddingTop: 'clamp(260px, 22vw, 420px)',
      marginBottom: '-80px', zIndex: 1,
    }}>
      {/* Background photo */}
      <div style={{ position: 'absolute', top: '-20%', left: 0, right: 0, bottom: '-20%', opacity: 0.08 }}>
        <img className="pe-bg-img" src={foto2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }} />
      </div>
      {/* Cross-hatch texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(184,164,106,0.03) 80px, rgba(184,164,106,0.03) 81px), repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(184,164,106,0.03) 80px, rgba(184,164,106,0.03) 81px)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div className="pe-header" style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 96px)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>— Perché sceglierci</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: C.warmwhite, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '24px' }}>
            Non ti promettiamo la luna.
          </h2>
          <p style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(230,220,203,0.4)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Ti promettiamo metodo, trasparenza e risultati concreti. Ecco cosa ci rende diversi.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="pe-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', margin: '0 auto 64px' }}>
          {benefits.map((b, i) => (
            <div key={i} className="pe-card" style={{
              padding: 'clamp(24px, 3vw, 40px)',
              backgroundColor: 'rgba(247,246,243,0.05)', border: '1px solid rgba(247,246,243,0.1)',
              cursor: 'default',
            }}>
              <div className="pe-icon" style={{ marginBottom: '20px', display: 'inline-block' }}><b.icon size={32} color={C.gold} strokeWidth={1.5} /></div>
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
        <div className="pe-cta" style={{ textAlign: 'center' }}>
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
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Parallax background image
      const bgImg = section.querySelector('.ts-bg')
      if (bgImg) {
        gsap.fromTo(bgImg, { yPercent: -3 }, {
          yPercent: 3, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      // Quote content reveal
      const content = section.querySelector('.ts-content')
      if (content) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
        tl.from(content.querySelector('.ts-mono'), { opacity: 0, scale: 0.5, rotation: -180, duration: 0.55, ease: 'back.out(1.5)' })
        tl.from(content.querySelector('blockquote'), { opacity: 0, y: 30, duration: 0.4, ease: 'power3.out' }, '-=0.2')
        tl.from(content.querySelector('.ts-author'), { opacity: 0, y: 15, duration: 0.3, ease: 'power3.out' }, '-=0.15')
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-ts" style={{
      position: 'relative', minHeight: 'clamp(600px, 80vh, 900px)', overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginTop: '-120px', marginBottom: '-120px', zIndex: 0,
    }}>
      <img className="ts-bg" src={foto7} alt="" style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', objectFit: 'cover', willChange: 'transform' }} />
      <div style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', backgroundColor: 'rgba(14,27,42,0.7)' }} />

      <div className="ts-content" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '24px clamp(24px, 5vw, 80px)', maxWidth: '1000px', margin: '0 auto' }}>
        <img className="ts-mono" src={monogrammaBianco} alt="" style={{ width: '56px', height: '56px', margin: '0 auto 32px', opacity: 0.3 }} />
        <blockquote style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', color: C.warmwhite, fontSize: 'clamp(1.3rem, 3vw, 2.5rem)', lineHeight: 1.3, marginBottom: '24px' }}>
          "Crescita strutturata.<br />Livello dopo livello."
        </blockquote>
        <p className="ts-author" style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>— La filosofia ELEVIA</p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */
function FAQ() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: 'Cos\'è il flipping immobiliare?', a: 'Compriamo immobili sotto valore, li ristrutturiamo e li rivendiamo a un prezzo superiore. Tu partecipi all\'operazione e guadagni dalla differenza.' },
    { q: 'Quanto devo investire come minimo?', a: 'L\'importo varia in base all\'operazione. Contattaci per conoscere le soglie di ingresso attuali e trovare l\'opportunità più adatta a te.' },
    { q: 'Quali sono i rischi?', a: 'Come ogni investimento, ci sono rischi legati al mercato e ai tempi. Noi li minimizziamo con analisi rigorosa, selezione accurata e controllo costante dei costi. Nessuna promessa irrealistica.' },
    { q: 'Quanto durano le operazioni?', a: 'In media tra 6 e 18 mesi, dall\'acquisizione alla rivendita. Ti teniamo aggiornato in ogni fase con report periodici.' },
    { q: 'Devo avere esperienza per investire?', a: 'Assolutamente no. Ti spieghiamo tutto nella call gratuita e ti accompagniamo in ogni fase. Il nostro lavoro è rendere l\'investimento semplice per te.' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Header
      const header = section.querySelector('.faq-header')
      if (header) {
        gsap.from(header.children, {
          opacity: 0, y: 35, stagger: 0.08, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      // Accordion items - staggered cascade from left
      const items = section.querySelectorAll('.faq-item')
      gsap.from(items, {
        opacity: 0, x: -40, stagger: 0.05, duration: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: items[0], start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      // CTA
      const cta = section.querySelector('.faq-cta')
      if (cta) {
        gsap.from(cta, {
          opacity: 0, y: 20, duration: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: cta, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="section-faq" style={{
      backgroundColor: C.warmwhite, padding: 'clamp(100px, 10vw, 180px) 0 clamp(100px, 10vw, 180px)', position: 'relative', overflow: 'hidden',
      clipPath: 'polygon(0 6%, 100% 0, 100% 94%, 0 100%)',
      marginBottom: '-50px', zIndex: 2,
    }}>
      {/* Horizontal lines texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(43,46,52,0.04) 59px, rgba(43,46,52,0.04) 60px)`,
      }} />
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div className="faq-header" style={{ textAlign: 'center', marginBottom: 'clamp(36px, 4vw, 64px)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: C.gold, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>— Domande frequenti</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: C.anthracite, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Hai domande? Abbiamo risposte.
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'clamp(36px, 4vw, 64px)' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item" style={{ border: `1px solid rgba(43,46,52,0.1)`, overflow: 'hidden' }}>
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
                    transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
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
        <div className="faq-cta" style={{ textAlign: 'center' }}>
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
  const sectionRef = useRef(null)
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

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Header reveal
      const header = section.querySelector('.ct-header')
      if (header) {
        gsap.from(header.children, {
          opacity: 0, y: 40, stagger: 0.08, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      // Form fields cascade reveal
      const formFields = section.querySelectorAll('.ct-field')
      if (formFields.length) {
        gsap.from(formFields, {
          opacity: 0, y: 25, stagger: 0.05, duration: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: formFields[0], start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      // Corner glow animation
      const glow = section.querySelector('.ct-glow')
      if (glow) {
        gsap.fromTo(glow, { scale: 0.8, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        })
      }

      // Contact info items
      const infoItems = section.querySelectorAll('.ct-info')
      if (infoItems.length) {
        gsap.from(infoItems, {
          opacity: 0, y: 20, stagger: 0.06, duration: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: infoItems[0], start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contatti" className="section-ct" style={{
      backgroundColor: C.navy, padding: 'clamp(100px, 10vw, 180px) 0 clamp(80px, 8vw, 144px)', position: 'relative', overflow: 'hidden',
      clipPath: 'polygon(0 0, 100% 6%, 100% 100%, 0 100%)',
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(247,246,243,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(247,246,243,0.02) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />
      {/* Corner glow */}
      <div className="ct-glow" style={{
        position: 'absolute', top: '-200px', left: '-200px', width: '600px', height: '600px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(184,164,106,0.05) 0%, transparent 60%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div className="ct-header" style={{ textAlign: 'center', marginBottom: 'clamp(48px, 5vw, 80px)' }}>
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
            <div className="ct-field" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
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
              className="ct-field"
              type="tel" placeholder="Telefono (facoltativo)"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              onFocus={(e) => { e.target.style.borderBottomColor = C.gold }}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(247,246,243,0.15)' }}
              style={inputStyle}
            />
            <textarea
              className="ct-field"
              rows={3} placeholder="Come possiamo aiutarti?"
              value={formData.messaggio}
              onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
              onFocus={(e) => { e.target.style.borderBottomColor = C.gold }}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(247,246,243,0.15)' }}
              style={{ ...inputStyle, resize: 'none' }}
            />
            <div className="ct-field" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', paddingTop: '16px' }}>
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
            <div key={i} className="ct-info">
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
  const footerRef = useRef(null)
  const footerLinks = [
    { label: 'Come Funziona', href: '#come-funziona' },
    { label: 'Perché ELEVIA', href: '#perche' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contatti', href: '#contatti' },
  ]

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const ctx = gsap.context(() => {
      // Gold line expand
      const line = footer.querySelector('.ft-line')
      if (line) {
        gsap.from(line, {
          scaleX: 0, duration: 0.6, ease: 'power2.inOut',
          scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }

      // Logo + claim
      const top = footer.querySelector('.ft-top')
      if (top) {
        gsap.from(top.children, {
          opacity: 0, y: 20, stagger: 0.08, duration: 0.45, ease: 'power3.out',
          scrollTrigger: { trigger: top, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }

      // Grid columns
      const cols = footer.querySelectorAll('.ft-col')
      if (cols.length) {
        gsap.from(cols, {
          opacity: 0, y: 25, stagger: 0.08, duration: 0.45, ease: 'power3.out',
          scrollTrigger: { trigger: cols[0], start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }

      // Bottom bar
      const bottom = footer.querySelector('.ft-bottom')
      if (bottom) {
        gsap.from(bottom, {
          opacity: 0, duration: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: bottom, start: 'top 95%', toggleActions: 'play none none reverse' },
        })
      }
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} style={{ backgroundColor: '#0a1118', position: 'relative', overflow: 'hidden' }}>
      {/* Linea oro in alto */}
      <div className="ft-line" style={{ height: '1px', background: `linear-gradient(90deg, transparent, rgba(184,164,106,0.3), transparent)`, transformOrigin: 'center' }} />

      {/* Contenuto principale */}
      <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)', position: 'relative', zIndex: 1 }}>

        {/* Top section: Logo + Claim */}
        <div className="ft-top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '56px' }}>
          <img src={logoBianco} alt="ELEVIA" style={{ height: '40px', opacity: 0.6, marginBottom: '20px' }} />
          <p style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', color: 'rgba(184,164,106,0.4)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '500px', lineHeight: 1.6 }}>
            "Elevare il capitale. Con metodo."
          </p>
        </div>

        {/* Grid: Navigazione | Contatti | Seguici */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(32px, 4vw, 64px)', maxWidth: '1200px', margin: '0 auto 56px' }}>

          {/* Colonna 1: Navigazione */}
          <div className="ft-col">
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: C.gold, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Navigazione
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {footerLinks.map((link, i) => (
                <a key={i} href={link.href} style={{ fontFamily: '"Libre Baskerville", serif', color: 'rgba(247,246,243,0.4)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.color = C.gold}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,246,243,0.4)'}
                >
                  {link.label}
                  <ArrowUpRight size={12} style={{ opacity: 0.4 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonna 2: Contatti */}
          <div className="ft-col">
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: C.gold, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Contatti
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="tel:+398973762004" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: '"Libre Baskerville", serif', color: 'rgba(247,246,243,0.4)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = C.gold}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,246,243,0.4)'}
              >
                <Phone size={15} strokeWidth={1.5} style={{ color: C.gold, opacity: 0.6 }} />
                +39 897 376 2004
              </a>
              <a href="mailto:info@elevia.it" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: '"Libre Baskerville", serif', color: 'rgba(247,246,243,0.4)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = C.gold}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,246,243,0.4)'}
              >
                <Mail size={15} strokeWidth={1.5} style={{ color: C.gold, opacity: 0.6 }} />
                info@elevia.it
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: '"Libre Baskerville", serif', color: 'rgba(247,246,243,0.4)', fontSize: '14px' }}>
                <MapPin size={15} strokeWidth={1.5} style={{ color: C.gold, opacity: 0.6, flexShrink: 0, marginTop: '3px' }} />
                Milano, Italia
              </div>
            </div>
          </div>

          {/* Colonna 3: Social + CTA */}
          <div className="ft-col">
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: C.gold, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Seguici
            </h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
              {[
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(184,164,106,0.2)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.backgroundColor = 'rgba(184,164,106,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,164,106,0.2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <Icon size={18} color={C.gold} strokeWidth={1.5} style={{ opacity: 0.6 }} />
                </a>
              ))}
            </div>
            <a href="#contatti" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: `1px solid ${C.gold}`, transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.color = C.navy }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.gold }}
            >
              Parla con noi
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(247,246,243,0.06), transparent)', marginBottom: '28px' }} />

        {/* Bottom bar */}
        <div className="ft-bottom" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.15)', fontSize: '10px', letterSpacing: '0.15em' }}>
            © {new Date().getFullYear()} ELEVIA Investimenti Immobiliari — Tutti i diritti riservati
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.2)', fontSize: '10px', letterSpacing: '0.12em', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(247,246,243,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,246,243,0.2)'}
            >Privacy Policy</a>
            <a href="#" style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.2)', fontSize: '10px', letterSpacing: '0.12em', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(247,246,243,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,246,243,0.2)'}
            >Cookie Policy</a>
            <a href="#" style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(247,246,243,0.2)', fontSize: '10px', letterSpacing: '0.12em', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(247,246,243,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,246,243,0.2)'}
            >Termini e Condizioni</a>
          </div>
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
