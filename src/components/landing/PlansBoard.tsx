import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronIcon, TvIcon, WifiIcon } from '@/components/icons/Icons'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { homePlanPromoTerms, homePlanShared, homePlans, type HomePlan } from '@/data/content'
import { useOnScreen } from '@/hooks/useOnScreen'

const MAX_MBPS = Math.max(...homePlans.map((plan) => plan.downloadMbps))

/** "S/ 59.00" nunca se parte entre la moneda y el número. */
const noBreak = (price: string) => price.replace(/ /g, '\u00a0')

/** Segundos por vuelta del pulso en la fibra de la tarjeta al plan más rápido. */
const FIBER_PULSE_S = 2.4

function PlanColumn({ plan }: { plan: HomePlan }) {
  const headingId = `plan-${plan.id}-title`

  return (
    <article
      className={`plan-column${plan.highlighted ? ' is-highlighted' : ''}`}
      aria-labelledby={headingId}
      style={
        {
          '--fiber-duration': `${(FIBER_PULSE_S * MAX_MBPS) / plan.downloadMbps}s`,
        } as CSSProperties
      }
    >
      <header className="plan-column-head theme-space starfield">
        {plan.highlighted && plan.badge && <span className="plan-column-badge">{plan.badge}</span>}
        <h3 id={headingId} className="plan-column-title">
          <span className="plan-column-name">Fibra Digo</span>{' '}
          <span className="plan-column-speed">
            {plan.downloadMbps}
            <small> Mbps</small>
          </span>
        </h3>
        {plan.tvPackage ? (
          <p className="plan-column-tier plan-column-tier--tv">
            <TvIcon />+ {plan.tvPackage}
          </p>
        ) : (
          <p className="plan-column-tier">
            <WifiIcon />
            Solo internet
          </p>
        )}
      </header>

      {/* Diagrama de fibra: del precio (origen) a tu hogar (destino), con lo que trae el plan
          colgado de la fibra. El pulso corre más rápido cuanto más rápido es el plan. */}
      <div className="plan-column-price">
        <span className="fiber-node" aria-hidden="true" />
        <p className="plan-price">
          {noBreak(plan.promo?.priceDisplay ?? plan.priceDisplay)}
          <span>al mes</span>
        </p>
        {plan.promo && (
          <p className="plan-promo">
            Los {plan.promo.months} primeros meses ·{' '}
            <span className="plan-promo-regular">luego {noBreak(plan.priceDisplay)}/mes</span>
          </p>
        )}
      </div>

      <ul className="plan-column-features fiber-track">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
        <li className="fiber-track-end plan-column-home">
          <span className="fiber-node fiber-node--sink" aria-hidden="true" />
          <p>
            <strong>Tu hogar</strong>
            <span>Conectado en 24 horas</span>
          </p>
        </li>
      </ul>

      <div className="plan-column-cta">
        <a
          href={getWhatsAppHref('hogar', siteConfig.whatsappMessages.plan(plan.name))}
          className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Lo quiero: plan ${plan.name} (abre WhatsApp)`}
        >
          Lo quiero
          <ChevronIcon direction="right" />
        </a>
      </div>
    </article>
  )
}

type RailState = { overflow: boolean; first: number; last: number }

/**
 * Tablero comparativo: las filas (velocidad, precio, beneficios, acción) alinean entre planes.
 * Acepta cualquier cantidad de planes: si no caben, el tablero se desliza con flechas, swipe o
 * teclado (Tab lleva cada plan a la vista), y el texto dice qué planes se están viendo.
 */
export function PlansBoard() {
  const railRef = useRef<HTMLDivElement>(null)
  const [plansRef, live] = useOnScreen<HTMLDivElement>()
  const [rail, setRail] = useState<RailState>({ overflow: false, first: 1, last: homePlans.length })

  const measure = useCallback(() => {
    const node = railRef.current
    const column = node?.querySelector<HTMLElement>('.plan-column')
    if (!node || !column) return
    const width = column.offsetWidth
    const first = Math.min(homePlans.length, Math.round(node.scrollLeft / width) + 1)
    const visible = Math.max(1, Math.floor((node.clientWidth + 2) / width))
    setRail({
      overflow: node.scrollWidth > node.clientWidth + 1,
      first,
      last: Math.min(homePlans.length, first + visible - 1),
    })
  }, [])

  useEffect(() => {
    const node = railRef.current
    if (!node) return
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [measure])

  function scrollByColumn(direction: 1 | -1) {
    const node = railRef.current
    const column = node?.querySelector<HTMLElement>('.plan-column')
    if (!node || !column) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollBy({ left: direction * column.offsetWidth, behavior: smooth ? 'smooth' : 'auto' })
  }

  const atStart = rail.first <= 1
  const atEnd = rail.last >= homePlans.length

  return (
    <div ref={plansRef} className="plans" data-live={live}>
      <div
        ref={railRef}
        className="plans-rail"
        data-overflow={rail.overflow}
        data-at-start={atStart}
        data-at-end={atEnd}
        onScroll={measure}
      >
        <div className="plans-board" style={{ '--plan-count': homePlans.length } as CSSProperties}>
          {homePlans.map((plan) => (
            <PlanColumn key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {rail.overflow && (
        <div className="plans-nav">
          <p className="plans-nav-status" aria-live="polite">
            {rail.first === rail.last
              ? `Plan ${rail.first} de ${homePlans.length}`
              : `Planes ${rail.first}–${rail.last} de ${homePlans.length}`}
          </p>
          <div className="plans-nav-buttons">
            <button
              type="button"
              className="plans-nav-button"
              aria-label="Ver planes anteriores"
              disabled={atStart}
              onClick={() => scrollByColumn(-1)}
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              className="plans-nav-button"
              aria-label="Ver más planes"
              disabled={atEnd}
              onClick={() => scrollByColumn(1)}
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
      )}

      <div className="plans-shared">
        <p className="plans-shared-title">Todos los planes incluyen</p>
        <ul>
          {homePlanShared.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {homePlans.some((plan) => plan.promo) && (
          <p className="plans-terms">{homePlanPromoTerms}</p>
        )}
      </div>
    </div>
  )
}
