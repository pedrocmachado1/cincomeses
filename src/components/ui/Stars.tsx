import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const TOTAL = 200
export default function Stars() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const stars = Array.from(container.querySelectorAll<HTMLElement>('.star'))

    stars.forEach((star) => {
      const x       = Math.random() * 100
      const y       = Math.random() * 100
      const size    = 1 + Math.random() * 2.5
      const delay   = Math.random() * 4
      const duration = 1.5 + Math.random() * 3

      star.style.left   = `${x}vw`
      star.style.top    = `${y}vh`
      star.style.width  = `${size}px`
      star.style.height = `${size}px`

      // Cintilação contínua
      gsap.fromTo(star,
        { opacity: 0.1, scale: 0.6 },
        {
          opacity: 0.7 + Math.random() * 0.3,
          scale: 1,
          duration,
          delay,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }
      )

      // Micro-drift — estrela flutua levemente
      gsap.to(star, {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 3,
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            position: 'absolute',
            borderRadius: '50%',
            opacity: 0,
            background: i % 5 === 0
              ? '#E8A830'   // ouro claro
              : i % 5 === 1
              ? '#F5E6C8'   // areia
              : i % 5 === 2
              ? '#C8871A'   // ouro velho
              : i % 5 === 3
              ? '#ffffff'   // branco puro
              : '#c9b99a',  // areia muted
            boxShadow: i % 3 === 0
              ? '0 0 4px 1px #C8871A88'
              : 'none',
          }}
        />
      ))}
    </div>
  )
}