import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronIcon, SparklesIcon, TvIcon, WhatsAppIcon, WifiIcon } from '@/components/icons/Icons'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { homePlanPromoTerms, homePlanShared, homePlans, type HomePlan } from '@/data/content'
import { useOnScreen } from '@/hooks/useOnScreen'

const MAX_MBPS = Math.max(...homePlans.map((plan) => plan.downloadMbps))

/** "S/ 59.00" nunca se parte entre la moneda y el número. */
const noBreak = (price: string) => price.replace(/ /g, '\u00a0')

/** Segundos por vuelta del pulso en el medidor de la tarjeta al plan más rápido. */
const FIBER_PULSE_S = 2.4

/** "S/ 59.00" → moneda chica y monto grande, como en una etiqueta de precio. */
function Price({ display }: { display: string }) {
  const [currency, amount] = display.split(' ')
  if (!amount) return <>{display}</>
  return (
    <>
      <small>{currency}</small>
      {amount}
    </>
  )
}

function PlanColumn({ plan }: { plan: HomePlan }) {
  const headingId = `plan-${plan.id}-title`

  return (
    <article
      className={`plan-column${plan.highlighted ? ' is-highlighted' : ''}`}
      aria-labelledby={headingId}
      style={
        {
          '--fiber-duration': `${(FIBER_PULSE_S * MAX_MBPS) / plan.downloadMbps}s`,
          '--speed': plan.downloadMbps / MAX_MBPS,
        } as CSSProperties
      }
    >
      <header className="plan-column-head theme-space starfield">
        {plan.highlighted && plan.badge && (
          <span className="plan-column-badge">
            <SparklesIcon />
            {plan.badge}
          </span>
        )}
        <div className="plan-column-top">
          <span className="plan-column-name" aria-hidden="true">
            Fibra Digo
          </span>
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
        </div>

        <div className="plan-column-figures">
          <h3 id={headingId} className="plan-column-speed">
            <span className="sr-only">Fibra Digo </span>
            {plan.downloadMbps}
            <small> Mbps</small>
          </h3>
          <p className="plan-price">
            <span className="plan-price-amount">
              <Price display={plan.promo?.priceDisplay ?? plan.priceDisplay} />
            </span>
            <span className="plan-price-period">al mes</span>
          </p>
        </div>

        {/* Medidor de fibra: largo según la velocidad frente al plan más rápido; el pulso
            corre más rápido cuanto más rápido es el plan. */}
        <span className="plan-meter" aria-hidden="true">
          <span />
        </span>

      </header>

      {/* La fibra nace en la promo (o en "100% fibra óptica"), recorre lo que trae el plan y llega
          a tu hogar. El pulso corre más rápido cuanto más rápido es el plan. */}
      <div className="plan-column-body">
        <ul className="plan-column-features fiber-track">
          {/* Origen de la fibra: la promo si el plan tiene una; si no, lo que lo hace fibra. */}
          <li className={`fiber-track-end plan-column-source${plan.promo ? ' is-promo' : ''}`}>
            <span className="fiber-node" aria-hidden="true" />
            {plan.promo ? (
              <p>
                <strong>
                  {plan.promo.percentOff > 0 && `${plan.promo.percentOff}% dscto `}
                  <span className="plan-source-term">
                    por {plan.promo.months === 1 ? '1 mes' : `${plan.promo.months} meses`}
                  </span>
                </strong>
                <span>Luego {noBreak(plan.priceDisplay)} al mes</span>
              </p>
            ) : (
              <p>
                <strong>100% fibra óptica</strong>
                <span>Conexión simétrica</span>
              </p>
            )}
          </li>
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
      </div>

      <div className="plan-column-cta">
        <a
          href={getWhatsAppHref(siteConfig.whatsappMessages.plan(plan.name))}
          className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-plan'}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Lo quiero: plan ${plan.name} (abre WhatsApp)`}
        >
          <WhatsAppIcon />
          Lo quiero
        </a>
      </div>
    </article>
  )
}

type RailState = { overflow: boolean; first: number; last: number }

/** En escritorio se ven 3 planes a la vez; con más, el tablero pasa a carrusel. */
const VISIBLE_PLANS = 3
const isCarousel = homePlans.length > VISIBLE_PLANS

/** Distancia entre una columna y la siguiente (ancho + separación). */
function columnStep(rail: HTMLElement): number {
  const columns = rail.querySelectorAll<HTMLElement>('.plan-column')
  if (columns.length > 1) return columns[1].offsetLeft - columns[0].offsetLeft
  return columns[0]?.offsetWidth ?? rail.clientWidth
}

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
    if (!node?.querySelector('.plan-column')) return
    const step = columnStep(node)
    const first = Math.min(homePlans.length, Math.round(node.scrollLeft / step) + 1)
    const visible = Math.max(1, Math.floor((node.clientWidth + 24) / step))
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

  function scrollToColumn(index: number) {
    const node = railRef.current
    if (!node) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollTo({ left: index * columnStep(node), behavior: smooth ? 'smooth' : 'auto' })
  }

  const scrollByColumn = (direction: 1 | -1) => scrollToColumn(rail.first - 1 + direction)

  // Un punto por cada posición posible del carrusel (con 5 planes y 3 a la vista: 3 puntos).
  const visibleCount = rail.last - rail.first + 1
  const positions = rail.overflow ? Math.max(1, homePlans.length - visibleCount + 1) : 0

  const atStart = rail.first <= 1
  const atEnd = rail.last >= homePlans.length

  return (
    <div ref={plansRef} className="plans" data-live={live}>
      <div className="plans-stage">
        {rail.overflow && (
          // A los costados, a media altura de las tarjetas: se navega sin bajar.
          <button
            type="button"
            className="plans-nav-button plans-nav-button--prev"
            aria-label="Ver planes anteriores"
            disabled={atStart}
            onClick={() => scrollByColumn(-1)}
          >
            <ChevronIcon direction="left" />
          </button>
        )}
        <div
          ref={railRef}
          className="plans-rail"
          data-overflow={rail.overflow}
          data-at-start={atStart}
          data-at-end={atEnd}
          onScroll={measure}
        >
          <div
            className="plans-board"
            data-carousel={isCarousel}
            style={{ '--plan-count': homePlans.length, '--plans-visible': VISIBLE_PLANS } as CSSProperties}
          >
            {homePlans.map((plan) => (
              <PlanColumn key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
        {rail.overflow && (
          <button
            type="button"
            className="plans-nav-button plans-nav-button--next"
            aria-label="Ver más planes"
            disabled={atEnd}
            onClick={() => scrollByColumn(1)}
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>

      {rail.overflow && (
        <div className="plans-nav">
          <p className="sr-only" aria-live="polite">
            {rail.first === rail.last
              ? `Plan ${rail.first} de ${homePlans.length}`
              : `Planes ${rail.first}–${rail.last} de ${homePlans.length}`}
          </p>
          {positions > 1 && (
            <div className="plans-nav-dots" role="group" aria-label="Ir a los planes">
              {Array.from({ length: positions }, (_, index) => {
                const last = Math.min(homePlans.length, index + visibleCount)
                return (
                  <button
                    key={index}
                    type="button"
                    className="plans-nav-dot"
                    aria-current={index === rail.first - 1 || undefined}
                    aria-label={
                      visibleCount > 1 ? `Ver planes ${index + 1} a ${last}` : `Ver plan ${index + 1}`
                    }
                    onClick={() => scrollToColumn(index)}
                  />
                )
              })}
            </div>
          )}
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
