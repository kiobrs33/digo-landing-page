import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from '@/components/icons/Icons'
import { PendingNote } from '@/components/ui/PendingNote'
import {
  getMobilePhoneHref,
  getPhoneHref,
  getPublishedSocialLinks,
  siteConfig,
} from '@/config/site'
import '@/styles/layout.css'

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
} as const

export function SiteFooter() {
  const { address, email, phoneDisplay, mobileDisplay } = siteConfig.contact
  const socialLinks = getPublishedSocialLinks()

  return (
    <footer className="site-footer theme-space starfield" data-fab-surface="dark">
      <div className="site-footer-body">
        <div className="container site-footer-grid">
          <div className="site-footer-brand">
            <p className="site-footer-name">
              <img
                className="site-footer-logo"
                src="/brand/digo-logo-128.png"
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              {siteConfig.brand.name}
            </p>
            <p className="site-footer-tagline">{siteConfig.brand.tagline}</p>
            {address ? <p>{address}</p> : <PendingNote>Dirección pendiente</PendingNote>}
            {email ? (
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            ) : (
              <PendingNote>Correo pendiente</PendingNote>
            )}
            <p>
              <a href={getPhoneHref()}>{phoneDisplay}</a>
              {' · '}
              <a href={getMobilePhoneHref()}>{mobileDisplay}</a>
            </p>
            <p>
              <a
                href={`https://${siteConfig.brand.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.brand.website}
              </a>
            </p>
          </div>

          <div>
            <p className="site-footer-heading">Enlaces</p>
            <ul className="site-footer-links">
              {siteConfig.pages.map((item) => (
                <li key={item.href}>
                  <Link viewTransition to={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link viewTransition to="/empresas">
                  Para Empresas
                </Link>
              </li>
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link viewTransition to={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div>
              <p className="site-footer-heading">Redes sociales</p>
              <ul className="site-footer-social">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.id]
                  return (
                    <li key={social.id}>
                      {social.href ? (
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <Icon />
                          <span>{social.label}</span>
                        </a>
                      ) : (
                        <span className="site-footer-social-placeholder">
                          <Icon />
                          <span>{social.label}</span>
                          <PendingNote>URL pendiente</PendingNote>
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="site-footer-legal">
        <div className="container">
          <p>{siteConfig.osiptelNotice}</p>
          <p className="site-footer-copy">
            © {new Date().getFullYear()} {siteConfig.brand.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
