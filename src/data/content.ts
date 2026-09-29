import { showPlaceholders } from '@/config/site'
import { districtBoundaries } from '@/data/districtBoundaries'

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
  promo?: { priceDisplay: string; months: number }
}

/**
 * Planes de Hogar según el volante oficial de Digo (septiembre de 2026). Los beneficios comunes a
 * todos los planes van en `homePlanShared`; aquí solo lo que distingue a cada uno (la TV).
 */

export const homePlans: HomePlan[] = [
  {
    id: '500',
    name: '500 Mbps',
    downloadMbps: 500,
    uploadMbps: 500,
    priceDisplay: 'S/ 59.00',
    features: ['Ideal si solo necesitas internet en casa'],
  },
  {
    id: '800',
    name: '800 Mbps',
    downloadMbps: 800,
    uploadMbps: 800,
    priceDisplay: 'S/ 69.00',
    features: ['Más de 130 canales HD', 'Canales nacionales, noticias, deportes y entretenimiento'],
    tvPackage: 'TV Digital Full',
  },
  {
    id: '1000',
    name: '1000 Mbps',
    downloadMbps: 1000,
    uploadMbps: 1000,
    priceDisplay: 'S/ 89.00',
    features: [
      'Más de 130 canales HD',
      'Cine y series premium, deportes internacionales y documentales',
    ],
    highlighted: true,
    badge: 'Recomendado',
    tvPackage: 'TV Digital Premium',
    promo: { priceDisplay: 'S/ 44.50', months: 3 },
  },
]

/** Lo que traen todos los planes de Hogar (volante oficial). */
export const homePlanShared = [
  '100% fibra óptica',
  'Conexión simétrica',
  'Internet estable y rápido',
  'Soporte 24/7',
  'Instalación gratis en 24 horas',
]

/** Condiciones de la promoción, tal como las imprime el volante. */
export const homePlanPromoTerms =
  'Promoción de S/ 44.50 válida para el plan de 1000 Mbps durante los 3 primeros meses. Precio regular: S/ 89.00/mes. Aplican términos y condiciones.'

export type Benefit = {
  id: string
  title: string
  description: string
}

/** Beneficios de Hogar: todos salen de afirmaciones ya presentes en planes, FAQ y OSIPTEL. */
export const homeBenefits: Benefit[] = [
  {
    id: 'simetrica',
    title: 'Fibra 100% simétrica',
    description: 'La misma velocidad para subir y bajar: videollamadas y archivos sin espera.',
  },
  {
    id: 'instalacion',
    title: 'Instalación gratis',
    description: 'Llevamos la fibra hasta tu casa en 24 horas, sin costo de instalación.',
  },
  {
    id: 'router',
    title: 'Router WiFi incluido',
    description: 'Viene con todos los planes hogar, listo para usar.',
  },
  {
    id: 'garantia',
    title: '70% de velocidad garantizada',
    description: 'Mínimo garantizado en subida y bajada, según la normativa de OSIPTEL.',
  },
  {
    id: 'soporte',
    title: 'Soporte 24/7 desde Arequipa',
    description: 'Un equipo local que atiende todos los días y conoce tu zona.',
  },
]

export type HomeService = {
  id: string
  title: string
  description: string
  options: { label: string; detail: string }[]
}

