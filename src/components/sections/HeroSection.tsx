import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroSphere from '@/components/three/HeroSphere'
import { gsap } from '@/lib/gsap'
import { COUPLE } from '@/lib/constants'

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Linha decorativa cresce primeiro
      gsap.fromTo('.hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, delay: 0.2, ease: 'power2.out', transformOrigin: 'center' }
      )

      // Tag sobe
      gsap.fromTo('.hero-tag',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
      )

      // Nome 1 — entra da esquerda letra por letra via clip
      gsap.fromTo('.hero-name-1',
        { opacity: 0, x: -60, skewX: -8 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.2, delay: 0.8, ease: 'power4.out' }
      )

      // Ampersand — escala do zero com bounce
      gsap.fromTo('.hero-amp',
        { opacity: 0, scale: 0, rotation: -20 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, delay: 1.4, ease: 'back.out(2)' }
      )

      // Nome 2 — entra da direita
      gsap.fromTo('.hero-name-2',
        { opacity: 0, x: 60, skewX: 8 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.2, delay: 1.7, ease: 'power4.out' }
      )

      // Linha inferior cresce
      gsap.fromTo('.hero-line-bottom',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, delay: 2.2, ease: 'power2.out', transformOrigin: 'center' }
      )

      // Subtítulo
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.5 }
      )

      // Scroll hint pisca
      gsap.fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 3 }
      )

      // Scroll hint pulsa em loop
      gsap.to('.hero-scroll-dot', {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 3.5,
      })

    }, textRef)
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      height: '100svh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'transparent',
    }}>

      {/* Luz de abajur */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120%',
        height: '60%',
        background: 'radial-gradient(ellipse at 50% 0%, #C8871A22 0%, #8B1A1A08 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Névoa */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to top, #1c0f0599 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Esfera 3D */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <HeroSphere />
        </Canvas>
      </div>

      {/* Texto */}
      <div ref={textRef} style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '2rem',
        width: '100%',
      }}>

        {/* Linha topo */}
        <div className="hero-line" style={{
          width: '60px',
          height: '1px',
          background: 'var(--color-gold)',
          margin: '0 auto 1.5rem',
          transformOrigin: 'center',
        }} />

        {/* Tag */}
        <p className="hero-tag" style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.65rem',
          letterSpacing: '0.45em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          opacity: 0,
        }}>
          Janeiro → Maio · 2026
        </p>

        {/* Nomes */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          lineHeight: 0.88,
          color: 'var(--color-sand)',
        }}>
          <span className="hero-name-1" style={{
            display: 'block',
            fontSize: 'clamp(4.5rem, 22vw, 10rem)',
            fontStyle: 'italic',
            opacity: 0,
          }}>
            {COUPLE.person1}
          </span>

          <span className="hero-amp" style={{
            display: 'block',
            fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
            color: 'var(--color-gold)',
            fontStyle: 'normal',
            margin: '0.3em 0',
            opacity: 0,
          }}>
            &amp;
          </span>

          <span className="hero-name-2" style={{
            display: 'block',
            fontSize: 'clamp(4.5rem, 22vw, 10rem)',
            fontStyle: 'italic',
            opacity: 0,
          }}>
            {COUPLE.person2}
          </span>
        </h1>

        {/* Linha inferior */}
        <div className="hero-line-bottom" style={{
          width: '60px',
          height: '1px',
          background: 'var(--color-gold)',
          margin: '2rem auto 1rem',
          transformOrigin: 'center',
        }} />

        {/* Subtítulo */}
        <p className="hero-sub" style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: 'var(--color-sand-muted)',
          textTransform: 'uppercase',
          opacity: 0,
        }}>
          Quatro meses juntos
        </p>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll" style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
        }}>
          role para baixo
        </p>
        <div className="hero-scroll-dot" style={{
          width: '1px',
          height: '2.5rem',
          background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
        }} />
      </div>
    </section>
  )
}