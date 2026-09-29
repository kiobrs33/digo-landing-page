export type SocialNetwork = 'facebook' | 'instagram' | 'tiktok' | 'youtube'

export type SocialLink = {
  id: SocialNetwork
  label: string
  href: string | null
}

export type NavLink = {
  href: string
  label: string
}

export type Segment = 'hogar' | 'empresas'

/**
 * El contenido de relleno (datos sin confirmar, testimonios de ejemplo, avisos de
 * desarrollo) solo se muestra en `npm run dev`. En producción se oculta.
 */
export const showPlaceholders = import.meta.env.DEV

export const siteConfig = {
  brand: {
    name: 'Digo Telecom',
    /** Nombre corto de la marca en el header. */
    shortName: 'Digo',
    tagline: '¡Siempre contigo!',
    city: 'Arequipa, Perú',
    website: 'digo.net.pe',
  },
  // Dos números oficiales (septiembre de 2026): el fijo (cuenta de empresa de WhatsApp verificada,
  // también para llamadas) y un celular que atiende WhatsApp y llamadas. Los botones de WhatsApp
  // del sitio usan el fijo. `null` = dato pendiente: se oculta en producción.
  contact: {
    phone: '+5117012341',
    phoneDisplay: '(01) 701-2341',
    mobile: '+51925521741',
    mobileDisplay: '925 521 741',
    email: 'team@digo.net.pe' as string | null,
    address: 'Calle Ambrosio Vucetich 130, Parque Industrial, Arequipa' as string | null,
    // Formato internacional (51 = Perú, 1 = fijo de Lima): sin código de país, wa.me no lo encuentra.
    whatsappHogar: '5117012341',
    whatsappEmpresas: '5117012341',
    whatsappDisplay: '(01) 701-2341',
    advisorName: 'Yudi C.',
  },
  whatsappMessages: {
    hogar: 'Hola Digo Telecom, quiero consultar un plan de fibra óptica para mi hogar en Arequipa.',
    empresas:
      'Hola Digo Telecom, necesito una cotización de internet dedicado para mi empresa en Arequipa.',
    plan: (planName: string) =>
      `Hola Digo Telecom, me interesa el plan ${planName} para mi hogar en Arequipa.`,
    cobertura: (address: string) =>
      `Hola Digo Telecom, quiero consultar cobertura de fibra en: ${address}`,
    contacto: (values: Record<string, string>) =>
      [
        'Hola Digo Telecom, les escribo desde la web.',
        `Nombre: ${values.nombre}`,
        `Teléfono: ${values.telefono}`,
        values.email ? `Correo: ${values.email}` : null,
        `Consulta: ${values.mensaje}`,
      ]
        .filter(Boolean)
        .join('\n'),
    cotizacion: (values: Record<string, string>) =>
      [
        'Hola Digo Telecom, solicito una cotización corporativa.',
        `Razón social: ${values.empresa}`,
        `RUC: ${values.ruc}`,
        `Contacto: ${values.contacto}`,
        `Teléfono: ${values.telefono}`,
        `Requerimientos: ${values.requerimientos}`,
      ].join('\n'),
    reclamo: (values: Record<string, string>) =>
      [
        `Hola Digo Telecom, registro un${values.tipoReclamo === 'queja' ? 'a queja' : ' reclamo'} en el Libro de Reclamaciones.`,
        `Documento: ${values.tipoDocumento.toUpperCase()} ${values.numeroDocumento}`,
        `Nombre o razón social: ${values.nombres}`,
        `Domicilio: ${values.domicilio}`,
        `Correo: ${values.email}`,
        `Teléfono: ${values.telefono}`,
        `Detalle: ${values.detalle}`,
        `Pedido: ${values.pedido}`,
      ].join('\n'),
  },
  osiptelNotice:
    'En cumplimiento de la Ley N° 31207 y la Resolución de Consejo Directivo N° 00138-2021-CD/OSIPTEL, Digo Telecom garantiza el 70% de la velocidad contratada (mínimo garantizado) tanto en subida como en bajada.',
  // `#ancla` = sección de la página del segmento; `/ruta` = vista aparte.
  navHogar: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#planes', label: 'Planes' },
    { href: '#servicios', label: 'Servicios' },
    { href: '/cobertura', label: 'Cobertura' },
    { href: '/medios-de-pago', label: 'Medios de pago' },
    { href: '/preguntas-frecuentes', label: 'Preguntas' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ] satisfies NavLink[],
  navEmpresas: [
    { href: '#empresas-inicio', label: 'Inicio' },
    { href: '#beneficios-empresas', label: 'Beneficios' },
    { href: '#servicios-empresas', label: 'Servicios' },
    { href: '#proceso-empresas', label: 'Proceso' },
    { href: '#cobertura-empresas', label: 'Cobertura' },
    { href: '#contacto-empresas', label: 'Contacto' },
  ] satisfies NavLink[],
  social: [
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/people/Digo-Telecom/61593841747060/',
    },
    { id: 'instagram', label: 'Instagram', href: null },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@digoarequipa' },
    { id: 'youtube', label: 'YouTube', href: null },
  ] as SocialLink[],
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
} as const

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppHref(segment: Segment, message?: string): string {
  const phone =
    segment === 'empresas'
      ? (siteConfig.contact.whatsappEmpresas ??
        siteConfig.contact.whatsappHogar ??
        siteConfig.contact.whatsappDisplay)
      : (siteConfig.contact.whatsappHogar ?? siteConfig.contact.whatsappDisplay)

  const defaultMessage =
    segment === 'empresas'
      ? siteConfig.whatsappMessages.empresas
      : siteConfig.whatsappMessages.hogar

  return buildWhatsAppUrl(phone, message ?? defaultMessage)
}

/** Enlaces del celular oficial (llamada y WhatsApp). */
export function getMobilePhoneHref(): string {
  return `tel:${siteConfig.contact.mobile}`
}

export function getMobileWhatsAppHref(message?: string): string {
  return buildWhatsAppUrl(siteConfig.contact.mobile, message ?? siteConfig.whatsappMessages.hogar)
}

export function getPhoneHref(): string {
  if (siteConfig.contact.phone) {
    return `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`
  }
  return `tel:${siteConfig.contact.phoneDisplay.replace(/\s/g, '')}`
}

export function getPublishedSocialLinks(): SocialLink[] {
  return siteConfig.social.filter((social) => social.href !== null || showPlaceholders)
}
