import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ChevronIcon, PauseIcon, PlayIcon, WhatsAppIcon } from '@/components/icons/Icons'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { heroAds, type HeroAd } from '@/data/content'
import { useCarousel } from '@/hooks/useCarousel'

const AUTOPLAY_MS = 6500

function webpSrcSet(src: string) {
  return [640, 1080]
    .map((width) => `${src.replace(/\.jpg$/, `-${width}.webp`)} ${width}w`)
    .join(', ')
}

function AdCta({ ad }: { ad: HeroAd }) {
  const { cta } = ad
  if (cta.kind === 'link') {
    return (
      <Link viewTransition to={cta.href} className="btn btn-primary hero-showcase-cta">
        {cta.label}
      </Link>
    )
  }
  return (
    <a
      href={getWhatsAppHref('hogar', siteConfig.whatsappMessages.plan(cta.planName))}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary hero-showcase-cta"
    >
      <WhatsAppIcon />
      {cta.label}
    </a>
  )
}

/**
 * Cartel publicitario en el núcleo de la galaxia: la nave lo orbita. Rota solo, se detiene al
 * pasar el mouse o enfocar, cuando sale de pantalla y con movimiento reducido.
 */
export function HeroAdBoard() {
  const carousel = useCarousel({ count: heroAds.length, loop: true })
  const { index, goTo, goPrev, goNext } = carousel
  const [paused, setPaused] = useState(false)
  const [holding, setHolding] = useState(false)
  const [inView, setInView] = useState(true)
  // Falso al renderizar (igual que el HTML pre-renderizado); se lee la preferencia al montar.
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? true))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const running = heroAds.length > 1 && !paused && !holding && inView && !reducedMotion

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(goNext, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [running, index, goNext])

  const ad = heroAds[index]
  if (!ad) return null

  return (
    <section
      ref={rootRef}
      className="hero-showcase"
      aria-roledescription="carrusel"
      aria-label="Novedades de Digo"
      data-running={running}
      style={{ '--ad-duration': `${AUTOPLAY_MS}ms` } as CSSProperties}
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHolding(false)
      }}
      {...carousel.handlers}
    >
      <div className="hero-showcase-screen">
        {heroAds.map((item, i) => (
          <div
            key={item.id}
            className="hero-showcase-slide"
            data-active={i === index}
            aria-hidden={i !== index}
          >
            <img
              className="hero-showcase-backdrop"
              // Fondo desenfocado: basta la versión webp pequeña. La primera pieza es la imagen
              // más grande del primer pantallazo (LCP), así que carga sin esperar.
              src={item.image.src.replace(/\.jpg$/, '-640.webp')}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <picture>
              <source
                type="image/webp"
                srcSet={webpSrcSet(item.image.src)}
                sizes="(max-width: 900px) 90vw, 24rem"
              />
              <img
                src={item.image.src}
                alt={i === index ? item.image.alt : ''}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding="async"
                draggable={false}
              />
            </picture>
          </div>
        ))}

        {heroAds.length > 1 && (
          <>
            <button
              type="button"
              className="hero-showcase-arrow hero-showcase-arrow--prev"
              aria-label="Novedad anterior"
              onClick={goPrev}
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              className="hero-showcase-arrow hero-showcase-arrow--next"
              aria-label="Novedad siguiente"
              onClick={goNext}
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}
      </div>

      {/* Todas las franjas de texto ocupan la misma celda: el cartel mide siempre lo que la más
          alta y no cambia de tamaño al rotar. Solo la activa se ve y es interactiva. */}
      <div className="hero-showcase-bars" aria-live={running ? 'off' : 'polite'}>
        {heroAds.map((item, i) => (
          <div
            key={item.id}
            className="hero-showcase-bar"
            data-active={i === index}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div className="hero-showcase-copy">
              <p className="hero-showcase-title">{item.title}</p>
              <p className="hero-showcase-detail">{item.detail}</p>
            </div>
            <AdCta ad={item} />
          </div>
        ))}
      </div>

      {heroAds.length > 1 && (
        <div className="hero-showcase-controls">
          <div className="hero-showcase-tabs">
            {heroAds.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className="hero-showcase-tab"
                aria-current={i === index}
                aria-label={`Novedad ${i + 1} de ${heroAds.length}: ${item.title}`}
                onClick={() => goTo(i)}
              >
                <span key={i === index ? `on-${index}` : 'off'} />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="hero-showcase-toggle"
            aria-label={paused ? 'Reanudar novedades' : 'Pausar novedades'}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      )}
    </section>
  )
}
