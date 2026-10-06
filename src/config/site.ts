import { type CmsSocialNetwork, imageUrl, siteContent } from '@/data/cms'

export type SocialLink = {
  id: string
  network: CmsSocialNetwork
  label: string
  href: string
  /** Ícono propio subido en el panel; si falta, se usa el oficial de la red. */
  iconUrl: string | null
}

export type NavLink = {
  href: string
  label: string
}

/**
 * El contenido de relleno (datos sin confirmar, testimonios de ejemplo, avisos de
 * desarrollo) solo se muestra en `npm run dev`. En producción se oculta.
 */
export const showPlaceholders = import.meta.env.DEV

const { company } = siteContent

/** Sitio de DIGO EMPRESAS (otro dominio). */
export const empresasUrl = import.meta.env.VITE_EMPRESAS_URL || 'https://digoempresas.pe'

/** API de digo-landing-backend (formularios). Vacía = mismo origen (`/api`, proxy en local). */
export const apiUrl = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

// Marca, contacto y redes: se editan en el panel (Contenido → Datos de la empresa / Redes).
export const siteConfig = {
  brand: {
    name: company.name,
    /** Nombre corto de la marca en el header. */
    shortName: company.shortName,
    tagline: company.tagline,
    city: 'Arequipa, Perú',
    website: company.website,
    legalName: company.legalName,
    ruc: company.ruc,
    logoUrl: company.logo ? imageUrl(company.logo.url, 128) : '/brand/digo-logo-128.png',
  },
  contact: {
    phone: company.phone,
    phoneDisplay: company.phoneDisplay,
    mobile: company.mobile,
    mobileDisplay: company.mobileDisplay,
    email: company.email,
    address: company.address,
    // Formato internacional (51 = Perú): sin código de país, wa.me no lo encuentra.
    whatsapp: company.whatsapp,
    whatsappDisplay: company.whatsappDisplay,
    advisorName: company.advisorName,
  },
  whatsappMessages: {
    hogar: 'Hola Digo Telecom, quiero consultar un plan de fibra óptica para mi hogar en Arequipa.',
    plan: (planName: string) =>
      `Hola Digo Telecom, me interesa el plan ${planName} para mi hogar en Arequipa.`,
    /** Consulta de cobertura desde el mapa; con ubicación, lleva dirección y coordenadas. */
    cobertura: (location?: { address: string | null; lat: number; lng: number; zone?: string }) => {
      if (!location) return 'Hola Digo Telecom, quiero consultar si tienen cobertura de fibra en mi dirección.'
      const lat = location.lat.toFixed(6)
      const lng = location.lng.toFixed(6)
      return [
        'Hola Digo Telecom, quiero consultar cobertura de fibra en mi ubicación.',
        location.address ? `Dirección aproximada: ${location.address}` : null,
        `Latitud: ${lat}`,
        `Longitud: ${lng}`,
        `Mapa: https://maps.google.com/?q=${lat},${lng}`,
        location.zone ? `(Según la web estoy dentro de la zona ${location.zone}.)` : null,
      ]
        .filter(Boolean)
        .join('\n')
    },
    /** Desde el libro de reclamaciones: soporte técnico antes de registrar una hoja. */
    soporte: 'Hola Digo Telecom, necesito soporte técnico: tengo una falla en mi servicio.',
    /** Tras dejar una consulta en el formulario, para seguir la conversación por WhatsApp. */
    seguimiento: (name: string) =>
      `Hola Digo Telecom, soy ${name}. Acabo de dejarles una consulta en la web.`,
  },
  osiptelNotice:
    'En cumplimiento de la Ley N° 31207 y la Resolución de Consejo Directivo N° 00138-2021-CD/OSIPTEL, Digo Telecom garantiza el 70% de la velocidad contratada (mínimo garantizado) tanto en subida como en bajada.',
  // `#ancla` = sección de la página de inicio; `/ruta` = vista aparte. "Medios de pago" va en el
  // menú principal: es de lo que más preguntan los clientes.
  nav: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#planes', label: 'Planes' },
    { href: '/cobertura', label: 'Cobertura' },
    { href: '/medios-de-pago', label: 'Medios de pago' },
    { href: '/preguntas-frecuentes', label: 'Preguntas' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ] satisfies NavLink[],
  social: siteContent.social.map(
    (link): SocialLink => ({
      id: link.id,
      network: link.network,
      label: link.label,
      href: link.url,
      iconUrl: link.icon ? imageUrl(link.icon.url, 64) : null,
    }),
  ),
  pages: [
    { href: '/cobertura', label: 'Cobertura' },
    { href: '/medios-de-pago', label: 'Medios de pago' },
    { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
    { href: '/nosotros', label: 'Nosotros' },
  ] satisfies NavLink[],
  legal: [
    { href: '/libro-de-reclamaciones', label: 'Libro de reclamaciones' },
    { href: '/terminos-y-condiciones', label: 'Términos y condiciones' },
  ],
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppHref(message?: string): string {
  return buildWhatsAppUrl(siteConfig.contact.whatsapp, message ?? siteConfig.whatsappMessages.hogar)
}

/** Enlaces del celular oficial (llamada y WhatsApp); null si no hay celular configurado. */
export function getMobilePhoneHref(): string | null {
  return siteConfig.contact.mobile ? `tel:${siteConfig.contact.mobile}` : null
}

export function getMobileWhatsAppHref(message?: string): string | null {
  const { mobile } = siteConfig.contact
  return mobile ? buildWhatsAppUrl(mobile, message ?? siteConfig.whatsappMessages.hogar) : null
}

/** Uno de los números oficiales: los dos sirven para llamar y para WhatsApp. */
export type OfficialNumber = { id: 'fijo' | 'celular'; label: string; display: string; tel: string; whatsapp: string }

/** Los dos números oficiales de Digo (fijo y celular), cada uno con llamada y WhatsApp. */
export function officialNumbers(message?: string): OfficialNumber[] {
  const { phone, phoneDisplay, mobile, mobileDisplay } = siteConfig.contact
  const text = message ?? siteConfig.whatsappMessages.hogar
  const numbers: OfficialNumber[] = [
    {
      id: 'fijo',
      label: 'Teléfono fijo',
      display: phoneDisplay,
      tel: `tel:${phone.replace(/\s/g, '')}`,
      whatsapp: buildWhatsAppUrl(phone, text),
    },
  ]
  if (mobile && mobileDisplay) {
    numbers.push({ id: 'celular', label: 'Celular', display: mobileDisplay, tel: `tel:${mobile}`, whatsapp: buildWhatsAppUrl(mobile, text) })
  }
  return numbers
}

export function getPhoneHref(): string {
  return `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`
}
