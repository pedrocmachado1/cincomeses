// Cursor customizado — visível apenas em desktop

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={cursorRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '16px', height: '16px',
      borderRadius: '50%',
      background: 'var(--color-accent)',
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'difference',
      transition: 'transform 0.05s linear',
    }} />
  )
}
