import { Link } from 'react-router-dom'
import { ClockIcon, MapPinIcon, SymmetricIcon, TvIcon } from '@/components/icons/Icons'
import { GalaxyScene } from '@/components/landing/GalaxyScene'
import { HeroAdBoard } from '@/components/landing/HeroAdBoard'
import { tvFromMbps } from '@/data/content'
import '@/styles/landing.css'

/**
 * Hero de Hogar: un titular grande, una bajada, dos acciones (planes y cobertura) y tres datos
 * del servicio. A la derecha, el cartel de novedades en el núcleo de la galaxia.
 */
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
            Internet para tu hogar
          </h1>
          <p className="hero-galaxy-lead">
            Fibra óptica simétrica con la mejor velocidad de Arequipa y un equipo local que te atiende
            de cerca.
          </p>

          <div className="hero-galaxy-actions">
            <a href="#planes" className="btn btn-primary btn-lg">
              Ver planes
            </a>
            <Link viewTransition to="/cobertura" className="btn btn-secondary btn-lg">
              <MapPinIcon />
              Consultar cobertura
            </Link>
          </div>

          <ul className="hero-chips" aria-label="Lo que incluye el servicio">
            <li>
              <SymmetricIcon />
              100% simétrico
            </li>
            {tvFromMbps ? (
              <li>
                <TvIcon />
                TV Digital desde {tvFromMbps} Mbps
              </li>
            ) : null}
            <li>
              <ClockIcon />
              Instalación gratis en 24 h
            </li>
          </ul>
        </div>

        <HeroAdBoard />
      </div>
    </section>
  )
}
