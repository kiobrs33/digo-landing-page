import { MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet'
import { coverageZones } from '@/data/content'
import 'leaflet/dist/leaflet.css'
import '@/styles/landing.css'

const center: [number, number] = [-16.425, -71.535]

export function CoverageMap() {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="coverage-map"
      ref={(map) => {
        map
          ?.getContainer()
          .setAttribute('aria-label', 'Mapa de cobertura: Socabaya y Centro de Arequipa')
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coverageZones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.coordinates}
          pathOptions={{
            color: '#ffffff',
            fillColor: zone.color,
            fillOpacity: 0.35,
            weight: 3,
            opacity: 1,
          }}
        >
          <Tooltip sticky>{zone.name} — cobertura activa</Tooltip>
        </Polygon>
      ))}
    </MapContainer>
  )
}
