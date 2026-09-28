import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { corporateCoverageCities } from '@/data/content'
import 'leaflet/dist/leaflet.css'
import '@/styles/empresas.css'

const ACCENT = '#de087e'
const CITY_BOUNDS = corporateCoverageCities.map((city) => city.coordinates)

export function CorporateCoverageMap() {
  return (
    <MapContainer
      bounds={CITY_BOUNDS}
      boundsOptions={{ padding: [48, 48] }}
      scrollWheelZoom={false}
      className="empresas-coverage-map"
      ref={(map) => {
        map
          ?.getContainer()
          .setAttribute('aria-label', 'Mapa de cobertura corporativa: Arequipa, Moquegua y Mollendo')
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {corporateCoverageCities.map((city) => (
        <CircleMarker
          key={city.id}
          center={city.coordinates}
          radius={10}
          pathOptions={{
            color: '#ffffff',
            fillColor: ACCENT,
            fillOpacity: 0.75,
            weight: 3,
            opacity: 1,
          }}
        >
          <Tooltip permanent direction="top" offset={[0, -6]} className="empresas-coverage-tooltip">
            {city.name}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
