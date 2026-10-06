import { empresasUrl, showPlaceholders } from '@/config/site'
import { type CmsCoverageZone, imageUrl, siteContent } from '@/data/cms'

export type HomePlan = {
  id: string
  name: string
  downloadMbps: number
  uploadMbps: number
  priceDisplay: string
  features: string[]
  highlighted?: boolean
  /** Texto de la insignia del plan destacado (p. ej. "Recomendado"). */
  badge?: string
  /** Paquete de TV Digital incluido en el plan, si aplica */
  tvPackage?: string
  /** Precio promocional vigente: reemplaza al precio en la tarjeta durante `months` meses. */
  promo?: { priceDisplay: string; months: number; percentOff: number }
}

/** Precio en soles para mostrar: "S/ 59.00". */
const formatPrice = (value: number) => `S/ ${value.toFixed(2)}`

/** Planes de Hogar: se editan en el panel (Contenido → Planes). */
export const homePlans: HomePlan[] = siteContent.plans.map((plan) => ({
  id: plan.id,
  name: plan.name,
  downloadMbps: plan.downloadMbps,
  uploadMbps: plan.uploadMbps,
  priceDisplay: formatPrice(plan.price),
  features: plan.features,
  highlighted: plan.highlighted,
  badge: plan.badge ?? undefined,
  tvPackage: plan.tvPackage ?? undefined,
  promo:
    plan.promoPrice !== null && plan.promoMonths !== null
      ? {
          priceDisplay: formatPrice(plan.promoPrice),
          months: plan.promoMonths,
          percentOff: Math.round((1 - plan.promoPrice / plan.price) * 100),
        }
      : undefined,
}))

/** Lo que traen todos los planes de Hogar: volante oficial, más el router y el mínimo de OSIPTEL. */
export const homePlanShared = [
  '100% fibra óptica',
  'Conexión simétrica',
  'Internet estable y rápido',
  'Router WiFi incluido',
  'Instalación gratis en 24 horas',
  'Soporte 24/7',
  '70% de velocidad garantizada',
]

/** Velocidades de los planes para el texto: "500, 800 o 1000 Mbps". */
const planSpeeds = homePlans.map((plan) => plan.downloadMbps)
export const planSpeedsText =
  planSpeeds.length > 1
    ? `${planSpeeds.slice(0, -1).join(', ')} o ${planSpeeds[planSpeeds.length - 1]} Mbps`
    : `${planSpeeds[0]} Mbps`

/** El plan más lento que ya trae TV Digital (undefined si ninguno la trae). */
export const tvFromMbps = homePlans
  .filter((plan) => plan.tvPackage)
  .reduce<number | undefined>((min, plan) => Math.min(min ?? Infinity, plan.downloadMbps), undefined)

/** Condiciones de la promoción, armadas a partir del plan que la tiene. */
const promoPlan = homePlans.find((plan) => plan.promo)
export const homePlanPromoTerms = promoPlan?.promo
  ? `Promoción de ${promoPlan.promo.priceDisplay} válida para el plan de ${promoPlan.name} durante ${
      promoPlan.promo.months === 1 ? 'el primer mes' : `los ${promoPlan.promo.months} primeros meses`
    }. Precio regular: ${promoPlan.priceDisplay}/mes. Aplican términos y condiciones.`
  : ''

export type ProcessStep = {
  id: string
  step: string
  title: string
  description: string
}

export const homeProcessSteps: ProcessStep[] = [
  {
    id: 'cobertura',
    step: '1',
    title: 'Consulta tu cobertura',
    description: 'Revisa el mapa de cobertura o usa tu ubicación; también puedes escribirnos por WhatsApp.',
  },
  {
    id: 'plan',
    step: '2',
    title: 'Elige tu plan',
    description: `Escoge ${planSpeedsText} y confírmalo con un asesor.`,
  },
  {
    id: 'instalacion',
    step: '3',
    title: 'Instalamos en tu casa',
    description: 'Un técnico de Digo instala la fibra y el router WiFi, sin costo.',
  },
  {
    id: 'conexion',
    step: '4',
    title: 'Conéctate',
    description: 'Dejamos todo funcionando, con soporte local cuando lo necesites.',
  },
]

export type PaymentMethod = {
  id: 'bcp' | 'yape'
  name: string
  description: string
  fields: { label: string; value: string; copy?: boolean }[]
  /** Datos ficticios temporales: solo se muestran en desarrollo. */
  example: boolean
}

/** Datos de pago oficiales enviados por Digo (septiembre de 2026). */
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bcp',
    name: 'BCP',
    description: 'Transferencia o depósito en agentes y agencias BCP.',
    fields: [
      { label: 'Cuenta', value: '215-9940053-0-91', copy: true },
      { label: 'CCI', value: '002-215-009940053091-23', copy: true },
      { label: 'Titular', value: 'DIGO TELECOM S.A.C.' },
    ],
    example: false,
  },
  {
    id: 'yape',
    name: 'Yape',
    description: 'Paga desde tu celular al número Yape de Digo.',
    fields: [
      { label: 'Número Yape', value: '977 426 130', copy: true },
      { label: 'Titular', value: 'DIGO TELECOM S.A.C.' },
    ],
    example: false,
  },
]

