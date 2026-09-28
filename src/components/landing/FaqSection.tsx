import { useState } from 'react'
import { ChevronIcon } from '@/components/icons/Icons'
import { faqItems } from '@/data/content'
import '@/styles/landing.css'

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null)

  return (
    <section id="faq" className="section faq-section" aria-label="Preguntas y respuestas">
      <div className="container">
        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <h2>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    {item.question}
                    <ChevronIcon direction="right" />
                  </button>
                </h2>
                {/* Siempre montada: la altura se anima de 0fr a 1fr; cerrada queda inerte. */}
                <div id={`faq-${item.id}`} className="faq-panel" inert={!isOpen}>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
