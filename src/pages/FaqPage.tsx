import { FaqSection } from '@/components/landing/FaqSection'
import { PageIntro } from '@/components/layout/PageIntro'
import { PageShell } from '@/components/layout/PageShell'

export function FaqPage() {
  return (
    <PageShell>
      <main id="contenido" tabIndex={-1}>
        <PageIntro title="Preguntas frecuentes">
          <p>Lo que más nos preguntan sobre el servicio, la cobertura, la instalación y los pagos.</p>
        </PageIntro>
        <FaqSection />
      </main>
    </PageShell>
  )
}
