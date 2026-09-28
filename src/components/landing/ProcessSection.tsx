import { Link } from 'react-router-dom'
import { getWhatsAppHref } from '@/config/site'
import { homeProcessSteps } from '@/data/content'
import '@/styles/landing.css'

export function ProcessSection() {
  return (
    <section id="proceso" className="section process-section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Cómo contratar Digo</h2>
          <p className="section-lead">Cuatro pasos, de la consulta a tu casa conectada.</p>
        </header>

        <ol className="process-steps">
          {homeProcessSteps.map((item) => (
            <li key={item.id}>
              <span className="process-step-number" aria-hidden="true">
                {item.step}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>

        <div className="process-actions">
          <Link viewTransition to="/cobertura" className="btn btn-primary">
            Consultar cobertura
          </Link>
          <a
            href={getWhatsAppHref('hogar')}
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar con un asesor
          </a>
        </div>
      </div>
    </section>
  )
}
