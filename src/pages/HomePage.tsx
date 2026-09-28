import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { ContactSection } from '@/components/landing/ContactSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { PlansSection } from '@/components/landing/PlansSection'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { PageShell } from '@/components/layout/PageShell'

export function HomePage() {
  return (
    <PageShell segment="hogar" title="Digo Telecom — Fibra óptica en Arequipa">
      <main id="contenido" tabIndex={-1}>
        <HeroSection />
        <PlansSection />
        <BenefitsSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </PageShell>
  )
}
