import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const TOTAL = 80

export default function Petals() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const petals = Array.from(container.querySelectorAll<HTMLElement>('.petal'))

    petals.forEach((petal) => {
      const startX  = Math.random() * 100
      const duration = 7 + Math.random() * 10
      const delay    = Math.random() * 12
      const size     = 7 + Math.random() * 12
      const swayX    = 50 + Math.random() * 80
      const direction = Math.random() > 0.5 ? 1 : -1

      petal.style.left   = `${startX}vw`
      petal.style.width  = `${size}px`
      petal.style.height = `${size * (0.6 + Math.random() * 0.6)}px`

      gsap.fromTo(petal,
        { y: -60, x: 0, rotation: Math.random() * 180, opacity: 0 },
        {
          y: '110vh',
          x: swayX * direction,
          rotation: `+=${200 + Math.random() * 300}`,
          opacity: 0.7,
          duration,
          delay,
          ease: 'none',
          repeat: -1,
          repeatDelay: Math.random() * 3,
          onRepeat: function() {
            // Reposiciona horizontalmente a cada ciclo
            gsap.set(petal, { x: 0, left: `${Math.random() * 100}vw` })
          },
        }
      )
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: TOTAL }).map((_, i) => {
        const type = i % 4

        return (
          <div
            key={i}
            className="petal"
            style={{
              position: 'absolute',
              top: 0,
              opacity: 0,
              // Formas variadas
              borderRadius: type === 0
                ? '50% 0 50% 0'      // pétala clássica
                : type === 1
                ? '50%'              // círculo
                : type === 2
                ? '50% 50% 0 50%'   // pétala invertida
                : '30% 70% 70% 30%', // orgânica
              background: type === 0
                ? 'var(--color-gold)'
                : type === 1
                ? 'var(--color-sand)'
                : type === 2
                ? 'var(--color-wine)'
                : 'var(--color-gold-light)',
              boxShadow: '0 1px 3px #00000033',
            }}
          />
        )
      })}
    </div>
  )
}