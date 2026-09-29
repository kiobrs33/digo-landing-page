import { PhoneIcon, WhatsAppIcon } from '@/components/icons/Icons'
import {
  getMobilePhoneHref,
  getMobileWhatsAppHref,
  getPhoneHref,
  getWhatsAppHref,
  siteConfig,
} from '@/config/site'
import { emailPattern, phonePattern, useWhatsAppForm } from '@/hooks/useWhatsAppForm'
import '@/styles/landing.css'

export function ContactSection() {
  const { handleSubmit, fieldProps, fieldError, sentNotice } = useWhatsAppForm({
    fields: {
      nombre: { required: true },
      telefono: { required: true, ...phonePattern },
      email: emailPattern,
      mensaje: { required: true },
    },
    buildUrl: (values) => getWhatsAppHref('hogar', siteConfig.whatsappMessages.contacto(values)),
  })

  return (
    <section id="contacto" className="section contact-section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <header className="section-header">
            <h2 className="section-title">Escríbenos desde Arequipa</h2>
            <p className="section-lead">
              ¿Dudas sobre cobertura, instalación o facturación? Déjanos tu consulta y la enviamos
              por WhatsApp a un asesor de Digo.
            </p>
          </header>

          {/* Dos números oficiales, ambos con WhatsApp y llamadas: una fila por número. */}
          <ul className="contact-channels">
            <li>
              <PhoneIcon />
              <span>
                Teléfono fijo {siteConfig.contact.phoneDisplay}
                <span className="contact-channel-actions">
                  <a href={getPhoneHref()}>Llamar</a>
                  <a href={getWhatsAppHref('hogar')} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </span>
              </span>
            </li>
            <li>
              <WhatsAppIcon />
              <span>
                Celular {siteConfig.contact.mobileDisplay}
                <span className="contact-channel-actions">
                  <a href={getMobilePhoneHref()}>Llamar</a>
                  <a href={getMobileWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </span>
              </span>
            </li>
          </ul>
        </div>

        <form className="contact-form float-card" onSubmit={handleSubmit} noValidate>
          {sentNotice(
            'Abrimos WhatsApp con tu consulta. Envía el mensaje para que te respondamos.',
          )}

          <div className="form-field">
            <label htmlFor="contact-nombre">Nombre completo</label>
            <input id="contact-nombre" type="text" autoComplete="name" {...fieldProps('nombre')} />
            {fieldError('nombre')}
          </div>

          <div className="form-field">
            <label htmlFor="contact-telefono">Teléfono</label>
            <input
              id="contact-telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              {...fieldProps('telefono')}
            />
            {fieldError('telefono')}
          </div>

          <div className="form-field">
            <label htmlFor="contact-email">Correo (opcional)</label>
            <input id="contact-email" type="email" autoComplete="email" {...fieldProps('email')} />
            {fieldError('email')}
          </div>

          <div className="form-field">
            <label htmlFor="contact-mensaje">Consulta</label>
            <textarea id="contact-mensaje" rows={4} {...fieldProps('mensaje')} />
            {fieldError('mensaje')}
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}
