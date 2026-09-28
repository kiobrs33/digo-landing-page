import { TestimonialsCarousel } from '@/components/landing/TestimonialsCarousel'
import { publishedTestimonials } from '@/data/content'
import '@/styles/landing.css'

export function TestimonialsSection() {
  if (publishedTestimonials.length === 0) return null

  return (
    <section id="testimonios" className="section testimonials-section">
      <div className="container">
        <header className="section-header section-header--center">
          <h2 className="section-title">Lo dicen nuestros vecinos en Arequipa</h2>
          <p className="section-lead">
            Vecinos de Arequipa cuentan cómo les va con la fibra de Digo.
          </p>
        </header>

        <TestimonialsCarousel />
      </div>
    </section>
  )
}
