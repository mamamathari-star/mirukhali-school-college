import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { HistoryPreview } from '@/components/home/HistoryPreview'
import { FacilitiesPreview } from '@/components/home/FacilitiesPreview'
import { NoticesPreview } from '@/components/home/NoticesPreview'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { ContactCTA } from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HistoryPreview />
      <FacilitiesPreview />
      <NoticesPreview />
      <GalleryPreview />
      <ContactCTA />
    </>
  )
}
