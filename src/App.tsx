import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import TracksSection from '@/components/sections/TracksSection'
import MomentsSection from '@/components/sections/MomentsSection'
import OutroSection from '@/components/sections/OutroSection'
import MusicPlayer from '@/components/ui/MusicPlayer'
import Petals from '@/components/ui/Petals'
import Divider from '@/components/ui/Divider'
import Candles from '@/components/ui/Candles'
import Smoke from '@/components/ui/Smoke'
import Stars from '@/components/ui/Stars'

export default function App() {
  return (
    <main>
      {/* Camadas de fundo — ordem importa */}
      <Stars />
      <Petals />
      <Smoke />
      <Candles />
      <MusicPlayer src="/inoperante.mp3" />

      <HeroSection />
      <Divider />
      <StatsSection />
      <Divider flip />
      <MomentsSection />
      <Divider />
      <TracksSection />
      <Divider flip />
      <OutroSection />
    </main>
  )
}