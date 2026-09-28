import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { ScrollToTopOnNavigate } from '@/components/ui/ScrollToTop'
import { ComplaintsBookPage } from '@/pages/ComplaintsBookPage'
import { CoveragePage } from '@/pages/CoveragePage'
import { EmpresasPage } from '@/pages/EmpresasPage'
import { FaqPage } from '@/pages/FaqPage'
import { HomePage } from '@/pages/HomePage'
import { PaymentsPage } from '@/pages/PaymentsPage'
import { TermsPage } from '@/pages/TermsPage'

function RootLayout() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Outlet />
    </>
  )
}

// Router de datos: habilita `viewTransition` en los enlaces entre vistas.
const router = createBrowserRouter([
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
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
