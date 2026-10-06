import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons/Icons'
import { getWhatsAppHref, officialNumbers } from '@/config/site'
import { faqCategories, faqItems, type FaqItem } from '@/data/content'
import '@/styles/landing.css'

const groups = faqCategories
  .map((category) => ({ ...category, items: faqItems.filter((item) => item.category === category.id) }))
  .filter((group) => group.items.length > 0)

const anchorOf = (id: string) => `pregunta-${id}`

/**
 * Preguntas frecuentes por tema. Varias pueden estar abiertas a la vez; cada pregunta tiene su
 * propio enlace (#pregunta-…) que la abre al llegar. A la izquierda, el índice de temas y la
 * ayuda directa para lo que no esté aquí.
 */
export function FaqSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([faqItems[0]?.id ?? '']))

  // Enlace directo a una pregunta: se abre y se desplaza a ella.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace('#pregunta-', '')
      if (!faqItems.some((item) => item.id === id)) return
      setOpenIds((current) => new Set(current).add(id))
      requestAnimationFrame(() => document.getElementById(anchorOf(id))?.scrollIntoView({ block: 'start' }))
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="faq" className="section faq-section" aria-label="Preguntas y respuestas">
      <div className="container faq-layout">
        <aside className="faq-aside">
          <nav className="faq-topics" aria-label="Temas">
            <p className="faq-topics-title">Temas</p>
            <ul>
              {groups.map((group) => (
                <li key={group.id}>
                  <a href={`#tema-${group.id}`}>
                    {group.label}
                    <span className="faq-topics-count">{group.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="faq-help">
            <p className="faq-help-title">¿No encuentras tu respuesta?</p>
            <p>Un asesor de Digo te responde por WhatsApp o por teléfono.</p>
            <a
              href={getWhatsAppHref()}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Escribir por WhatsApp
            </a>
            {officialNumbers().map((number) => (
              <a key={number.id} href={number.tel} className="faq-help-phone" aria-label={`Llamar al ${number.label.toLowerCase()} ${number.display}`}>
                <PhoneIcon />
                {number.display}
              </a>
            ))}
          </div>
        </aside>

        <div className="faq-groups">
          {groups.map((group) => (
            <section key={group.id} id={`tema-${group.id}`} className="faq-group" aria-labelledby={`tema-${group.id}-title`}>
              <h2 id={`tema-${group.id}-title`} className="faq-group-title">
                {group.label}
              </h2>
              <div className="faq-list">
                {group.items.map((item) => (
                  <FaqEntry key={item.id} item={item} open={openIds.has(item.id)} onToggle={() => toggle(item.id)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqEntry({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const panelId = `faq-${item.id}`
  const internal = item.link?.href.startsWith('/')

  return (
    <div id={anchorOf(item.id)} className={`faq-item${open ? ' is-open' : ''}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span>{item.question}</span>
          <span className="faq-toggle" aria-hidden="true" />
        </button>
      </h3>
      {/* Siempre montada: la altura se anima de 0fr a 1fr; cerrada queda inerte. */}
      <div id={panelId} className="faq-panel" inert={!open}>
        <div className="faq-answer">
          <p>{item.answer}</p>
          {item.link &&
            (internal ? (
              <Link viewTransition to={item.link.href} className="faq-answer-link">
                {item.link.label}
                <ChevronIcon direction="right" />
              </Link>
            ) : (
              <a href={item.link.href} className="faq-answer-link">
                {item.link.label}
                <ChevronIcon direction="right" />
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}
