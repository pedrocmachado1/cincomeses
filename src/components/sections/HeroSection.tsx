import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroSphere from '@/components/three/HeroSphere'
import { gsap } from '@/lib/gsap'
import { COUPLE } from '@/lib/constants'

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-tag',
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3 }
      )
      gsap.fromTo('.hero-name',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-amp',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1, delay: 1, ease: 'back.out(1.7)' }
      )
      gsap.fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.6 }
      )
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

      {/* Luz de abajur de boteco */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120%',
        height: '60%',
        background: 'radial-gradient(ellipse at 50% 0%, #C8871A18 0%, #8B1A1A08 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Névoa de fundo */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to top, #1c0f0588 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Esfera 3D */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.7, zIndex: 0 }}>
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
      }}>
        <p className="hero-tag" style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.7rem',
          letterSpacing: '0.4em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          opacity: 0,
        }}>
          Janeiro → Maio · 2026
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          lineHeight: 0.88,
          color: 'var(--color-sand)',
        }}>
          <span className="hero-name" style={{
            display: 'block',
            fontSize: 'clamp(4.5rem, 20vw, 10rem)',
            fontStyle: 'italic',
            opacity: 0,
          }}>
            {COUPLE.person1}
          </span>
          <span className="hero-amp" style={{
            display: 'block',
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            color: 'var(--color-gold)',
            fontStyle: 'normal',
            margin: '0.2em 0',
            opacity: 0,
          }}>
            &amp;
          </span>
          <span className="hero-name" style={{
            display: 'block',
            fontSize: 'clamp(4.5rem, 20vw, 10rem)',
            fontStyle: 'italic',
            opacity: 0,
          }}>
            {COUPLE.person2}
          </span>
        </h1>
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
      }}>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          role para baixo
        </p>
        <div style={{
          width: '1px',
          height: '3rem',
          background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
          margin: '0 auto',
        }} />
      </div>
    </section>
  )
}