export const homeServices: HomeService[] = [
  {
    id: 'internet',
    title: 'Internet de fibra óptica',
    description: 'Conexión 100% fibra hasta tu hogar, con velocidad simétrica.',
    options: [
      { label: '500 Mbps', detail: 'Solo internet' },
      { label: '800 Mbps', detail: 'Incluye TV Digital Full' },
      { label: '1000 Mbps', detail: 'Incluye TV Digital Premium' },
    ],
  },
  {
    id: 'tv',
    title: 'TV Digital',
    description: 'Más de 130 canales HD, incluidos con los planes de 800 y 1000 Mbps.',
    options: [
      { label: 'TV Digital Full', detail: 'Con el plan de 800 Mbps' },
      { label: 'TV Digital Premium', detail: 'Con el plan de 1000 Mbps' },
    ],
  },
]

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
    description: 'Busca tu dirección en el mapa o escríbenos por WhatsApp.',
  },
  {
    id: 'plan',
    step: '2',
    title: 'Elige tu plan',
    description: 'Escoge 500, 800 o 1000 Mbps y confírmalo con un asesor.',
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

/** Beneficios corporativos, tomados de los antiguos planes dedicados y del proceso B2B. */
export const businessBenefits: Benefit[] = [
  {
    id: 'ancho-banda',
    title: 'Ancho de banda garantizado',
    description: 'Enlaces dedicados de uso exclusivo, sin compartición, de 100 Mbps a 1 Gbps.',
  },
  {
    id: 'ip',
    title: 'IP pública fija',
    description: 'Desde una IP fija hasta bloques de IP dedicados para tus servidores.',
  },
  {
    id: 'sla',
    title: 'SLA por contrato',
    description: 'Disponibilidad de 99.5% a 99.9% por escrito, con penalidades en 1 Gbps.',
  },
  {
    id: 'soporte',
    title: 'Soporte prioritario 24/7',
    description: 'Línea directa para incidencias corporativas, a cualquier hora.',
  },
  {
    id: 'monitoreo',
    title: 'Monitoreo del enlace',
    description: 'Seguimiento activo de tu conexión desde el primer día.',
  },
  {
    id: 'evaluacion',
    title: 'Evaluación técnica en sitio',
    description: 'Un ingeniero valida la factibilidad antes de emitir la propuesta con RUC.',
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

/**
 * Galería de la página Nosotros. Para agregar una foto o un video: copia el archivo en
 * `public/nosotros/` (o súbelo a Cloudinary) y añade una entrada aquí. Las categorías vacías
 * no se muestran. Las más recientes van primero.
 */
export const aboutMedia: AboutMedia[] = [
  {
    id: 'tendido-poste',
    type: 'image',
    category: 'proyectos',
    src: '/nosotros/tendido-poste.webp',
    thumb: '/nosotros/tendido-poste-640.webp',
    width: 700,
    height: 1035,
    alt: 'Técnico de Digo sobre una escalera trabajando en la caja de fibra de un poste; abajo, otro técnico junto a la camioneta de Digo',
    caption: 'Ampliamos la red de fibra óptica en las calles de Arequipa.',
  },
  {
    id: 'fusion-fibra',
    type: 'image',
    category: 'proyectos',
    src: '/nosotros/fusion-fibra.webp',
    thumb: '/nosotros/fusion-fibra-640.webp',
    width: 820,
    height: 670,
    alt: 'Dos técnicos con casco y chaleco naranja fusionan fibra óptica con una empalmadora',
    caption: 'Fusión de fibra óptica: así llevamos la conexión hasta más hogares.',
  },
  {
    id: 'stand-arequipa',
    type: 'image',
    category: 'actividades',
    src: '/nosotros/stand-arequipa.webp',
    thumb: '/nosotros/stand-arequipa-640.webp',
    width: 850,
    height: 870,
    alt: 'Stand de Digo Telecom con banderas y banners, un asesor atiende a dos vecinos',
    caption: 'Nuestro stand en Arequipa: atención personalizada, cara a cara.',
  },
]

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

export type PromoSlide = {
  id: string
  image: {
    src: string
    alt: string
  }
  /** Destino al hacer clic en la imagen (opcional) */
  href?: string
}

export const promoSlides: PromoSlide[] = [
  {
    id: 'promo-1',
    image: {
      src: '/promociones/digo-promo-1.jpg',
      alt: 'Nuevo plan de 1000 megas por S/ 44.50 los primeros 2 meses, con streaming incluido',
    },
    href: '#planes',
  },
  {
    id: 'promo-2',
    image: {
      src: '/promociones/digo-promo-2.jpg',
      alt: 'Saludo de Fiestas Patrias: ¡Viva Perú! con la mascota de Digo',
    },
  },
  {
    id: 'promo-3',
    image: {
      src: '/promociones/digo-promo-3.jpg',
      alt: 'Saludo por el Día del Padre: un padre y su hija frente a una laptop',
    },
  },
  {
    id: 'promo-4',
    image: {
      src: '/promociones/digo-promo-4.jpg',
      alt: 'Saludo por el Día de la Madre: una madre y su hija sonriendo',
    },
  },
  {
    id: 'promo-5',
    image: {
      src: '/promociones/digo-promo-5.jpg',
      alt: 'Zonas de cobertura, parte 2: ahora estamos más cerca de ti. Contáctanos al (01) 701-2341',
    },
    href: '/cobertura',
  },
]

/**
 * Cartel publicitario del hero de Hogar: el único lugar de promociones del sitio. Solo piezas
 * comerciales vigentes. El texto repite la oferta en HTML para que no viva solo en la imagen.
 */
export type HeroAd = {
  id: string
  image: PromoSlide['image']
  title: string
  detail: string
  cta:
    | { kind: 'whatsapp'; label: string; planName: string }
    | { kind: 'link'; label: string; href: string }
}

export const heroAds: HeroAd[] = [
  {
    id: 'ad-yape-servicios',
    // Pieza oficial "Paga tu recibo DIGO en Yape" (temporada Halloween 2026). El DNI del ejemplo
    // del paso 3 está desenfocado en el archivo publicado.
    image: {
      src: '/promociones/digo-yape-servicios.jpg',
      alt: 'Paga tu recibo Digo en Yape en 5 pasos: entra a Yape, busca DIGO, ingresa tu DNI o RUC, selecciona tu recibo y listo. No es necesario enviar comprobante.',
    },
    title: 'Paga tu recibo en Yape',
    detail: 'Busca “DIGO” en Yape Servicios. Se registra solo: no envíes comprobante.',
    cta: { kind: 'link', label: 'Ver cómo', href: '/medios-de-pago' },
  },
  {
    id: 'ad-1000',
    image: promoSlides[0].image,
    title: '1000 Mbps a S/ 44.50/mes',
    // Condiciones del volante oficial. La pieza digital dice "x2 meses": está desactualizada.
    detail: 'Los 3 primeros meses, con TV Digital Premium. Luego S/ 89.00/mes.',
    cta: { kind: 'whatsapp', label: 'Lo quiero', planName: '1000 Mbps (promoción S/ 44.50)' },
  },
  {
    id: 'ad-cobertura',
    image: promoSlides[4].image,
    title: 'Ahora estamos más cerca de ti',
    detail: 'Fibra activa en Socabaya y el Centro de Arequipa. Busca tu dirección.',
    cta: { kind: 'link', label: 'Ver cobertura', href: '/cobertura' },
  },
]

export const corporateProcessSteps: ProcessStep[] = [
  {
    id: 'requerimiento',
    step: '01',
    title: 'Cuéntanos tu requerimiento',
    description:
      'Completa el formulario o escríbenos por WhatsApp con el ancho de banda, sedes y nivel de SLA que necesitas.',
  },
  {
    id: 'evaluacion',
    step: '02',
    title: 'Evaluación técnica en sitio',
    description:
      'Un ingeniero valida factibilidad de enlace dedicado en tu dirección y define la mejor arquitectura de red.',
  },
  {
    id: 'propuesta',
    step: '03',
    title: 'Propuesta formal con SLA',
    description:
      'Recibes una cotización con RUC, ancho de banda garantizado, IPs fijas y condiciones de disponibilidad por escrito.',
  },
  {
    id: 'activacion',
    step: '04',
    title: 'Instalación y activación',
    description:
      'Coordinamos la instalación del enlace y activamos monitoreo y soporte prioritario desde el día uno.',
  },
]

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

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'simetrico',
    question: '¿Qué significa fibra 100% simétrica?',
    answer:
      'Significa que la velocidad de subida y bajada es la misma. Si contratas 500 Mbps, tienes 500 Mbps para descargar y 500 Mbps para subir fotos, videollamadas o copias de seguridad.',
  },
  {
    id: 'cobertura',
    question: '¿En qué zonas de Arequipa tienen cobertura?',
    answer:
      'Hoy tenemos cobertura activa en Socabaya y en el Centro de Arequipa. Busca tu dirección en nuestra página de cobertura o escríbenos por WhatsApp si estás cerca de esas zonas.',
  },
  {
    id: 'instalacion',
    question: '¿Cuánto demora la instalación?',
    answer:
      'Instalamos en 24 horas y la instalación es gratis. Aplica en zonas con cobertura confirmada: consulta tu dirección antes de contratar.',
  },
  {
    id: 'router',
    question: '¿Incluyen router WiFi?',
    answer:
      'Sí, todos nuestros planes hogar incluyen router WiFi. El modelo puede variar según el plan contratado y la disponibilidad de equipos.',
  },
  {
    id: 'osiptel',
    question: '¿Cuál es la velocidad mínima garantizada?',
    answer:
      'Garantizamos el 70% de la velocidad contratada en subida y bajada, conforme a la normativa OSIPTEL vigente.',
  },
  {
    id: 'contrato',
    question: '¿Hay permanencia mínima?',
    answer:
      'Las condiciones de permanencia dependen del plan y promoción vigente. Te informamos todo antes de firmar — sin letra pequeña escondida.',
  },
  {
    id: 'empresas',
    question: '¿Ofrecen internet para empresas?',
    answer:
      'Sí. Visita la sección Para Empresas para ver planes dedicados con IP fija, SLAs y cotización formal con RUC.',
  },
  {
    id: 'pago',
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'La forma más rápida es Yape Servicios: busca “DIGO”, ingresa el DNI o RUC del titular y paga tu recibo; se registra solo. También puedes pagar por transferencia o depósito en BCP, o yapeando al número de Digo, y enviarnos el comprobante por WhatsApp. Encuentra los datos en la página de medios de pago.',
  },
]

export type CoverageZone = {
  id: string
  name: string
  keywords: string[]
  color: string
  coordinates: [number, number][]
}

export const coverageZones: CoverageZone[] = [
  {
    id: 'socabaya',
    name: 'Socabaya',
    keywords: ['socabaya', 'alto socabaya', 'la paz', 'polvorines'],
    color: '#de087e',
    coordinates: districtBoundaries.socabaya,
  },
  {
    id: 'centro',
    name: 'Centro de Arequipa',
    keywords: [
      'centro',
      'cercado',
      'arequipa centro',
      'plaza de armas',
      'san lázaro',
      'yanahuara centro',
    ],
    color: '#3552c4',
    coordinates: districtBoundaries.centro,
  },
]

export type CorporateServiceIcon = 'wifi' | 'router' | 'shield' | 'phone' | 'server' | 'mappin'

export type CorporateService = {
  id: string
  title: string
  description: string
  icon: CorporateServiceIcon
}

export const corporateServices: CorporateService[] = [
  {
    id: 'ip-transito',
    title: 'IP Tránsito para ISP',
    description: 'Salida a internet mayorista para proveedores locales, con capacidad escalable.',
    icon: 'wifi',
  },
  {
    id: 'dedicado',
    title: 'Servicios dedicados para empresas',
    description:
      'Enlaces simétricos de uso exclusivo, sin compartición, con ancho de banda garantizado.',
    icon: 'router',
  },
  {
    id: 'seguridad-gestionada',
    title: 'Seguridad gestionada',
    description:
      'Protección y monitoreo de tu red corporativa, administrados por nuestro equipo técnico.',
    icon: 'shield',
  },
  {
    id: 'central-telefonica',
    title: 'Central telefónica',
    description: 'Telefonía IP corporativa integrada a tu enlace dedicado.',
    icon: 'phone',
  },
  {
    id: 'interconexion',
    title: 'Interconexión de servidores',
    description: 'Enlaces punto a punto entre sedes o centros de datos para tu infraestructura.',
    icon: 'server',
  },
  {
    id: 'colocacion',
    title: 'Colocación de equipos',
    description:
      'Alojamiento de tus equipos por ubicación, con condiciones adecuadas para su operación.',
    icon: 'mappin',
  },
]

/** Ciudades del sur del Perú con cobertura corporativa (coordenadas de centro de ciudad) */
export type CorporateCoverageCity = {
  id: string
  name: string
  coordinates: [number, number]
}

export const corporateCoverageCities: CorporateCoverageCity[] = [
  { id: 'arequipa', name: 'Arequipa', coordinates: [-16.409, -71.5375] },
  { id: 'moquegua', name: 'Moquegua', coordinates: [-17.1938, -70.9347] },
  { id: 'mollendo', name: 'Mollendo', coordinates: [-17.0206, -72.0151] },
]

export type CoverageResult = 'in-zone' | 'maybe' | 'out-of-zone' | 'empty'

/**
 * Distritos de Arequipa Metropolitana sin cobertura confirmada. Nombrarlos da "maybe" (escríbenos
 * para verificar) en lugar de "out-of-zone", aunque no se escriba la palabra "Arequipa".
 */
const arequipaDistricts = [
  'alto selva alegre',
  'cayma',
  'cerro colorado',
  'characato',
  'chiguata',
  'hunter',
  'jacobo hunter',
  'jose luis bustamante',
  'bustamante y rivero',
  'mariano melgar',
  'miraflores',
  'mollebaya',
  'paucarpata',
  'quequena',
  'sabandia',
  'sachaca',
  'selva alegre',
  'tiabaya',
  'uchumayo',
  'yanahuara',
  'yura',
]

/** Minúsculas y sin tildes: "San Lázaro" y "san lazaro" se comparan igual. */
function normalizeAddress(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

/**
 * Coincidencia por palabras clave, de lo más específico a lo más general. "Centro" solo cuenta
 * si la dirección no nombra otro distrito: "Cayma, frente al centro comercial" no es el Centro.
 */
export function checkCoverage(address: string): { result: CoverageResult; zone?: string } {
  const normalized = normalizeAddress(address)
  if (!normalized) return { result: 'empty' }

  const GENERIC = 'centro'
  for (const zone of coverageZones) {
    const specific = zone.keywords.map(normalizeAddress).filter((keyword) => keyword !== GENERIC)
    if (specific.some((keyword) => normalized.includes(keyword))) {
      return { result: 'in-zone', zone: zone.name }
    }
  }

  if (arequipaDistricts.some((district) => normalized.includes(district))) {
    return { result: 'maybe' }
  }

  const genericZone = coverageZones.find((zone) => zone.keywords.includes(GENERIC))
  if (genericZone && normalized.includes(GENERIC)) {
    return { result: 'in-zone', zone: genericZone.name }
  }

  if (normalized.includes('arequipa')) {
    return { result: 'maybe' }
  }

  return { result: 'out-of-zone' }
}

export type LegalReference = {
  id: string
  name: string
  number: string
  summary: string
  href: string
}

/**
 * Normas aplicables a reclamos de usuarios de internet en Perú, verificadas en fuentes
 * oficiales en septiembre de 2026. Revisar antes de cada lanzamiento: OSIPTEL las actualiza.
 */
export const telecomLaws: LegalReference[] = [
  {
    id: 'ley-29571',
    name: 'Código de Protección y Defensa del Consumidor',
    number: 'Ley N° 29571',
    summary: 'Reconoce tus derechos como consumidor, incluido el Libro de Reclamaciones.',
    href: 'https://www.gob.pe/institucion/indecopi/normas-legales/1244218-29571',
  },
  {
    id: 'ley-31435',
    name: 'Plazo de atención de reclamos',
    number: 'Ley N° 31435',
    summary: 'El proveedor debe responder tu reclamo en máximo 15 días hábiles.',
    href: 'https://busquedas.elperuano.pe/dispositivo/NL/2050405-1',
  },
  {
    id: 'ds-011-2011',
    name: 'Reglamento del Libro de Reclamaciones',
    number: 'D.S. N° 011-2011-PCM y modificatorias',
    summary: 'Regula cómo registrar tu reclamo o queja y cómo debe responderte el proveedor.',
    href: 'https://busquedas.elperuano.pe/dispositivo/NL/2095978-1',
  },
  {
    id: 'res-099-2022',
    name: 'Reglamento de Gestiones y Reclamos de Usuarios de Telecomunicaciones',
    number: 'Res. N° 099-2022-CD/OSIPTEL',
    summary: 'Procedimiento para reclamos por calidad, cortes, facturación o instalación.',
    href: 'https://www.osiptel.gob.pe/media/t2adonsc/resol99-2022-cd-tuo-reglamento-reclamos.pdf',
  },
  {
    id: 'res-132-2025',
    name: 'Condiciones de Uso de los Servicios Públicos de Telecomunicaciones',
    number: 'Res. N° 132-2025-CD/OSIPTEL',
    summary: 'Tus derechos como abonado: contrato, baja, suspensión y devoluciones.',
    href: 'https://www.osiptel.gob.pe/media/wsgnkgqe/resol132-2025-cd.pdf',
  },
  {
    id: 'ley-31207',
    name: 'Velocidad mínima garantizada de internet',
    number: 'Ley N° 31207',
    summary: 'Tu operador debe garantizarte al menos el 70% de la velocidad contratada.',
    href: 'https://www.leyes.congreso.gob.pe/Documentos/2016_2021/ADLP/Normas_Legales/31207-LEY.pdf',
  },
  {
    id: 'res-214-2024',
    name: 'Reglamento General de Calidad de los Servicios de Telecomunicaciones',
    number: 'Res. N° 214-2024-CD/OSIPTEL',
    summary: 'Cómo se mide y exige la calidad y la velocidad mínima del servicio.',
    href: 'https://www.osiptel.gob.pe/media/mbsnzoiu/resol214-2024-cd.pdf',
  },
  {
    id: 'ds-013-93',
    name: 'Texto Único Ordenado de la Ley de Telecomunicaciones',
    number: 'D.S. N° 013-93-TCC',
    summary: 'Marco legal general de los servicios de telecomunicaciones en el Perú.',
    href: 'https://www.gob.pe/institucion/mtc/normas-legales/10028-013-1993-tcc',
  },
]

export const osiptelUserNormsUrl =
  'https://www.osiptel.gob.pe/portal-del-usuario/lo-que-debes-saber/normativas-de-usuarios/'
