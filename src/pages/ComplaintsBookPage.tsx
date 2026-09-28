import { PageShell } from '@/components/layout/PageShell'
import { ComplaintsBookPageContent } from '@/components/legal/LegalPages'

export function ComplaintsBookPage() {
  return (
    <PageShell segment="hogar" title="Libro de reclamaciones — Digo Telecom">
      <ComplaintsBookPageContent />
    </PageShell>
  )
}
