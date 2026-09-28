import { lazy, useState } from 'react'
import { MapPinIcon } from '@/components/icons/Icons'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { checkCoverage, coverageZones } from '@/data/content'
import { DeferredMap } from '@/components/ui/DeferredMap'
import '@/styles/landing.css'

const CoverageMap = lazy(() =>
  import('@/components/landing/CoverageMap').then((module) => ({ default: module.CoverageMap })),
)

export function CoverageSection() {
  const [address, setAddress] = useState('')
  const [result, setResult] = useState<ReturnType<typeof checkCoverage> | null>(null)
  // Cada consulta vuelve a montar el resultado para que su entrada confirme la búsqueda.
  const [checkCount, setCheckCount] = useState(0)

  function handleCheck() {
    setResult(checkCoverage(address))
    setCheckCount((count) => count + 1)
  }

  function getWhatsAppCoverageHref() {
    return getWhatsAppHref(
      'hogar',
      siteConfig.whatsappMessages.cobertura(address || 'mi dirección'),
    )
  }

  return (
    <section id="cobertura" className="section coverage-section" aria-label="Consulta de cobertura">
      <div className="container">
        <div className="coverage-panel float-card">
          <div className="coverage-search">
            <label htmlFor="coverage-address" className="coverage-search-label">
              <MapPinIcon />
              Consulta tu dirección o zona
            </label>
            <div className="coverage-search-row">
              <input
                id="coverage-address"
                type="text"
                placeholder="Ej: Jr. Lima 120, Arequipa"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleCheck()
                }}
              />
              <button type="button" className="btn btn-primary" onClick={handleCheck}>
                Consultar
              </button>
            </div>

            {result && (
              <div
                key={checkCount}
                className={`coverage-result coverage-result--${result.result}`}
                role="status"
              >
                {result.result === 'empty' && (
                  <p>Ingresa tu dirección en Arequipa para consultar cobertura.</p>
                )}
                {result.result === 'in-zone' && (
                  <p>
                    <strong>¡Buenas noticias!</strong> Tu consulta coincide con nuestra zona
                    activa de {result.zone}. Escríbenos para confirmar la instalación en tu
                    dirección exacta.
                  </p>
                )}
                {result.result === 'maybe' && (
                  <p>
                    Estás en Arequipa pero fuera de nuestras zonas confirmadas. Escríbenos por
                    WhatsApp para verificar disponibilidad.
                  </p>
                )}
                {result.result === 'out-of-zone' && (
                  <p>
                    Por ahora no tenemos cobertura confirmada en esa zona. Déjanos tu consulta y te
                    avisamos cuando expandamos.
                  </p>
                )}
                {result.result !== 'empty' && (
                  <a
                    href={getWhatsAppCoverageHref()}
                    className="btn btn-secondary coverage-wa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar por WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="coverage-map-wrap">
            <DeferredMap placeholderClassName="coverage-map">
              <CoverageMap />
            </DeferredMap>
          </div>

          <ul className="coverage-legend" aria-label="Distritos con cobertura">
            {coverageZones.map((zone) => (
              <li key={zone.id}>
                <span className="coverage-legend-swatch" style={{ background: zone.color }} />
                {zone.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
