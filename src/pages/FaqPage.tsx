import { FaqSection } from '@/components/landing/FaqSection'
import { PageIntro } from '@/components/layout/PageIntro'
import { PageShell } from '@/components/layout/PageShell'
import { getWhatsAppHref } from '@/config/site'

export function FaqPage() {
  return (
    <PageShell segment="hogar">
      <main id="contenido" tabIndex={-1}>
        <PageIntro title="Preguntas frecuentes">
          <p>
            Cobertura, velocidad, instalación y pagos. ¿No encuentras tu respuesta?{' '}
            <a href={getWhatsAppHref('hogar')} target="_blank" rel="noopener noreferrer">
              Escríbenos por WhatsApp
            </a>
            .
          </p>
        </PageIntro>
        <FaqSection />
      </main>
    </PageShell>
  )
}
