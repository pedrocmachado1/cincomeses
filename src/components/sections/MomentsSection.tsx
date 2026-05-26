import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { MONTHS } from '@/lib/constants'

export default function MomentsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Cada bloco de mês entra da direita com fade
      gsap.utils.toArray<HTMLElement>('.month-block').forEach((block) => {
        gsap.fromTo(block,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Label do mês sobe com delay
      gsap.utils.toArray<HTMLElement>('.month-label').forEach((label) => {
        gsap.fromTo(label,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Fotos entram em stagger dentro de cada bloco
      gsap.utils.toArray<HTMLElement>('.month-block').forEach((block) => {
        const photos = block.querySelectorAll<HTMLElement>('.photo-item')
        gsap.fromTo(photos,
          { opacity: 0, scale: 0.92, y: 24 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Linha vertical do timeline cresce no scroll
      gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-bg)',
        padding: '8rem 0 10rem',
        position: 'relative',
      }}
    >
      {/* Cabeçalho */}
      <div style={{ padding: '0 2rem', marginBottom: '5rem', maxWidth: '480px', margin: '0 auto 5rem' }}>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Janeiro → Maio · 2026
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 12vw, 5rem)',
          lineHeight: 0.9,
          color: 'var(--color-sand)',
          fontStyle: 'italic',
        }}>
          Cinco<br />meses
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Linha vertical */}
        <div
          className="timeline-line"
          style={{
            position: 'absolute',
            left: '2.75rem',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, var(--color-gold), var(--color-wine))',
            transformOrigin: 'top center',
          }}
        />

        {MONTHS.map((entry, i) => (
          <div
            key={entry.month}
            className="month-block"
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginBottom: i < MONTHS.length - 1 ? '5rem' : 0,
              position: 'relative',
            }}
          >
            {/* Bolinha da timeline */}
            <div style={{ flexShrink: 0, paddingTop: '0.25rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--color-gold)',
                border: '2px solid var(--color-bg)',
                outline: '1px solid var(--color-gold)',
                position: 'relative',
                zIndex: 2,
              }} />
            </div>

            {/* Conteúdo */}
            <div style={{ flex: 1, paddingBottom: '1rem' }}>
              {/* Mês + label */}
              <div className="month-label" style={{ marginBottom: '1.25rem' }}>
                <p style={{
                  fontFamily: 'var(--font-detail)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  {entry.month}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  color: 'var(--color-sand)',
                  fontStyle: 'italic',
                }}>
                  {entry.label}
                </p>
              </div>

              {/* Fotos */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: entry.images.length === 1
                  ? '1fr'
                  : entry.images.length === 2
                  ? '1fr 1fr'
                  : '1fr 1fr',
                gap: '0.5rem',
              }}>
                {entry.images.map((img, j) => (
                  <div
                    key={img}
                    className="photo-item"
                    style={{
                      // Se for 3 fotos, a primeira ocupa linha inteira
                      gridColumn: entry.images.length === 3 && j === 0 ? '1 / -1' : 'auto',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      aspectRatio: entry.images.length === 3 && j === 0 ? '16/9' : '3/4',
                      background: 'var(--color-surface)',
                      border: '1px solid #2a1a0e',
                    }}
                  >
                    <img
                      src={`/${img}`}
                      alt={`${entry.month} - foto ${j + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}