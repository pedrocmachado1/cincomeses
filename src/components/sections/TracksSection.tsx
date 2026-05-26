const TRACKS = [
  { position: '01', title: 'Porradão',            artist: 'Tiee'          },
  { position: '02', title: 'Baile Inolvidable',   artist: 'Bad Bunny'     },
  { position: '03', title: 'Inoperante',          artist: 'Tiee'          },
  { position: '04', title: 'Nas Nuvens',          artist: 'Jeito Moleque' },
  { position: '05', title: 'Lembrei de Nós',      artist: 'João Gomes'    },
]

export default function TracksSection() {
  return (
    <section data-surface style={{ padding: '10rem 2rem', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-detail)',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '3rem',
        }}>
          A playlist
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TRACKS.map((track) => (
            <div key={track.position} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.1rem 0',
              borderBottom: '1px solid #2a1a0e',
            }}>
              <span style={{
                fontFamily: 'var(--font-detail)',
                fontSize: '0.75rem',
                color: 'var(--color-gold)',
                minWidth: '2rem',
                opacity: 0.6,
              }}>
                {track.position}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-sand)',
                  fontStyle: 'italic',
                }}>
                  {track.title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-detail)',
                  fontSize: '0.7rem',
                  color: 'var(--color-sand-muted)',
                  letterSpacing: '0.1em',
                  marginTop: '0.2rem',
                }}>
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}