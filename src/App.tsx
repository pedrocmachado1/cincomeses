import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import TracksSection from '@/components/sections/TracksSection'
import MomentsSection from '@/components/sections/MomentsSection'
import OutroSection from '@/components/sections/OutroSection'
import Cursor from '@/components/ui/Cursor'
import MusicPlayer from '@/components/ui/MusicPlayer'

export default function App() {
  return (
    <main>
      <Cursor />
      <MusicPlayer src="/inoperante.mp3" />
      <HeroSection />
      <StatsSection />
      <MomentsSection />
      <TracksSection />
      <OutroSection />
    </main>
  )
}