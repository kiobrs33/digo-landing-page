import { lazy } from 'react'
import { DeferredMap } from '@/components/ui/DeferredMap'
import { corporateCoverageCities } from '@/data/content'
import '@/styles/empresas.css'

const CorporateCoverageMap = lazy(() =>
  import('@/components/empresas/CorporateCoverageMap').then((module) => ({
    default: module.CorporateCoverageMap,
  })),
)

export function CorporateCoverageSection() {
  return (
    <section id="cobertura-empresas" className="section empresas-coverage-section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Cobertura corporativa</h2>
          <p className="section-lead">
            Por el momento atendemos soluciones dedicadas en Arequipa, Moquegua y Mollendo.
          </p>
        </header>

        <div className="empresas-coverage-panel float-card">
          <div className="empresas-coverage-map-wrap">
            <DeferredMap placeholderClassName="empresas-coverage-map">
              <CorporateCoverageMap />
            </DeferredMap>
          </div>

          <ul className="empresas-coverage-legend" aria-label="Ciudades con cobertura corporativa">
            {corporateCoverageCities.map((city) => (
              <li key={city.id}>
                <span className="empresas-coverage-legend-swatch" />
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
