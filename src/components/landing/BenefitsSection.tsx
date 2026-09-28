import { homeBenefits } from '@/data/content'
import '@/styles/landing.css'

export function BenefitsSection() {
  return (
    <section id="beneficios" className="section benefits-section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Lo que incluye cada plan</h2>
          <p className="section-lead">
            Sin letra pequeña: estos beneficios vienen con cualquier plan de fibra Digo.
          </p>
        </header>

        <ul className="benefits-frieze">
          {homeBenefits.map((benefit) => (
            <li key={benefit.id}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