export type AboutCategory = 'equipo' | 'proyectos' | 'oficinas' | 'actividades'

export const aboutCategories: { id: AboutCategory; label: string }[] = [
  { id: 'equipo', label: 'Equipo' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'oficinas', label: 'Oficinas' },
  { id: 'actividades', label: 'Actividades' },
]

export type AboutMedia = {
  id: string
  type: 'image' | 'video'
  category: AboutCategory
  /**
   * Foto: ruta en `public/nosotros/` (p. ej. `/nosotros/oficina.webp`) o URL de Cloudinary.
   * Video: `.mp4` en `public/nosotros/` o URL de Cloudinary.
   */
  src: string
  /** Versión liviana (~640 px) para la cuadrícula. Si falta, se usa `src` (o `poster`). */
  thumb?: string
  /** Solo videos: imagen de portada que se ve en la cuadrícula. */
  poster?: string
  /** Tamaño original, para reservar el espacio y que la página no salte al cargar. */
  width: number
  height: number
  /** Qué se ve (para lectores de pantalla). */
  alt: string
  /** Texto que acompaña a la foto. */
  caption: string
}

/** Galería de la página Nosotros: se edita en el panel (Contenido → Fotos de Nosotros). */
export const aboutMedia: AboutMedia[] = siteContent.aboutPhotos.map((photo) => ({
  id: photo.id,
  type: 'image',
  category: photo.category.toLowerCase() as AboutCategory,
  src: imageUrl(photo.image.url, 1200),
  thumb: imageUrl(photo.image.url, 640),
  width: photo.image.width,
  height: photo.image.height,
  alt: photo.image.alt,
  caption: photo.caption ?? '',
}))

/**
 * Pago del recibo desde Yape → Servicios (pieza oficial de Digo, septiembre de 2026). Es la vía
 * recomendada: el pago se registra solo, sin enviar comprobante.
 */
export const yapeServicesPayment = {
  name: 'Yape Servicios',
  description: 'Paga tu recibo mensual desde la app de Yape, en menos de un minuto.',
  searchTerm: 'DIGO',
  steps: [
    { title: 'Entra a Yape', detail: 'Abre la app y elige la opción “Servicios”.' },
    { title: 'Busca DIGO', detail: 'En el buscador de servicios escribe “DIGO” y selecciónalo.' },
    {
      title: 'Ingresa el DNI o RUC',
      detail: 'Coloca el DNI o RUC del titular del servicio y pulsa “Continuar”.',
    },
    {
      title: 'Selecciona tu recibo',
      detail:
        'Revisa el recibo pendiente, el monto y la fecha de vencimiento, y pulsa “Yapear Servicio”.',
    },
  ],
  done: {
    title: '¡Listo!',
    detail:
      'Verás la confirmación en Yape. Tu pago se registra automáticamente: no necesitas enviar comprobante.',
  },
}

/** Mensaje con el que se abre WhatsApp para enviar el comprobante. */
export const paymentReceiptMessage =
  'Hola Digo Telecom, les envío el comprobante de pago de mi servicio.'

/**
 * Cartel publicitario del hero de Hogar: el único lugar de promociones del sitio. Se edita en el
 * panel (Contenido → Carrusel). El texto repite la oferta en HTML para que no viva solo en la
 * imagen.
 */
export type HeroAd = {
  id: string
  image: { src: string; alt: string; width: number; height: number }
  title: string
  detail: string
  cta:
    | { kind: 'whatsapp'; label: string; planName: string }
    | { kind: 'link'; label: string; href: string }
    | null
  /** Vigencia programada (ISO); la landing la vuelve a revisar en el navegador. */
  startsAt: string | null
  endsAt: string | null
}

export const heroAds: HeroAd[] = siteContent.carousel.map((slide) => ({
  id: slide.id,
  image: {
    src: slide.image.url,
    alt: slide.image.alt,
    width: slide.image.width,
    height: slide.image.height,
  },
  title: slide.title,
  detail: slide.subtitle ?? '',
  cta:
    slide.ctaKind === 'WHATSAPP' && slide.ctaLabel && slide.ctaValue
      ? { kind: 'whatsapp', label: slide.ctaLabel, planName: slide.ctaValue }
      : slide.ctaKind === 'LINK' && slide.ctaLabel && slide.ctaValue
        ? { kind: 'link', label: slide.ctaLabel, href: slide.ctaValue }
        : null,
  startsAt: slide.startsAt,
  endsAt: slide.endsAt,
}))

