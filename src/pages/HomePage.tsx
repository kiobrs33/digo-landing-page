import { ContactSection } from '@/components/landing/ContactSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { PlansSection } from '@/components/landing/PlansSection'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { TrustSection } from '@/components/landing/TrustSection'
import { PageShell } from '@/components/layout/PageShell'

export function HomePage() {
  return (
    <PageShell>
      <main id="contenido" tabIndex={-1}>
        <HeroSection />
        <PlansSection />
        <ProcessSection />
        <TrustSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </PageShell>
  )
}
