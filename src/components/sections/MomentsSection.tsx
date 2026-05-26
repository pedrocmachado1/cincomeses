import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { MONTHS } from '@/lib/constants'

export default function MomentsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      )

      gsap.utils.toArray<HTMLElement>('.month-block').forEach((block) => {

        const dot = block.querySelector<HTMLElement>('.timeline-dot')
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
              scrollTrigger: { trigger: block, start: 'top 80%' },
            }
          )
          gsap.to(dot, {
            boxShadow: '0 0 12px 4px #C8871A88',
            duration: 1, repeat: -1, yoyo: true,
            ease: 'power1.inOut', delay: 0.5,
          })
        }

        gsap.fromTo(block.querySelector('.month-label'),
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Polaroids entram com rotação e queda — como jogando sobre a mesa
        const photos = block.querySelectorAll<HTMLElement>('.photo-item')
        photos.forEach((photo, i) => {
          const rotate = i % 2 === 0
            ? -4 + Math.random() * 3
            :  2 + Math.random() * 3

          gsap.set(photo, { rotation: rotate })

          gsap.fromTo(photo,
            { opacity: 0, y: -40, rotation: rotate + (Math.random() > 0.5 ? 15 : -15), scale: 0.85 },
            {
              opacity: 1, y: 0, rotation: rotate, scale: 1,
              duration: 0.9,
              delay: i * 0.25,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: block,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handlePhotoTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    gsap.to(el, {
      scale: 1.06,
      rotation: 0,
      boxShadow: '0 12px 40px #00000088, 0 0 20px #C8871A44',
      duration: 0.3,
      ease: 'power2.out',
      zIndex: 10,
    })
  }

  const handlePhotoTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rotate = parseFloat(el.dataset.rotate || '0')
    gsap.to(el, {
      scale: 1,
      rotation: rotate,
      boxShadow: '3px 6px 18px #00000066',
      duration: 0.4,
      ease: 'power2.inOut',
    })
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'transparent',
        padding: '6rem 0 8rem',
        position: 'relative',
      }}
    >
      <div style={{ padding: '0 2rem', marginBottom: '4rem' }}>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
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
        </h2>
      </div>

      <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', padding: '0 2rem' }}>

        <div className="timeline-line" style={{
          position: 'absolute',
          left: '2.75rem',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, var(--color-gold), var(--color-wine))',
          transformOrigin: 'top center',
        }} />

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
            <div style={{ flexShrink: 0, paddingTop: '0.25rem' }}>
              <div className="timeline-dot" style={{
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

            <div style={{ flex: 1 }}>
              <div className="month-label" style={{ marginBottom: '1.5rem', opacity: 0 }}>
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

              {/* Grid de polaroids */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: entry.images.length === 1 ? '1fr' : '1fr 1fr',
                gap: '1.2rem',
                padding: '0.5rem',
              }}>
                {entry.images.map((img, j) => {
                  const rotate = j % 2 === 0
                    ? -3 + Math.random() * 2
                    :  2 + Math.random() * 2

                  return (
                    <div
                      key={img}
                      className="photo-item"
                      data-rotate={rotate}
                      onTouchStart={handlePhotoTouch}
                      onTouchEnd={handlePhotoTouchEnd}
                      style={{
                        gridColumn: entry.images.length === 3 && j === 0 ? '1 / -1' : 'auto',
                        opacity: 0,
                        position: 'relative',
                        zIndex: 1,
                        cursor: 'pointer',

                        // Efeito polaroid
                        background: '#f5f0e8',
                        padding: '8px 8px 28px 8px',
                        boxShadow: '3px 6px 18px #00000066, 1px 2px 4px #00000044',
                        borderRadius: '2px',
                      }}
                    >
                      {/* Foto */}
                      <div style={{
                        width: '100%',
                        aspectRatio: entry.images.length === 3 && j === 0 ? '4/3' : '3/4',
                        overflow: 'hidden',
                        background: '#ddd',
                      }}>
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

                      {/* Legenda polaroid */}
                      <p style={{
                        fontFamily: 'var(--font-detail)',
                        fontSize: '0.6rem',
                        color: '#5a4a3a',
                        textAlign: 'center',
                        marginTop: '6px',
                        letterSpacing: '0.05em',
                        fontStyle: 'italic',
                      }}>
                        {entry.month} · 2026
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}