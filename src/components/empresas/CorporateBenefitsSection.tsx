import { CheckCircleIcon } from '@/components/icons/Icons'
import { businessBenefits } from '@/data/content'
import '@/styles/empresas.css'

export function CorporateBenefitsSection() {
  return (
    <section id="beneficios-empresas" className="section empresas-benefits-section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Beneficios de un enlace dedicado</h2>
          <p className="section-lead">
            Conectividad pensada para operar sin interrupciones, con condiciones por escrito.
          </p>
        </header>

        <ul className="empresas-benefits">
          {businessBenefits.map((benefit) => (
            <li key={benefit.id}>
              <CheckCircleIcon />
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
