import { useState } from 'react'
import { WhatsAppIcon } from '@/components/icons/Icons'
import { PageIntro } from '@/components/layout/PageIntro'
import { PageShell } from '@/components/layout/PageShell'
import { PendingNote } from '@/components/ui/PendingNote'
import { getWhatsAppHref, showPlaceholders, siteConfig } from '@/config/site'
import { paymentMethods, paymentReceiptMessage, type PaymentMethod } from '@/data/content'
import { useOnScreen } from '@/hooks/useOnScreen'

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      // Sin espacios ni guiones: así lo piden las apps de los bancos y Yape.
      await navigator.clipboard.writeText(value.replace(/[\s-]/g, ''))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className="payment-copy"
      onClick={handleCopy}
      aria-label={copied ? `${label} copiado` : `Copiar ${label}`}
    >
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  )
}

/**
 * Medio de pago como diagrama de fibra: el medio (origen), los datos para copiar colgados de la
 * fibra y, al final, el comprobante por WhatsApp (destino), que es lo que cierra el pago.
 */
function PaymentSlab({ method }: { method: PaymentMethod }) {
  // Los datos ficticios nunca llegan a producción: un número de cuenta falso podría recibir pagos.
  const showFields = !method.example || showPlaceholders

  return (
    <article
      className={`payment-slab payment-slab--${method.id}`}
      aria-labelledby={`pago-${method.id}`}
    >
      <div className="fiber-endpoint">
        <span className="fiber-node" aria-hidden="true" />
        <div>
          <h2 id={`pago-${method.id}`}>{method.name}</h2>
          <span>{method.description}</span>
        </div>
      </div>

      {showFields ? (
        <dl className="payment-fields fiber-track">
          {method.example && <PendingNote>Datos de ejemplo: reemplazar por los reales</PendingNote>}
          {method.fields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>
                <span className="payment-value">{field.value}</span>
                {field.copy && <CopyButton value={field.value} label={field.label} />}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="fiber-track">
          <p className="payment-slab-pending">Tu asesor te envía los datos de pago por WhatsApp.</p>
        </div>
      )}

      <div className="fiber-endpoint payment-receipt">
        <span className="fiber-node fiber-node--sink" aria-hidden="true" />
        <p>
          <strong>Envía tu comprobante</strong>
          <a
            href={getWhatsAppHref('hogar', paymentReceiptMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Por WhatsApp al {siteConfig.contact.phoneDisplay}
          </a>
        </p>
      </div>
    </article>
  )
}

export function PaymentsPage() {
  const [slabsRef, live] = useOnScreen<HTMLDivElement>()

  return (
    <PageShell segment="hogar">
      <main id="contenido" tabIndex={-1}>
        <PageIntro title="Medios de pago">
          <p>Paga tu servicio mensual por transferencia o depósito en BCP, o con Yape.</p>
        </PageIntro>

        <section className="section payments-section" aria-label="Datos de pago">
          <div className="container">
            <div ref={slabsRef} className="payment-slabs" data-live={live}>
              {paymentMethods.map((method) => (
                <PaymentSlab key={method.id} method={method} />
              ))}
            </div>

            <div className="payments-help">
              <p>
                <strong>Recuerda:</strong> después de pagar, envíanos tu comprobante por WhatsApp
                para registrar tu pago.
              </p>
              <a
                href={getWhatsAppHref('hogar', paymentReceiptMessage)}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Enviar comprobante
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
