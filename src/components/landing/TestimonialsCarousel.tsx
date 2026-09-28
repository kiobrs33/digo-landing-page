import { ChevronIcon, QuoteIcon, StarIcon } from '@/components/icons/Icons'
import { PendingNote } from '@/components/ui/PendingNote'
import { publishedTestimonials as testimonials, type Testimonial } from '@/data/content'
import { useCarousel, useVisibleCount, type VisibleRule } from '@/hooks/useCarousel'

const VISIBLE_RULES = [['(max-width: 768px)', 1]] as const satisfies readonly VisibleRule[]

/** Iniciales para el avatar: "María Elena R." → "MR". */
function initials(name: string) {
  const words = name.replace(/\./g, '').split(/\s+/).filter(Boolean)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

/** Tarjeta de testimonio: calificación, la cita como protagonista y quién la dice. */
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="testimonial-card">
      <div className="testimonial-top">
        <div className="testimonial-stars" role="img" aria-label={`${item.rating} de 5 estrellas`}>
          {Array.from({ length: item.rating }).map((_, index) => (
            <StarIcon key={index} />
          ))}
        </div>
        <span className="testimonial-mark">
          <QuoteIcon />
        </span>
      </div>

      <blockquote className="testimonial-quote">
        <p>{item.quote}</p>
      </blockquote>

      <figcaption className="testimonial-author">
        <span className="testimonial-avatar" aria-hidden="true">
          {initials(item.name)}
        </span>
        <span className="testimonial-who">
          <cite className="testimonial-name">{item.name}</cite>
          <span className="testimonial-district">{item.district}</span>
        </span>
        {item.synthetic && <PendingNote>Testimonio de ejemplo</PendingNote>}
      </figcaption>
    </figure>
  )
}

export function TestimonialsCarousel() {
  const visible = useVisibleCount(VISIBLE_RULES, 2)
  const carousel = useCarousel({ count: testimonials.length, visible })
  const slideWidth = 100 / visible
  const shown = testimonials.slice(carousel.index, carousel.index + visible)

  return (
    <div
      className={`testimonials-carousel${carousel.isStatic ? ' is-static' : ''}`}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Testimonios de clientes"
      {...carousel.handlers}
    >
      <div className="testimonials-carousel-frame">
        {!carousel.isStatic && (
          <button
            type="button"
            className="testimonials-carousel-nav"
            aria-label="Testimonio anterior"
            onClick={carousel.goPrev}
            disabled={!carousel.canGoPrev}
          >
            <ChevronIcon direction="left" />
          </button>
        )}

        <div className="testimonials-carousel-viewport">
          <div
            className="testimonials-carousel-track"
            style={{ transform: `translateX(-${carousel.index * slideWidth}%)` }}
          >
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                className="testimonials-carousel-slide"
                style={{ flex: `0 0 ${slideWidth}%` }}
                role="group"
                aria-roledescription="testimonio"
                aria-label={`${index + 1} de ${testimonials.length}`}
                inert={!carousel.isInView(index)}
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {!carousel.isStatic && (
          <button
            type="button"
            className="testimonials-carousel-nav"
            aria-label="Siguiente testimonio"
            onClick={carousel.goNext}
            disabled={!carousel.canGoNext}
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>

      {!carousel.isStatic && (
        <>
          <div className="carousel-dots">
            {Array.from({ length: carousel.positions }, (_, position) => (
              <button
                key={position}
                type="button"
                aria-label={`Ver testimonio de ${testimonials
                  .slice(position, position + visible)
                  .map((item) => item.name)
                  .join(' y ')}`}
                aria-current={position === carousel.index ? 'true' : undefined}
                onClick={() => carousel.goTo(position)}
              />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Mostrando testimonio de {shown.map((item) => item.name).join(' y ')}
          </p>
        </>
      )}
    </div>
  )
}
