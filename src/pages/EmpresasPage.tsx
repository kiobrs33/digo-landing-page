import { PageShell } from '@/components/layout/PageShell'
import { EmpresasPageContent } from '@/components/empresas/EmpresasPageContent'

export function EmpresasPage() {
  return (
    <PageShell segment="empresas">
      <EmpresasPageContent />
    </PageShell>
  )
}
