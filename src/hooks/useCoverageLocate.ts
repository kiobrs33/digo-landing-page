import { useState } from 'react'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { zoneAt } from '@/data/content'
import { reverseGeocode } from '@/lib/reverseGeocode'

/**
 * Resultado de "Usar mi ubicación". `address` es la dirección aproximada (undefined mientras se
 * busca, null si no se encontró).
 */
export type CoverageAnswer =
  | { source: 'location'; zone?: string; at: [number, number]; address?: string | null }
  | { source: 'location-error'; message: string }

/**
 * "Usar mi ubicación" contra las zonas de cobertura: lo comparten la franja de la home y la vista
 * de cobertura. `onLocated` recibe la posición (la vista de cobertura centra el mapa en ella).
 */
export function useCoverageLocate(onLocated?: (at: [number, number]) => void) {
  const [answer, setAnswer] = useState<CoverageAnswer | null>(null)
  // Cada consulta vuelve a montar el resultado para que su entrada confirme la búsqueda.
  const [answerCount, setAnswerCount] = useState(0)
  const [locating, setLocating] = useState(false)

  function show(next: CoverageAnswer) {
    setAnswer(next)
    setAnswerCount((count) => count + 1)
  }

  function locate() {
    if (!('geolocation' in navigator)) {
      show({
        source: 'location-error',
        message: 'Tu navegador no permite compartir la ubicación. Escríbenos por WhatsApp con tu dirección.',
      })
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false)
        const at: [number, number] = [coords.latitude, coords.longitude]
        const zone = zoneAt(...at)?.name
        show({ source: 'location', at, zone })
        onLocated?.(at)
        // La dirección llega después: el resultado ya se muestra con la zona.
        void reverseGeocode(...at).then((address) =>
          setAnswer((current) =>
            current?.source === 'location' && current.at === at ? { ...current, address } : current,
          ),
        )
      },
      (error) => {
        setLocating(false)
        show({
          source: 'location-error',
          message:
            error.code === error.PERMISSION_DENIED
              ? 'No diste permiso para usar tu ubicación. Puedes activarlo en el navegador o escribirnos por WhatsApp con tu dirección.'
              : 'No pudimos obtener tu ubicación. Intenta de nuevo o escríbenos por WhatsApp con tu dirección.',
        })
      },
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 0 },
    )
  }

  // Con ubicación, el mensaje lleva la dirección aproximada, latitud, longitud y la zona.
  const whatsappHref = getWhatsAppHref(
    siteConfig.whatsappMessages.cobertura(
      answer?.source === 'location'
        ? { address: answer.address ?? null, lat: answer.at[0], lng: answer.at[1], zone: answer.zone }
        : undefined,
    ),
  )

  return { answer, answerCount, locating, locate, whatsappHref }
}
