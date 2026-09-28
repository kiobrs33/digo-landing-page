import { CoverageSection } from '@/components/landing/CoverageSection'
import { PageIntro } from '@/components/layout/PageIntro'
import { PageShell } from '@/components/layout/PageShell'

export function CoveragePage() {
  return (
    <PageShell segment="hogar" title="Cobertura de fibra en Arequipa — Digo Telecom">
      <main id="contenido" tabIndex={-1}>
        <PageIntro title="Cobertura en Arequipa">
          <p>
            Hoy llevamos fibra a Socabaya y al Centro de Arequipa. Busca tu dirección o mira las
            zonas activas en el mapa.
          </p>
        </PageIntro>
        <CoverageSection />
      </main>
    </PageShell>
  )
}
