import { CoverageSection } from '@/components/landing/CoverageSection'
import { PageIntro } from '@/components/layout/PageIntro'
import { PageShell } from '@/components/layout/PageShell'

export function CoveragePage() {
  return (
    <PageShell>
      <main id="contenido" tabIndex={-1}>
        <PageIntro title="Cobertura en Arequipa">
          <p>
            Hoy llevamos fibra a Socabaya y al Centro de Arequipa. Mira las zonas activas en el mapa
            o usa tu ubicación para saber si estás dentro.
          </p>
        </PageIntro>
        <CoverageSection />
      </main>
    </PageShell>
  )
}
