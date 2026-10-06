import { latLngBounds, type LatLngBoundsExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import {
  CircleMarker,
  MapContainer,
  Polygon,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet'
import { coverageZones } from '@/data/content'
import 'leaflet/dist/leaflet.css'
import '@/styles/landing.css'

/** Qué encuadra el mapa: todas las zonas, una zona o la ubicación del visitante. */
export type CoverageFocus = { kind: 'all' } | { kind: 'zone'; id: string } | { kind: 'point'; at: [number, number] }

const allBounds = latLngBounds(coverageZones.flatMap((zone) => zone.rings.flat()))
const zoneBounds = Object.fromEntries(
  coverageZones.map((zone) => [zone.id, latLngBounds(zone.rings.flat())]),
) as Record<string, LatLngBoundsExpression>

const zoneNames = new Intl.ListFormat('es', { type: 'conjunction' }).format(
  coverageZones.map((zone) => zone.name),
)

const PADDING: [number, number] = [36, 36]

/** Mueve la cámara cuando cambia el foco; sin animación si se pidió movimiento reducido. */
function FocusController({ focus }: { focus: CoverageFocus }) {
  const map = useMap()

  useEffect(() => {
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const options = { padding: PADDING, animate, duration: 0.7 }
    if (focus.kind === 'all') map.flyToBounds(allBounds, options)
    else if (focus.kind === 'zone') map.flyToBounds(zoneBounds[focus.id], options)
    else map.flyTo(focus.at, 15, { animate, duration: 0.7 })
  }, [map, focus])

  return null
}

/** Desde este zoom caben los nombres de todas las zonas sin montarse. */
const LABELS_MIN_ZOOM = 10

/** Avisa el zoom actual (para mostrar u ocultar los nombres de las zonas). */
function ZoomWatcher({ onZoom }: { onZoom: (zoom: number) => void }) {
  const map = useMapEvents({ zoomend: () => onZoom(map.getZoom()) })
  useEffect(() => onZoom(map.getZoom()), [map, onZoom])
  return null
}

type CoverageMapProps = {
  focus: CoverageFocus
  /** Zona resaltada (elegida o bajo el puntero en el panel). */
  activeZoneId: string | null
  userPosition: [number, number] | null
  onSelectZone: (id: string) => void
}

export function CoverageMap({ focus, activeZoneId, userPosition, onSelectZone }: CoverageMapProps) {
  const [zoom, setZoom] = useState<number | null>(null)
  // De lejos (mapa chico o todas las zonas) solo se nombra la zona resaltada.
  const allLabels = zoom !== null && zoom >= LABELS_MIN_ZOOM

  return (
    <MapContainer
      bounds={allBounds}
      boundsOptions={{ padding: PADDING }}
      scrollWheelZoom={false}
      zoomControl={false}
      className="coverage-map"
      ref={(map) => {
        map
          ?.getContainer()
          .setAttribute(
            'aria-label',
            `Mapa de cobertura: ${zoneNames}`,
          )
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" zoomInTitle="Acercar" zoomOutTitle="Alejar" />
      <FocusController focus={focus} />
      <ZoomWatcher onZoom={setZoom} />

      {coverageZones.map((zone) => {
        const active = activeZoneId === zone.id
        return (
          <Polygon
            key={zone.id}
            positions={zone.rings}
            eventHandlers={{ click: () => onSelectZone(zone.id) }}
            pathOptions={{
              color: zone.color,
              weight: active ? 3.5 : 2.5,
              opacity: 1,
              fillColor: zone.color,
              fillOpacity: active ? 0.32 : 0.18,
            }}
          >
            {/* Nombre en el centro de la zona, como etiqueta del mapa (si cabe o si está resaltada). */}
            {(allLabels || active) && (
              <Tooltip permanent direction="center" className="coverage-map-label" opacity={1}>
                {zone.name}
              </Tooltip>
            )}
          </Polygon>
        )
      })}

      {userPosition && (
        <CircleMarker
          center={userPosition}
          radius={9}
          pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#041c7b', fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -10]} className="coverage-map-label">
            Tu ubicación
          </Tooltip>
        </CircleMarker>
      )}
    </MapContainer>
  )
}
