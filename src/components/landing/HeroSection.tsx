import { Link } from 'react-router-dom'
import { MapPinIcon } from '@/components/icons/Icons'
import { GalaxyScene } from '@/components/landing/GalaxyScene'
import { HeroAdBoard } from '@/components/landing/HeroAdBoard'
import '@/styles/landing.css'

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="hero-galaxy theme-space"
      data-fab-surface="dark"
      aria-labelledby="hero-title"
    >
      <GalaxyScene speed={1} />

      <div className="container hero-galaxy-inner">
        <div className="hero-galaxy-copy">
          <h1 id="hero-title" className="hero-galaxy-title">
            Fibra óptica en Arequipa, siempre contigo
          </h1>
          <p className="hero-galaxy-lead">
            Internet 100% simétrico: la misma velocidad para subir y bajar, con TV Digital desde 800
            Mbps e instalación gratis en 24 horas.
          </p>

          <div className="hero-galaxy-actions">
            <Link viewTransition to="/cobertura" className="btn btn-primary btn-lg">
              <MapPinIcon />
              Consultar cobertura
            </Link>
            <a href="#planes" className="btn btn-secondary btn-lg">
              Ver planes
            </a>
          </div>
        </div>

        <HeroAdBoard />
      </div>
    </section>
  )
}
