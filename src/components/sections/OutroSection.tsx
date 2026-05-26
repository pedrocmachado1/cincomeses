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
  const sectionRef = useRef<HTMLElement>(null)
  const [contador, setContador] = useState(0)
  const diasReais = calcularDias()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.outro-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: '.outro-counter', start: 'top 85%' },
        }
      )

      const obj = { val: 0 }
      gsap.to(obj, {
        val: diasReais,
        duration: 3,
        ease: 'power2.out',
        onUpdate: () => setContador(Math.floor(obj.val)),
        scrollTrigger: {
          trigger: '.outro-counter',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.fromTo('.outro-number',
        { scale: 1 },
        {
          scale: 1.04,
          duration: 0.8,
          delay: 3.2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.outro-counter',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo('.outro-word',
        { opacity: 0, y: 40, rotationX: 30 },
        {
          opacity: 1, y: 0, rotationX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.outro-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo('.outro-line',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.outro-message',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo('.outro-esp',
        { opacity: 0, scale: 0.85, y: 20 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.2,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.outro-esp',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo('.outro-sign',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.outro-sign',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to('.outro-sign-glow', {
        textShadow: '0 0 20px #C8871A99',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [diasReais])

  const palavras = ['25 de Janeiro', 'até', 'hoje']

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'transparent',
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
      {/* Luz central */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, #C8871A0d 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Contador */}
      <div className="outro-counter" style={{ position: 'relative', zIndex: 1 }}>
        <p className="outro-label" style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.65rem',
          letterSpacing: '0.5em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          opacity: 0,
        }}>
          dias juntos
        </p>
        <p className="outro-number" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(7rem, 32vw, 14rem)',
          lineHeight: 0.85,
          color: 'var(--color-sand)',
          fontStyle: 'italic',
        }}>
          {contador}
        </p>
      </div>

      {/* Título por palavras */}
      <h2 className="outro-title" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 9vw, 4rem)',
        lineHeight: 1,
        color: 'var(--color-sand)',
        fontStyle: 'italic',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.3em',
      }}>
        {palavras.map((w, i) => (
          <span key={i} className="outro-word" style={{
            display: 'inline-block',
            opacity: 0,
            color: i === 2 ? 'var(--color-gold)' : 'var(--color-sand)',
          }}>
            {w}
          </span>
        ))}
      </h2>

      {/* Mensagem */}
      <div className="outro-message" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '320px',
        borderLeft: '1px solid var(--color-gold)',
        paddingLeft: '1.25rem',
        textAlign: 'left',
      }}>
        {LOVE_MESSAGE.split('\n')
          .filter(l => l.trim() !== 'Eres tú mi baile inolvidable.')
          .map((linha, i) => (
            <p key={i} className="outro-line" style={{
              fontFamily: 'var(--font-body)',
              fontSize: linha === '' ? '0.4rem' : '0.95rem',
              color: 'var(--color-sand-muted)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              opacity: 0,
            }}>
              {linha || '·'}
            </p>
          ))}
      </div>

      {/* Frase em espanhol */}
      <p className="outro-esp" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.4rem, 6vw, 2.2rem)',
        fontStyle: 'italic',
        color: 'var(--color-gold)',
        position: 'relative',
        zIndex: 1,
        opacity: 0,
        textAlign: 'center',
        maxWidth: '300px',
        lineHeight: 1.3,
      }}>
        "Eres tú mi baile inolvidable."
      </p>

      {/* Assinatura */}
      <div className="outro-sign" style={{
        position: 'relative',
        zIndex: 1,
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '2rem',
        width: '100%',
        maxWidth: '340px',
      }}>

        {/* Ornamento topo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '30px', height: '1px', background: 'var(--color-gold)', opacity: 0.5 }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '0.6rem', opacity: 0.7 }}>❧</span>
          <div style={{ width: '30px', height: '1px', background: 'var(--color-gold)', opacity: 0.5 }} />
        </div>

        {/* Pedro */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 14vw, 5.5rem)',
          fontStyle: 'italic',
          fontWeight: 700,
          color: 'var(--color-sand)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
        }}>
          {COUPLE.person1}
        </p>

        {/* & central */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          width: '100%',
          justifyContent: 'center',
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--color-gold))',
          }} />
          <span className="outro-sign-glow" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 7vw, 2.5rem)',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            lineHeight: 1,
          }}>
            &amp;
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to left, transparent, var(--color-gold))',
          }} />
        </div>

        {/* Bruna */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 14vw, 5.5rem)',
          fontStyle: 'italic',
          fontWeight: 700,
          color: 'var(--color-sand)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
        }}>
          {COUPLE.person2}
        </p>

        {/* Data */}
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '20px', height: '1px', background: 'var(--color-gold)', opacity: 0.4 }} />
            <span style={{ color: 'var(--color-gold)', fontSize: '0.5rem', opacity: 0.6 }}>◆</span>
            <div style={{ width: '20px', height: '1px', background: 'var(--color-gold)', opacity: 0.4 }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-detail)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: 'var(--color-sand-muted)',
            textTransform: 'uppercase',
          }}>
            25 · 01 · 2026 → 25 · 05 · 2026
          </p>
        </div>
      </div>
    </section>
  )
}