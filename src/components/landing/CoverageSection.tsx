import { lazy, useState, type CSSProperties } from 'react'
import { ExpandIcon, LocateIcon, MapPinIcon, WhatsAppIcon } from '@/components/icons/Icons'
import { CoverageAnswer } from '@/components/landing/CoverageAnswer'
import type { CoverageFocus } from '@/components/landing/CoverageMap'
import { DeferredMap } from '@/components/ui/DeferredMap'
import { siteConfig } from '@/config/site'
import { coverageZones } from '@/data/content'
import { useCoverageLocate } from '@/hooks/useCoverageLocate'
import '@/styles/landing.css'

const CoverageMap = lazy(() =>
  import('@/components/landing/CoverageMap').then((module) => ({ default: module.CoverageMap })),
)

const zonesHint =
  coverageZones.length === 1
    ? 'Toca la zona para acercarte en el mapa.'
    : `${coverageZones.length} zonas de Arequipa. Toca una para acercarte en el mapa.`

export function CoverageSection() {
  const [focus, setFocus] = useState<CoverageFocus>({ kind: 'all' })
  const [hoverZoneId, setHoverZoneId] = useState<string | null>(null)
  const { answer, answerCount, locating, locate, whatsappHref } = useCoverageLocate((at) =>
    setFocus({ kind: 'point', at }),
  )

  const selectedZoneId = focus.kind === 'zone' ? focus.id : null
  const selectedZone = coverageZones.find((zone) => zone.id === selectedZoneId)
  const userPosition = answer?.source === 'location' ? answer.at : null

  function selectZone(id: string) {
    setFocus({ kind: 'zone', id })
  }

  return (
    <section id="cobertura" className="section coverage-section" aria-labelledby="coverage-title">
      <div className="container coverage-layout">
        <div className="coverage-panel">
          <h2 id="coverage-title" className="coverage-panel-title">
            Zonas con fibra {siteConfig.brand.shortName}
          </h2>
          <p className="coverage-panel-hint">{zonesHint}</p>

          <div className="coverage-zones-block">
            <ul className="coverage-zones" aria-label="Zonas con cobertura">
              <li>
                <button
                  type="button"
                  className="coverage-zone"
                  aria-pressed={focus.kind === 'all'}
                  onClick={() => setFocus({ kind: 'all' })}
                >
                  <ExpandIcon />
                  Todas
                </button>
              </li>
              {coverageZones.map((zone) => (
                <li key={zone.id}>
                  <button
                    type="button"
                    className="coverage-zone"
                    aria-pressed={selectedZoneId === zone.id}
                    onClick={() => selectZone(zone.id)}
                    onMouseEnter={() => setHoverZoneId(zone.id)}
                    onMouseLeave={() => setHoverZoneId(null)}
                    onFocus={() => setHoverZoneId(zone.id)}
                    onBlur={() => setHoverZoneId(null)}
                  >
                    <span
                      className="coverage-zone-swatch"
                      style={{ '--zone-color': zone.color } as CSSProperties}
                      aria-hidden="true"
                    />
                    {zone.name}
                  </button>
                </li>
              ))}
            </ul>
            {selectedZone?.detail && (
              <p className="coverage-zone-note">
                <span
                  className="coverage-zone-swatch"
                  style={{ '--zone-color': selectedZone.color } as CSSProperties}
                  aria-hidden="true"
                />
                {selectedZone.detail}
              </p>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary coverage-locate"
            onClick={locate}
            disabled={locating}
            aria-busy={locating}
          >
            <LocateIcon />
            {locating ? 'Buscando tu ubicación…' : 'Usar mi ubicación'}
          </button>

          <div aria-live="polite">
            {answer && <CoverageAnswer key={answerCount} answer={answer} />}
          </div>

          <a
            href={whatsappHref}
            aria-label="Enviar mi dirección por WhatsApp"
            className="coverage-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Enviar mi dirección
          </a>
        </div>

        <div className="coverage-map-wrap">
          <p className="coverage-map-chip" aria-hidden="true">
            <MapPinIcon />
            Zonas de cobertura
          </p>
          <DeferredMap placeholderClassName="coverage-map">
            <CoverageMap
              focus={focus}
              activeZoneId={hoverZoneId ?? selectedZoneId}
              userPosition={userPosition}
              onSelectZone={selectZone}
            />
          </DeferredMap>
        </div>
      </div>
    </section>
  )
}

