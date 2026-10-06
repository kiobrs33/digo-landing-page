import { Link } from 'react-router-dom'
import { PhoneIcon, WhatsAppIcon } from '@/components/icons/Icons'
import { getMobilePhoneHref, getMobileWhatsAppHref, getPhoneHref, getWhatsAppHref, siteConfig } from '@/config/site'
import { HoneypotField } from '@/components/ui/HoneypotField'
import { emailPattern, phonePattern, postToApi, useApiForm } from '@/hooks/useApiForm'
import '@/styles/landing.css'

export function ContactSection() {
  const mobileHref = getMobilePhoneHref()
  const mobileWhatsAppHref = getMobileWhatsAppHref()
  const form = useApiForm({
    fields: {
      nombre: { required: true },
      telefono: { required: true, ...phonePattern },
      email: emailPattern,
      mensaje: {
        required: true,
        check: (value) => (value.length < 5 ? 'Cuéntanos un poco más sobre tu consulta.' : undefined),
      },
      privacidad: { required: true },
    },
    submit: (values) =>
      postToApi<{ id: string }>('/public/contact', {
        site: 'HOGAR',
        name: values.nombre,
        phone: values.telefono,
        email: values.email || undefined,
        message: values.mensaje,
        acceptsPrivacy: values.privacidad === 'on',
        website: values.website,
      }),
  })
  const { handleSubmit, fieldProps, fieldError, serverNotice, submitting, result, statusRef } = form

  return (
    <section id="contacto" className="section contact-section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <header className="section-header">
            <h2 className="section-title">Escríbenos desde Arequipa</h2>
            <p className="section-lead">
              ¿Dudas sobre cobertura, instalación o facturación? Déjanos tu consulta y un asesor de Digo te contacta. Si
              prefieres, escríbenos directo por WhatsApp.
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
                  <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </span>
              </span>
            </li>
            {mobileHref && mobileWhatsAppHref && (
              <li>
                <WhatsAppIcon />
                <span>
                  Celular {siteConfig.contact.mobileDisplay}
                  <span className="contact-channel-actions">
                    <a href={mobileHref}>Llamar</a>
                    <a href={mobileWhatsAppHref} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </span>
                </span>
              </li>
            )}
          </ul>
        </div>

        {result ? (
          <div ref={statusRef} className="contact-form float-card form-result" role="status" tabIndex={-1}>
            <p className="form-result-title">¡Gracias, {result.values.nombre.split(' ')[0]}!</p>
            <p>Recibimos tu consulta. Un asesor de Digo te contactará al {result.values.telefono} lo antes posible.</p>
            <p>¿Prefieres hablar ahora? Escríbenos por WhatsApp y te atendemos en el momento.</p>
            <div className="form-result-actions">
              <a
                href={getWhatsAppHref(siteConfig.whatsappMessages.seguimiento(result.values.nombre))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <WhatsAppIcon />
                Conversar por WhatsApp
              </a>
              <button type="button" className="btn btn-secondary" onClick={form.reset}>
                Enviar otra consulta
              </button>
            </div>
          </div>
        ) : (
          <form className="contact-form float-card" onSubmit={(event) => void handleSubmit(event)} noValidate>
            {serverNotice()}

            <div className="form-field">
              <label htmlFor="contact-nombre">Nombre completo</label>
              <input
                id="contact-nombre"
                type="text"
                autoComplete="name"
                maxLength={120}
                placeholder="Ej. María Quispe Mamani"
                {...fieldProps('nombre')}
              />
              {fieldError('nombre')}
            </div>

            <div className="form-field">
              <label htmlFor="contact-telefono">Teléfono</label>
              <input
                id="contact-telefono"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={20}
                placeholder="Ej. 987 654 321"
                {...fieldProps('telefono')}
              />
              {fieldError('telefono')}
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Correo (opcional)</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="Ej. maria@correo.com"
                {...fieldProps('email')}
              />
              {fieldError('email')}
            </div>

            <div className="form-field">
              <label htmlFor="contact-mensaje">Consulta</label>
              <textarea
                id="contact-mensaje"
                rows={4}
                maxLength={2000}
                placeholder="Ej. Quiero saber si llega la fibra a mi casa en Cayma y cuánto demora la instalación."
                {...fieldProps('mensaje')}
              />
              {fieldError('mensaje')}
            </div>

            <div className="form-field">
              <label className="form-check">
                <input type="checkbox" {...fieldProps('privacidad')} />
                <span>
                  Acepto que Digo Telecom use mis datos solo para responder esta consulta (Ley N° 29733).{' '}
                  <Link to="/terminos-y-condiciones">Ver términos</Link>
                </span>
              </label>
              {fieldError('privacidad')}
            </div>

            <HoneypotField />

            <button type="submit" className="btn btn-primary" disabled={submitting} aria-busy={submitting}>
              {submitting ? 'Enviando…' : 'Enviar consulta'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
