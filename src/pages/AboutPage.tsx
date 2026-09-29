import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronIcon,
  CloseIcon,
  HeadsetIcon,
  MapPinIcon,
  PlayIcon,
  WhatsAppIcon,
  WifiIcon,
} from '@/components/icons/Icons'
import { PageIntro } from '@/components/layout/PageIntro'
import { PageShell } from '@/components/layout/PageShell'
import { getWhatsAppHref } from '@/config/site'
import { aboutCategories, aboutMedia, type AboutCategory, type AboutMedia } from '@/data/content'

const values = [
  {
    icon: HeadsetIcon,
    title: 'Atención personalizada',
    detail: 'Te atendemos cara a cara, y por WhatsApp o teléfono con soporte 24/7.',
  },
  {
    icon: WifiIcon,
    title: 'Internet más rápido y estable',
    detail: 'Fibra óptica 100% simétrica hasta tu casa, instalada por nuestro propio equipo.',
  },
  {
    icon: MapPinIcon,
    title: 'En más zonas de Arequipa',
    detail: 'Seguimos ampliando la red para llegar a más hogares.',
  },
]

type Filter = AboutCategory | 'todos'

function thumbnailOf(item: AboutMedia) {
  return item.thumb ?? (item.type === 'video' ? item.poster : item.src)
}

/** Foto o video en la cuadrícula: abre el visor. El tamaño reservado evita saltos al cargar. */
function MediaTile({ item, onOpen }: { item: AboutMedia; onOpen: () => void }) {
  const thumbnail = thumbnailOf(item)
  const label = `${item.type === 'video' ? 'Ver video' : 'Ver foto'}: ${item.caption}`

  return (
    <figure className="about-tile">
      <button type="button" className="about-tile-media" onClick={onOpen} aria-label={label}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <video src={item.src} muted playsInline preload="metadata" aria-hidden="true" />
        )}
        {item.type === 'video' && (
          <span className="about-tile-play" aria-hidden="true">
            <PlayIcon />
          </span>
        )}
      </button>
      <figcaption>{item.caption}</figcaption>
    </figure>
  )
}

export function AboutPage() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const categories = aboutCategories.filter((category) =>
    aboutMedia.some((item) => item.category === category.id),
  )
  const items =
    filter === 'todos' ? aboutMedia : aboutMedia.filter((item) => item.category === filter)
  const current = openIndex === null ? null : items[openIndex]

  // El visor es un <dialog> nativo: atrapa el foco, cierra con Escape y devuelve el foco.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openIndex !== null && !dialog.open) dialog.showModal()
    if (openIndex === null && dialog.open) dialog.close()
  }, [openIndex])

  function step(direction: 1 | -1) {
    setOpenIndex((index) =>
      index === null ? index : (index + direction + items.length) % items.length,
    )
  }

  function handleDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'ArrowRight') step(1)
    if (event.key === 'ArrowLeft') step(-1)
  }

  // Clic en el fondo oscuro (fuera del contenido) cierra el visor.
  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) setOpenIndex(null)
  }

  return (
    <PageShell segment="hogar">
      <main id="contenido" tabIndex={-1}>
        <PageIntro title="Nosotros">
          <p>
            Somos Digo Telecom, proveedor de internet de fibra óptica de Arequipa. Nuestra gente,
            nuestra conexión.
          </p>
        </PageIntro>

        <section className="section about-story" aria-labelledby="asi-trabajamos">
          <div className="container about-story-grid">
            <header>
              <h2 id="asi-trabajamos" className="section-title">
                Así trabajamos
              </h2>
              <p className="section-lead">
                Instalamos y ampliamos nuestra propia red de fibra óptica para llevar una mejor
                conexión a más hogares de Arequipa. Nuestro equipo tiende la fibra, instala en tu
                casa y te atiende cuando lo necesitas.
              </p>
            </header>
            <ul className="about-values">
              {values.map(({ icon: Icon, title, detail }) => (
                <li key={title}>
                  <span className="about-value-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section about-gallery" aria-labelledby="dia-a-dia">
          <div className="container">
            <header className="section-header">
              <h2 id="dia-a-dia" className="section-title">
                Nuestro día a día
              </h2>
              <p className="section-lead">
                Fotos y videos del equipo, los proyectos y las actividades de Digo en Arequipa.
              </p>
            </header>

            {categories.length > 1 && (
              <div className="about-filters" role="group" aria-label="Filtrar la galería">
                {[{ id: 'todos' as const, label: 'Todos' }, ...categories].map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className="about-filter"
                    aria-pressed={filter === category.id}
                    onClick={() => setFilter(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}

            {items.length > 0 ? (
              // La clave por filtro vuelve a montar la cuadrícula: las fotos entran de nuevo.
              <ul key={filter} className="about-grid">
                {items.map((item, index) => (
                  <li key={item.id}>
                    <MediaTile item={item} onOpen={() => setOpenIndex(index)} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="about-empty">Pronto compartiremos más fotos y videos.</p>
            )}
          </div>
        </section>

        <section className="section about-cta" aria-labelledby="unete">
          <div className="container about-cta-inner">
            <h2 id="unete" className="section-title">
              ¿Quieres la fibra de Digo en tu casa?
            </h2>
            <div className="about-cta-actions">
              <Link viewTransition to="/cobertura" className="btn btn-primary btn-lg">
                <MapPinIcon />
                Consultar cobertura
              </Link>
              <a
                href={getWhatsAppHref('hogar')}
                className="btn btn-secondary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <dialog
          ref={dialogRef}
          className="about-lightbox"
          aria-label={current ? current.caption : 'Visor de fotos'}
          onClose={() => setOpenIndex(null)}
          onKeyDown={handleDialogKey}
          onClick={handleDialogClick}
        >
          {current && (
            <figure className="about-lightbox-figure">
              {current.type === 'video' ? (
                <video
                  key={current.id}
                  src={current.src}
                  poster={current.poster}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img key={current.id} src={current.src} alt={current.alt} />
              )}
              <figcaption>
                {current.caption}
                <span className="about-lightbox-count">
                  {(openIndex ?? 0) + 1} de {items.length}
                </span>
              </figcaption>
            </figure>
          )}
          <button
            type="button"
            className="about-lightbox-close"
            aria-label="Cerrar"
            onClick={() => setOpenIndex(null)}
          >
            <CloseIcon />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                className="about-lightbox-nav about-lightbox-nav--prev"
                aria-label="Anterior"
                onClick={() => step(-1)}
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                className="about-lightbox-nav about-lightbox-nav--next"
                aria-label="Siguiente"
                onClick={() => step(1)}
              >
                <ChevronIcon direction="right" />
              </button>
            </>
          )}
        </dialog>
      </main>
    </PageShell>
  )
}
