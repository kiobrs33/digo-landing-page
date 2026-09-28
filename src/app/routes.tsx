import type { RouteObject } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { ComplaintsBookPage } from '@/pages/ComplaintsBookPage'
import { CoveragePage } from '@/pages/CoveragePage'
import { EmpresasPage } from '@/pages/EmpresasPage'
import { FaqPage } from '@/pages/FaqPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PaymentsPage } from '@/pages/PaymentsPage'
import { TermsPage } from '@/pages/TermsPage'

/**
 * Rutas del sitio. Las usan el navegador (router de datos) y el pre-renderizado de build
 * (router en memoria). Toda ruta nueva debe tener su entrada en `src/config/seo.ts`.
 */
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/cobertura', element: <CoveragePage /> },
      { path: '/preguntas-frecuentes', element: <FaqPage /> },
      { path: '/medios-de-pago', element: <PaymentsPage /> },
      { path: '/empresas', element: <EmpresasPage /> },
      { path: '/libro-de-reclamaciones', element: <ComplaintsBookPage /> },
      { path: '/terminos-y-condiciones', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
