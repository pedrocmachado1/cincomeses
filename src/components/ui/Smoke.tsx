import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const TOTAL = 12

export default function Smoke() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = Array.from(container.querySelectorAll<HTMLElement>('.smoke-particle'))

    particles.forEach((p) => {
      const startX  = 5 + Math.random() * 90
      const size    = 40 + Math.random() * 80
      const duration = 8 + Math.random() * 10
      const delay   = Math.random() * 8
      const driftX  = (Math.random() - 0.5) * 80

      p.style.left   = `${startX}vw`
      p.style.width  = `${size}px`
      p.style.height = `${size}px`

      gsap.fromTo(p,
        { y: 0, x: 0, opacity: 0, scale: 0.3 },
        {
          y: `-${200 + Math.random() * 300}px`,
          x: driftX,
          opacity: 0,
          scale: 2.5 + Math.random(),
          duration,
          delay,
          ease: 'power1.out',
          repeat: -1,
          repeatDelay: Math.random() * 3,
          onStart: function() {
            gsap.to(p, { opacity: 0.06, duration: duration * 0.3, ease: 'power1.in' })
          },
          onRepeat: function() {
            p.style.left = `${5 + Math.random() * 90}vw`
            gsap.to(p, { opacity: 0.06, duration: duration * 0.3, ease: 'power1.in' })
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
        bottom: 0,
        left: 0,
        right: 0,
        height: '40vh',
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div
          key={i}
          className="smoke-particle"
          style={{
            position: 'absolute',
            bottom: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #c9b99a 0%, transparent 70%)',
            opacity: 0,
            filter: 'blur(8px)',
          }}
        />
      ))}
    </div>
  )
}