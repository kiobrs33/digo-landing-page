import { PageShell } from '@/components/layout/PageShell'
import { EmpresasPageContent } from '@/components/empresas/EmpresasPageContent'

export function EmpresasPage() {
  return (
    <PageShell
      segment="empresas"
      title="Internet dedicado para empresas en Arequipa — Digo Telecom"
    >
      <EmpresasPageContent />
    </PageShell>
  )
}
