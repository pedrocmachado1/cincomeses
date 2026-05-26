import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

interface Props {
  src: string
}

export default function MusicPlayer({ src }: Props) {
  const audioRef   = useRef<HTMLAudioElement>(null)
  const buttonRef  = useRef<HTMLDivElement>(null)
  const [playing,  setPlaying]  = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [volume,   setVolume]   = useState(0.6)
  const [showVol,  setShowVol]  = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible || !buttonRef.current) return
    gsap.fromTo(buttonRef.current,
      { opacity: 0, scale: 0.7, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
    )
  }, [visible])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      gsap.to(audio, {
        volume: 0,
        duration: 1,
        onComplete: () => {
          audio.pause()
          audio.volume = volume
        },
      })
    } else {
      audio.volume = 0
      audio.play()
      gsap.to(audio, { volume, duration: 1.5 })
    }

    setPlaying(!playing)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current) audioRef.current.volume = val
  }

  if (!visible) return null

  return (
    <>
      <audio ref={audioRef} src={src} loop />

      <div
        ref={buttonRef}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.5rem',
        }}
      >
        {/* Slider de volume */}
        {showVol && (
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-gold)',
            borderRadius: '24px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: '0 2px 16px #00000088',
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)' }}>🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              style={{
                width: '90px',
                accentColor: 'var(--color-gold)',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)' }}>🔊</span>
          </div>
        )}

        {/* Botões */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>

          {/* Volume */}
          <button
            onClick={() => setShowVol(!showVol)}
            title="Volume"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: showVol ? 'var(--color-gold)' : 'var(--color-surface)',
              border: '1px solid var(--color-gold)',
              color: showVol ? 'var(--color-bg)' : 'var(--color-gold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              transition: 'background 0.3s, color 0.3s',
              boxShadow: '0 2px 12px #00000066',
            }}
          >
            {volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : '🔊'}
          </button>

          {/* Play/pause */}
          <button
            onClick={toggle}
            title={playing ? 'Pausar' : 'Tocar'}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: playing ? 'var(--color-gold)' : 'var(--color-surface)',
              border: '1px solid var(--color-gold)',
              color: playing ? 'var(--color-bg)' : 'var(--color-gold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'background 0.3s, color 0.3s',
              boxShadow: playing
                ? '0 0 20px #C8871A55'
                : '0 2px 12px #00000066',
            }}
          >
            {playing ? '♪' : '♩'}
          </button>
        </div>
      </div>
    </>
  )
}