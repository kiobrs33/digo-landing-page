import { homeServices } from '@/data/content'
import '@/styles/landing.css'

export function ServicesSection() {
  return (
    <section id="servicios" className="section services-section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Servicios para tu hogar</h2>
          <p className="section-lead">
            Internet de fibra simétrica y TV Digital, instalados por un equipo de Arequipa.
          </p>
        </header>

        <div className="services-slabs">
          {homeServices.map((service) => (
            <article key={service.id} className="service-slab">
              <h3>{service.title}</h3>
              <p className="service-slab-lead">{service.description}</p>
              <dl>
                {service.options.map((option) => (
                  <div key={option.label}>
                    <dt>{option.label}</dt>
                    <dd>{option.detail}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <a href="#planes" className="btn btn-secondary services-cta">
          Comparar planes y precios
        </a>
      </div>
    </section>
  )
}