export type Testimonial = {
  id: string
  name: string
  district: string
  quote: string
  rating: number
  synthetic: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María Elena R.',
    district: 'Arequipa',
    quote:
      'Por fin internet que mantiene la velocidad prometida. El soporte responde rápido y hablan claro, sin transferencias eternas.',
    rating: 5,
    synthetic: true,
  },
  {
    id: '2',
    name: 'Carlos V.',
    district: 'Arequipa',
    quote:
      'Trabajo remoto y necesitaba subida simétrica. Con Digo la videollamada no se cae y el ping es estable.',
    rating: 5,
    synthetic: true,
  },
  {
    id: '3',
    name: 'Ana Lucía M.',
    district: 'Arequipa',
    quote:
      'Instalaron en dos días. El técnico explicó el router y dejó todo funcionando. Se nota que son de la zona.',
    rating: 5,
    synthetic: true,
  },
]

/** Testimonios que se publican: los de ejemplo (`synthetic`) solo aparecen en desarrollo. */
export const publishedTestimonials = testimonials.filter(
  (item) => !item.synthetic || showPlaceholders,
)

export type FaqCategory = 'servicio' | 'cobertura' | 'pagos'

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: 'servicio', label: 'El servicio' },
  { id: 'cobertura', label: 'Cobertura e instalación' },
  { id: 'pagos', label: 'Contrato y pagos' },
]

export type FaqItem = {
  id: string
  category: FaqCategory
  question: string
  answer: string
  /** Página donde ampliar la respuesta (ruta del sitio o URL externa). */
  link?: { href: string; label: string }
}

export const faqItems: FaqItem[] = [
  {
    id: 'simetrico',
    category: 'servicio',
    question: '¿Qué significa fibra 100% simétrica?',
    answer:
      'Significa que la velocidad de subida y bajada es la misma. Si contratas 500 Mbps, tienes 500 Mbps para descargar y 500 Mbps para subir fotos, videollamadas o copias de seguridad.',
  },
  {
    id: 'cobertura',
    category: 'cobertura',
    link: { href: '/cobertura', label: 'Ver el mapa de cobertura' },
    question: '¿En qué zonas de Arequipa tienen cobertura?',
    answer:
      'Hoy tenemos cobertura activa en Socabaya y en el Centro de Arequipa. Mira las zonas en el mapa o usa tu ubicación para saber si estás dentro; si estás cerca, escríbenos por WhatsApp.',
  },
  {
    id: 'instalacion',
    category: 'cobertura',
    question: '¿Cuánto demora la instalación?',
    answer:
      'Instalamos en 24 horas y la instalación es gratis. Aplica en zonas con cobertura confirmada: consulta tu dirección antes de contratar.',
  },
  {
    id: 'router',
    category: 'servicio',
    question: '¿Incluyen router WiFi?',
    answer:
      'Sí, todos nuestros planes hogar incluyen router WiFi. El modelo puede variar según el plan contratado y la disponibilidad de equipos.',
  },
  {
    id: 'osiptel',
    category: 'servicio',
    question: '¿Cuál es la velocidad mínima garantizada?',
    answer:
      'Garantizamos el 70% de la velocidad contratada en subida y bajada, conforme a la normativa OSIPTEL vigente.',
  },
  {
    id: 'contrato',
    category: 'pagos',
    question: '¿Hay permanencia mínima?',
    answer:
      'Las condiciones de permanencia dependen del plan y promoción vigente. Te informamos todo antes de firmar — sin letra pequeña escondida.',
  },
  {
    id: 'empresas',
    category: 'servicio',
    link: { href: empresasUrl, label: 'Ir a Digo Empresas' },
    question: '¿Ofrecen internet para empresas?',
    answer:
      'Sí. Digo Empresas ofrece enlaces dedicados con IP fija, SLA por contrato y cotización formal con RUC.',
  },
  {
    id: 'pago',
    category: 'pagos',
    link: { href: '/medios-de-pago', label: 'Ver medios de pago' },
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'La forma más rápida es Yape Servicios: busca “DIGO”, ingresa el DNI o RUC del titular y paga tu recibo; se registra solo. También puedes pagar por transferencia o depósito en BCP, o yapeando al número de Digo, y enviarnos el comprobante por WhatsApp. Los datos están en la página de medios de pago.',
  },
]

export type CoverageZone = CmsCoverageZone

/** Zonas del mapa de cobertura, en el orden del panel (Contenido → Zonas de cobertura). */
export const coverageZones: CoverageZone[] = siteContent.coverageZones ?? []

/**
 * Zona que contiene un punto (lat, lng), con el algoritmo de rayo (ray casting) sobre cada
 * polígono. Sirve para "Usar mi ubicación": la posición nunca sale del navegador.
 */
export function zoneAt(lat: number, lng: number): CoverageZone | undefined {
  return coverageZones.find((zone) => zone.rings.some((ring) => ringContains(ring, lat, lng)))
}

function ringContains(points: [number, number][], lat: number, lng: number) {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [latI, lngI] = points[i]
    const [latJ, lngJ] = points[j]
    if (lngI > lng !== lngJ > lng && lat < ((latJ - latI) * (lng - lngI)) / (lngJ - lngI) + latI) {
      inside = !inside
    }
  }
  return inside
}
