interface Props {
  flip?: boolean
}

export default function Divider({ flip = false }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '3rem 2rem',
      background: 'transparent',
      transform: flip ? 'scaleX(-1)' : 'none',
    }}>
      {/* Linha esquerda */}
      <div style={{
        flex: 1,
        maxWidth: '120px',
        height: '1px',
        background: 'linear-gradient(to right, transparent, var(--color-gold))',
      }} />

      {/* Ornamento central */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--color-gold)',
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
      }}>
        <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>◆</span>
        <span>♪</span>
        <span style={{ fontSize: '0.8rem' }}>❧</span>
        <span>♪</span>
        <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>◆</span>
      </div>

      {/* Linha direita */}
      <div style={{
        flex: 1,
        maxWidth: '120px',
        height: '1px',
        background: 'linear-gradient(to left, transparent, var(--color-gold))',
      }} />
    </div>
  )
}