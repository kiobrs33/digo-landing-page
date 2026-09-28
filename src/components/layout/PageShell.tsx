import { useEffect, type ReactNode } from 'react'
import type { Segment } from '@/config/site'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { WhatsAppFab } from '@/components/ui/FloatingActions'
import { ScrollToTopButton } from '@/components/ui/ScrollToTop'

type PageShellProps = {
  children: ReactNode
  /** Título de la pestaña del navegador para esta ruta. */
  title: string
  segment?: Segment
}

export function PageShell({ children, title, segment = 'hogar' }: PageShellProps) {
  useEffect(() => {
    document.title = title
  }, [title])

  const whatsappLabel =
    segment === 'empresas'
      ? `Solicitar cotización por WhatsApp con ${siteConfig.contact.advisorName}`
      : `Solicitar plan por WhatsApp con ${siteConfig.contact.advisorName}`

  return (
    <div className={`page page-bg page--${segment}`}>
      <SiteHeader segment={segment} />
      {children}
      <SiteFooter />
      <ScrollToTopButton />
      <WhatsAppFab href={getWhatsAppHref(segment)} label={whatsappLabel} />
    </div>
  )
}
