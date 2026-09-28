import { siteConfig } from '@/config/site'
import { coverageZones, faqItems, homePlans } from '@/data/content'

/** Dirección canónica del sitio: www es la principal (digo.net.pe redirige aquí). */
export const SITE_URL = 'https://www.digo.net.pe'

/** Imagen para vistas previas al compartir (WhatsApp, Facebook): 1200×630. */
export const OG_IMAGE = `${SITE_URL}/brand/og-digo.jpg`

export type PageMeta = {
  path: string
  title: string
  description: string
  /** Incluir en sitemap.xml. */
  indexable: boolean
}

const planSpeeds = homePlans.map((plan) => plan.downloadMbps)
const speedsText =
  planSpeeds.length > 1
    ? `${planSpeeds.slice(0, -1).join(', ')} y ${planSpeeds[planSpeeds.length - 1]} Mbps`
    : `${planSpeeds[0]} Mbps`
const zonesText = coverageZones.map((zone) => zone.name).join(' y ')

/** Una entrada por ruta: única fuente de títulos, descripciones y del sitemap. */
export const pageMeta: PageMeta[] = [
  {
    path: '/',
    title: 'Digo Telecom — Fibra óptica en Arequipa',
    description: `Internet de fibra óptica 100% simétrica en Arequipa: planes de ${speedsText}, TV Digital desde 800 Mbps e instalación gratis en 24 horas.`,
    indexable: true,
  },
  {
    path: '/empresas',
    title: 'Internet dedicado para empresas en Arequipa — Digo Telecom',
    description:
      'Enlaces dedicados simétricos con IP fija, SLA por contrato y soporte 24/7 para empresas e instituciones en Arequipa, Moquegua y Mollendo. Cotización formal con RUC.',
    indexable: true,
  },
  {
    path: '/cobertura',
    title: 'Cobertura de fibra en Arequipa — Digo Telecom',
    description: `Consulta si la fibra óptica de Digo llega a tu dirección. Cobertura activa en ${zonesText}.`,
    indexable: true,
  },
  {
    path: '/medios-de-pago',
    title: 'Medios de pago — Digo Telecom',
    description:
      'Paga tu servicio de Digo Telecom por transferencia o depósito BCP, o con Yape, y envía tu comprobante por WhatsApp.',
    indexable: true,
  },
  {
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes — Digo Telecom',
    description:
      'Respuestas sobre cobertura, velocidad, instalación, router y pagos del internet de fibra óptica de Digo Telecom en Arequipa.',
    indexable: true,
  },
  {
    path: '/libro-de-reclamaciones',
    title: 'Libro de reclamaciones — Digo Telecom',
    description:
      'Registra un reclamo o una queja en el Libro de Reclamaciones virtual de Digo Telecom, conforme a la normativa de INDECOPI y OSIPTEL.',
    indexable: true,
  },
  {
    path: '/terminos-y-condiciones',
    title: 'Términos y condiciones — Digo Telecom',
    description: 'Términos y condiciones del servicio de internet de fibra óptica de Digo Telecom.',
    indexable: true,
  },
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Página no encontrada — Digo Telecom',
  description: 'La página que buscas no existe o ya no está disponible.',
  indexable: false,
}

export function getPageMeta(pathname: string): PageMeta {
  return pageMeta.find((page) => page.path === pathname) ?? notFoundMeta
}

export function canonicalUrl(path: string) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

/** "S/ 59.00" → "59.00" */
function priceNumber(display: string) {
  return display.replace(/[^\d.]/g, '')
}

/** Negocio local con los datos verificados de contacto (perfil de WhatsApp Business de Digo). */
function businessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#negocio`,
    name: siteConfig.brand.name,
    slogan: siteConfig.brand.tagline,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/digo-logo-256.png`,
    image: OG_IMAGE,
    telephone: '+51 1 7012341',
    email: siteConfig.contact.email ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Ambrosio Vucetich 130, Parque Industrial',
      addressLocality: 'Arequipa',
      addressRegion: 'Arequipa',
      addressCountry: 'PE',
    },
    areaServed: coverageZones.map((zone) => ({ '@type': 'Place', name: `${zone.name}, Arequipa` })),
    priceRange: `S/ ${Math.min(...homePlans.map((plan) => Number(priceNumber(plan.priceDisplay))))}–${Math.max(...homePlans.map((plan) => Number(priceNumber(plan.priceDisplay))))}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Planes de fibra óptica para el hogar',
      itemListElement: homePlans.map((plan) => ({
        '@type': 'Offer',
        name: `Fibra Digo ${plan.name}${plan.tvPackage ? ` + ${plan.tvPackage}` : ''}`,
        price: priceNumber(plan.priceDisplay),
        priceCurrency: 'PEN',
        url: `${SITE_URL}/#planes`,
      })),
    },
  }
}

function breadcrumbSchema(page: PageMeta) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title.split(' — ')[0],
        item: canonicalUrl(page.path),
      },
    ],
  }
}

function faqSchema() {
  return {
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** JSON-LD de la ruta: el negocio en la portada; migas en las demás; FAQ donde corresponde. */
export function structuredData(page: PageMeta) {
  const graph: object[] = [businessSchema()]
  if (page.path !== '/') graph.push(breadcrumbSchema(page))
  if (page.path === '/preguntas-frecuentes') graph.push(faqSchema())
  return { '@context': 'https://schema.org', '@graph': graph }
}
