import { CorporateBenefitsSection } from '@/components/empresas/CorporateBenefitsSection'
import { CorporateCoverageSection } from '@/components/empresas/CorporateCoverageSection'
import { CorporateProcessSection } from '@/components/empresas/CorporateProcessSection'
import { CorporateServicesSection } from '@/components/empresas/CorporateServicesSection'
import { EmpresasHeroSection } from '@/components/empresas/EmpresasHeroSection'
import { CheckCircleIcon, ClockIcon, HeadsetIcon } from '@/components/icons/Icons'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { phonePattern, useWhatsAppForm } from '@/hooks/useWhatsAppForm'
import '@/styles/empresas.css'

export function EmpresasPageContent() {
  const { handleSubmit, fieldProps, fieldError, sentNotice } = useWhatsAppForm({
    fields: {
      empresa: { required: true },
      ruc: {
        required: true,
        pattern: /^\d{11}$/,
        patternMessage: 'El RUC tiene 11 dígitos, sin espacios ni guiones.',
      },
      contacto: { required: true },
      telefono: { required: true, ...phonePattern },
      requerimientos: { required: true },
    },
    buildUrl: (values) =>
      getWhatsAppHref('empresas', siteConfig.whatsappMessages.cotizacion(values)),
  })

  return (
    <main id="contenido" tabIndex={-1}>
      <EmpresasHeroSection />

      <CorporateBenefitsSection />

      <CorporateServicesSection />

      <CorporateProcessSection />

      <CorporateCoverageSection />

      <section id="contacto-empresas" className="section empresas-form-section">
        <div className="container empresas-form-grid">
          <div className="empresas-form-copy">
            <header className="section-header">
              <h2 className="section-title">Formulario de cotización</h2>
              <p className="section-lead">
                Completa los datos de tu empresa. Un asesor B2B te contactará con una propuesta
                formal.
              </p>
            </header>

            <ul className="empresas-form-assurance">
              <li>
                <CheckCircleIcon />
                <span>Respuesta de un asesor corporativo en menos de 24 horas hábiles</span>
              </li>
              <li>
                <HeadsetIcon />
                <span>
                  ¿Prefieres hablar directo? Escribe a{' '}
                  <strong>{siteConfig.contact.advisorName}</strong> al{' '}
                  {siteConfig.contact.whatsappDisplay}
                </span>
              </li>
              <li>
                <ClockIcon />
                <span>Evaluación técnica en sitio antes de emitir la propuesta final</span>
              </li>
            </ul>
          </div>

          <form className="empresas-form" onSubmit={handleSubmit} noValidate>
            {sentNotice(
              `Abrimos WhatsApp con tu solicitud para ${siteConfig.contact.advisorName}. Envía el mensaje para recibir tu propuesta.`,
            )}

            <p className="form-hint">Todos los campos son obligatorios.</p>

            <div className="form-field">
              <label htmlFor="empresa">Razón social</label>
              <input
                id="empresa"
                type="text"
                autoComplete="organization"
                {...fieldProps('empresa')}
              />
              {fieldError('empresa')}
            </div>

            <div className="form-field">
              <label htmlFor="ruc">RUC</label>
              <input
                id="ruc"
                type="text"
                inputMode="numeric"
                placeholder="11 dígitos"
                {...fieldProps('ruc')}
              />
              {fieldError('ruc')}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contacto">Persona de contacto</label>
                <input id="contacto" type="text" autoComplete="name" {...fieldProps('contacto')} />
                {fieldError('contacto')}
              </div>

              <div className="form-field">
                <label htmlFor="telefono">Teléfono</label>
                <input id="telefono" type="tel" autoComplete="tel" {...fieldProps('telefono')} />
                {fieldError('telefono')}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="requerimientos">Requerimientos técnicos</label>
              <textarea
                id="requerimientos"
                rows={4}
                placeholder="Ej: 500 Mbps dedicado, 2 IPs fijas, SLA 99.7%, sede en Arequipa"
                {...fieldProps('requerimientos')}
              />
              {fieldError('requerimientos')}
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar solicitud por WhatsApp
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
