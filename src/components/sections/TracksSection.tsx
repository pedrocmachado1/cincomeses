import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const TRACKS = [
  { position: '01', title: 'Porradão',           artist: 'Tiee'           },
  { position: '02', title: 'Baile Inolvidable',  artist: 'Bad Bunny'      },
  { position: '03', title: 'Inoperante',         artist: 'Tiee'           },
  { position: '04', title: 'Nas Nuvens',         artist: 'Jeito Moleque'  },
  { position: '05', title: 'Lembrei de Nós',     artist: 'João Gomes'     },
]

export default function TracksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Título
      gsap.fromTo('.tracks-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: '.tracks-title', start: 'top 85%' },
        }
      )

      // Cards entram em cascata vindo de baixo com leve rotação
      gsap.utils.toArray<HTMLElement>('.track-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, rotationX: 20 },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '6rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        <p className="tracks-title" style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
          opacity: 0,
        }}>
          A playlist
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {TRACKS.map((track, i) => (
            <div
              key={track.position}
              className="track-card"
              style={{
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: i % 2 === 0 ? 'var(--color-surface)' : 'transparent',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: i % 2 === 0 ? '#3a2010' : 'transparent',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-detail)',
                fontSize: '0.7rem',
                color: 'var(--color-gold)',
                minWidth: '2rem',
                opacity: 0.5,
              }}>
                {track.position}
              </span>

              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-sand)',
                  fontStyle: 'italic',
                }}>
                  {track.title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-detail)',
                  fontSize: '0.65rem',
                  color: 'var(--color-sand-muted)',
                  letterSpacing: '0.1em',
                  marginTop: '0.2rem',
                }}>
                  {track.artist}
                </p>
              </div>

              {/* Nota musical decorativa */}
              <span style={{
                fontFamily: 'var(--font-detail)',
                fontSize: '0.9rem',
                color: 'var(--color-gold)',
                opacity: 0.4,
              }}>
                ♪
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}