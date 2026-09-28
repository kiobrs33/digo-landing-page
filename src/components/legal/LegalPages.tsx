import { PageIntro } from '@/components/layout/PageIntro'
import { PendingNote } from '@/components/ui/PendingNote'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { osiptelUserNormsUrl, telecomLaws } from '@/data/content'
import { emailPattern, phonePattern, useWhatsAppForm } from '@/hooks/useWhatsAppForm'
import '@/styles/empresas.css'

export function ComplaintsBookForm() {
  const { handleSubmit, fieldProps, fieldError, sentNotice } = useWhatsAppForm({
    fields: {
      tipoDocumento: { required: true },
      numeroDocumento: { required: true },
      nombres: { required: true },
      domicilio: { required: true },
      email: { required: true, ...emailPattern },
      telefono: { required: true, ...phonePattern },
      tipoReclamo: { required: true },
      detalle: { required: true },
      pedido: { required: true },
    },
    buildUrl: (values) => getWhatsAppHref('hogar', siteConfig.whatsappMessages.reclamo(values)),
  })

  return (
    <>
      <form className="legal-form float-card" onSubmit={handleSubmit} noValidate>
        {sentNotice(
          'Abrimos WhatsApp con tu reclamo. Envíalo y guarda la conversación como constancia.',
        )}

        <p className="form-hint">Todos los campos son obligatorios.</p>

        <fieldset>
          <legend>Datos del consumidor</legend>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="tipoDocumento">Tipo de documento</label>
              <select
                id="tipoDocumento"

                defaultValue=""
                {...fieldProps('tipoDocumento')}
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="ruc">RUC</option>
              </select>
              {fieldError('tipoDocumento')}
            </div>
            <div className="form-field">
              <label htmlFor="numeroDocumento">Número de documento</label>
              <input
                id="numeroDocumento"

                {...fieldProps('numeroDocumento')}
              />
              {fieldError('numeroDocumento')}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="nombres">Nombres y apellidos / Razón social</label>
            <input id="nombres" {...fieldProps('nombres')} />
            {fieldError('nombres')}
          </div>

          <div className="form-field">
            <label htmlFor="domicilio">Domicilio</label>
            <input id="domicilio" {...fieldProps('domicilio')} />
            {fieldError('domicilio')}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"

                type="email"
                {...fieldProps('email')}
              />
              {fieldError('email')}
            </div>
            <div className="form-field">
              <label htmlFor="telefono">Teléfono</label>
              <input id="telefono" type="tel" {...fieldProps('telefono')} />
              {fieldError('telefono')}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Detalle del reclamo</legend>
          <div className="form-field">
            <label htmlFor="tipoReclamo">Tipo</label>
            <select
              id="tipoReclamo"

              defaultValue=""
              {...fieldProps('tipoReclamo')}
            >
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="reclamo">Reclamo</option>
              <option value="queja">Queja</option>
            </select>
            {fieldError('tipoReclamo')}
          </div>

          <div className="form-field">
            <label htmlFor="detalle">Detalle</label>
            <textarea
              id="detalle"

              rows={5}
              {...fieldProps('detalle')}
            />
            {fieldError('detalle')}
          </div>

          <div className="form-field">
            <label htmlFor="pedido">Pedido del consumidor</label>
            <textarea id="pedido" rows={3} {...fieldProps('pedido')} />
            {fieldError('pedido')}
          </div>
        </fieldset>

        <p className="legal-form-note">
          {siteConfig.brand.name} responderá dentro de los plazos establecidos por INDECOPI.{' '}
          <PendingNote>Validar campos normativos y registro formal antes de producción</PendingNote>
        </p>

        <button type="submit" className="btn btn-primary">
          Enviar reclamo por WhatsApp
        </button>
      </form>
    </>
  )
}

function LegalFramework() {
  return (
    <aside className="legal-aside" aria-labelledby="marco-legal-title">
      <h2 id="marco-legal-title">Tus derechos y plazos</h2>

      <div className="legal-deadlines">
        <p>
          <strong>Reclamos sobre el servicio de internet</strong> (calidad, cortes, facturación,
          instalación): se atienden según el reglamento de OSIPTEL, en 3, 15 o 20 días hábiles
          según el tema. Si no estás conforme, puedes apelar ante el TRASU.
        </p>
        <p>
          <strong>Otros reclamos y quejas</strong>: te respondemos en un máximo de 15 días
          hábiles.
        </p>
      </div>

      <h3>Normas aplicables</h3>
      <ul className="legal-laws">
        {telecomLaws.map((law) => (
          <li key={law.id}>
            <a href={law.href} target="_blank" rel="noopener noreferrer">
              <span className="legal-law-number">{law.number}</span>
              <span className="legal-law-name">{law.name}</span>
            </a>
            <p>{law.summary}</p>
          </li>
        ))}
      </ul>

      <p className="legal-aside-more">
        Consulta todas las normas para usuarios en el{' '}
        <a href={osiptelUserNormsUrl} target="_blank" rel="noopener noreferrer">
          portal de OSIPTEL
        </a>
        .
      </p>
    </aside>
  )
}

export function ComplaintsBookPageContent() {
  return (
    <main id="contenido" tabIndex={-1}>
      <PageIntro title="Libro de reclamaciones">
        <p>
          Conforme al Código de Protección y Defensa del Consumidor, {siteConfig.brand.name} pone a
          tu disposición este libro virtual para registrar reclamos y quejas.
        </p>
      </PageIntro>

      <div className="container legal-layout">
        <ComplaintsBookForm />
        <LegalFramework />
      </div>
    </main>
  )
}
