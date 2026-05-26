import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const STATS = [
  { value: '4',   label: 'meses juntos'          },
  { value: '120', label: 'dias'                  },
  { value: '∞',   label: 'coincidências'         },
  { value: '1',   label: 'sambas'                },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-surface style={{ padding: '10rem 2rem', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '4rem',
        }}>
          Em números
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 2rem' }}>
          {STATS.map((s) => (
            <div key={s.label} className="stat-item" style={{ opacity: 0 }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 15vw, 6rem)',
                color: 'var(--color-sand)',
                lineHeight: 1,
                fontStyle: 'italic',
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: 'var(--font-detail)',
                color: 'var(--color-gold)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}