import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

function Candle({ x, bottom, size }: { x: string; bottom: string; size: number }) {
  const flameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!flameRef.current) return

    // Chama piscando de forma orgânica
    gsap.to(flameRef.current, {
      scaleX: 0.8,
      scaleY: 1.15,
      x: 1.5,
      opacity: 0.85,
      duration: 0.12,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // Tremida aleatória
    gsap.to(flameRef.current, {
      x: -2,
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: Math.random(),
    })

    // Brilho ao redor pulsando
    gsap.to(flameRef.current, {
      boxShadow: `0 0 ${size * 3}px ${size}px #C8871A55`,
      duration: 0.8 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [size])

  return (
    <div style={{
      position: 'fixed',
      bottom,
      left: x,
      zIndex: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
    }}>
      {/* Chama */}
      <div
        ref={flameRef}
        style={{
          width: `${size}px`,
          height: `${size * 1.8}px`,
          background: 'radial-gradient(ellipse at 50% 80%, #fff8e1 0%, #E8A830 40%, #C8871A 70%, transparent 100%)',
          borderRadius: '50% 50% 30% 30%',
          transformOrigin: 'bottom center',
          filter: 'blur(0.5px)',
          boxShadow: `0 0 ${size * 2}px ${size}px #C8871A44`,
        }}
      />
      {/* Pavio */}
      <div style={{
        width: '1px',
        height: `${size * 0.6}px`,
        background: '#3a2010',
        marginTop: '-2px',
      }} />
      {/* Vela */}
      <div style={{
        width: `${size * 1.4}px`,
        height: `${size * 3}px`,
        background: 'linear-gradient(to bottom, #f5e6c8 0%, #c9b99a 60%, #a08060 100%)',
        borderRadius: '2px 2px 3px 3px',
        boxShadow: `inset -2px 0 4px #00000033`,
      }} />
      {/* Cera derretendo */}
      <div style={{
        width: `${size * 1.8}px`,
        height: `${size * 0.6}px`,
        background: '#f5e6c8',
        borderRadius: '50%',
        marginTop: '-4px',
        opacity: 0.6,
      }} />
    </div>
  )
}

export default function Candles() {
  return (
    <>
      <Candle x="4vw"  bottom="0"    size={7} />
      <Candle x="10vw" bottom="0"    size={5} />
      <Candle x="82vw" bottom="0"    size={6} />
      <Candle x="90vw" bottom="0"    size={8} />
      <Candle x="94vw" bottom="0"    size={4} />
    </>
  )
}