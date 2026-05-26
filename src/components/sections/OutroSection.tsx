import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { COUPLE, LOVE_MESSAGE } from '@/lib/constants'

function calcularDias() {
  const inicio = new Date('2026-01-25')
  const hoje   = new Date()
  const diff   = hoje.getTime() - inicio.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export default function OutroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [contador, setContador] = useState(0)
  const diasReais   = calcularDias()

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Título entra no scroll
      gsap.fromTo('.outro-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.outro-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Contador anima de 0 até o valor real
      const obj = { val: 0 }
      gsap.to(obj, {
        val: diasReais,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => setContador(Math.floor(obj.val)),
        scrollTrigger: {
          trigger: '.outro-counter',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Mensagem entra letra por letra (por linha)
      gsap.fromTo('.outro-line',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.outro-message',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Assinatura
      gsap.fromTo('.outro-sign',
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.outro-sign',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [diasReais])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-bg)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem',
        gap: '4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ornamento de fundo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, #2C181055 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Contador de dias */}
      <div className="outro-counter" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          dias juntos
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 28vw, 14rem)',
          lineHeight: 0.85,
          color: 'var(--color-sand)',
          fontStyle: 'italic',
        }}>
          {contador}
        </p>
      </div>

      {/* Título */}
      <h2
        className="outro-title"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 11vw, 5rem)',
          lineHeight: 0.9,
          color: 'var(--color-sand)',
          fontStyle: 'italic',
          position: 'relative',
          zIndex: 1,
          opacity: 0,
        }}
      >
        25 de Janeiro<br />
        <span style={{ color: 'var(--color-gold)' }}>até hoje</span>
      </h2>

      {/* Mensagem */}
      <div
        className="outro-message"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '340px',
          borderLeft: '1px solid var(--color-gold)',
          paddingLeft: '1.25rem',
          textAlign: 'left',
        }}
      >
        {LOVE_MESSAGE.split('\n').map((linha, i) => (
          <p
            key={i}
            className="outro-line"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: linha === '' ? '0.5rem' : '1rem',
              color: linha === '' ? 'transparent' : 'var(--color-sand-muted)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              opacity: 0,
            }}
          >
            {linha || '·'}
          </p>
        ))}
      </div>

      {/* Assinatura */}
      <div
        className="outro-sign"
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{
          width: '40px',
          height: '1px',
          background: 'var(--color-gold)',
        }} />
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 8vw, 3rem)',
          fontStyle: 'italic',
          color: 'var(--color-gold)',
        }}>
          {COUPLE.person1} &amp; {COUPLE.person2}
        </p>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.65rem',
          letterSpacing: '0.35em',
          color: 'var(--color-sand-muted)',
          textTransform: 'uppercase',
        }}>
          25 · 01 · 2026 → 25 · 05 · 2026
        </p>
      </div>
    </section>
  )
}