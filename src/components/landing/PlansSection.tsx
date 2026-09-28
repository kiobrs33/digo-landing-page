import { PlansBoard } from '@/components/landing/PlansBoard'
import { homePlans } from '@/data/content'
import '@/styles/landing.css'

export function PlansSection() {
  return (
    <section id="planes" className="section plans-section">
      <div className="container">
        <header className="section-header section-header--center">
          <h2 className="section-title">Planes de fibra en Arequipa</h2>
          <p className="section-lead">
            {homePlans.length} planes de fibra 100% simétrica, con instalación gratis en 24 horas y
            TV Digital incluida desde 800 Mbps.
          </p>
        </header>

        <PlansBoard />
      </div>
    </section>
  )
}
