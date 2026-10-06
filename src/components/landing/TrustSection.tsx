import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { aboutMedia } from '@/data/content'
import '@/styles/landing.css'

/** Foto del equipo en la red: la primera horizontal de Nosotros (o la primera que haya). */
const photo = aboutMedia.find((item) => item.width >= item.height) ?? aboutMedia[0]

/**
 * Confianza antes del contacto, solo con hechos verificables: oficina, razón social y RUC, la
 * garantía de OSIPTEL y el Libro de reclamaciones. Los testimonios se suman cuando sean reales.
 */
export function TrustSection() {
  const { brand, contact } = siteConfig

  return (
    <section
      id="confianza"
      className="section trust-section theme-space starfield"
      data-fab-surface="dark"
      aria-labelledby="trust-title"
    >
      <div className={`container trust-layout${photo ? '' : ' trust-layout--solo'}`}>
        {photo && (
          <figure className="trust-photo">
            <img
              src={photo.thumb ?? photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              {photo.caption}{' '}
              <Link viewTransition to="/nosotros">
                Conoce al equipo
              </Link>
            </figcaption>
          </figure>
        )}

        <div className="trust-copy">
          <h2 id="trust-title" className="section-title">
            Somos de Arequipa y puedes visitarnos
          </h2>
          <p className="section-lead">
            Detrás de tu conexión hay una empresa con oficina, nombre y RUC, y un equipo técnico que
            trabaja en tus calles.
          </p>

          <dl className="trust-facts">
            <div>
              <dt>Oficina</dt>
              <dd>{contact.address}</dd>
            </div>
            <div>
              <dt>Empresa</dt>
              <dd>
                {brand.legalName} · RUC {brand.ruc}
              </dd>
            </div>
            <div>
              <dt>Velocidad garantizada</dt>
              <dd>
                Al menos el 70% de la velocidad contratada, de subida y de bajada, como exige
                OSIPTEL (Ley N° 31207).
              </dd>
            </div>
            <div>
              <dt>Reclamos</dt>
              <dd>
                <Link viewTransition to="/libro-de-reclamaciones">
                  Libro de reclamaciones
                </Link>{' '}
                ·{' '}
                <Link viewTransition to="/terminos-y-condiciones">
                  Términos y condiciones
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
