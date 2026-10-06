import type { CoverageAnswer as Answer } from '@/hooks/useCoverageLocate'

/** Respuesta a "Usar mi ubicación": en zona, fuera de zona o por qué no se pudo ubicar. */
export function CoverageAnswer({ answer }: { answer: Answer }) {
  if (answer.source === 'location-error') {
    return (
      <div className="coverage-result coverage-result--maybe" role="status">
        <p>{answer.message}</p>
      </div>
    )
  }

  const place =
    answer.address === undefined ? (
      <p className="coverage-result-place">Buscando el nombre de tu dirección…</p>
    ) : answer.address ? (
      <p className="coverage-result-place">
        <span>Tu ubicación:</span> {answer.address}
      </p>
    ) : null

  return answer.zone ? (
    <div className="coverage-result coverage-result--in-zone" role="status">
      <p>
        <strong>¡Estás en zona de cobertura!</strong> Tu ubicación está dentro de {answer.zone}.
        Escríbenos para confirmar la instalación en tu dirección exacta.
      </p>
      {place}
    </div>
  ) : (
    <div className="coverage-result coverage-result--out-of-zone" role="status">
      <p>
        <strong>Puede que ya lleguemos a tu zona.</strong> Envíanos tu dirección y lo confirmamos.
      </p>
      {place}
    </div>
  )
}
