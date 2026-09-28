import { useId, useRef, useState, type FormEvent } from 'react'

export type FieldRule = {
  required?: boolean
  pattern?: RegExp
  patternMessage?: string
}

export type FormValues = Record<string, string>

type UseWhatsAppFormOptions = {
  /** Reglas por campo, en el orden en que aparecen en el formulario. */
  fields: Record<string, FieldRule>
  /** Construye el enlace de WhatsApp con el mensaje ya redactado. */
  buildUrl: (values: FormValues) => string
}

export const phonePattern: FieldRule = {
  pattern: /^\+?[\d\s()-]{6,}$/,
  patternMessage: 'Escribe un teléfono válido, por ejemplo 987 654 321.',
}

export const emailPattern: FieldRule = {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  patternMessage: 'Escribe un correo válido, por ejemplo nombre@correo.com.',
}

const REQUIRED_MESSAGE = 'Completa este campo.'

/**
 * Formulario sin backend: valida en el navegador y entrega la consulta por WhatsApp,
 * el canal que Digo Telecom atiende hoy. No afirma un envío que no ocurrió.
 */
export function useWhatsAppForm({ fields, buildUrl }: UseWhatsAppFormOptions) {
  const formId = useId()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  function validate(values: FormValues): Record<string, string> {
    const nextErrors: Record<string, string> = {}
    for (const [name, rule] of Object.entries(fields)) {
      const value = values[name] ?? ''
      if (!value) {
        if (rule.required) nextErrors[name] = REQUIRED_MESSAGE
      } else if (rule.pattern && !rule.pattern.test(value)) {
        nextErrors[name] = rule.patternMessage ?? 'Revisa el formato de este campo.'
      }
    }
    return nextErrors
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values: FormValues = {}
    new FormData(form).forEach((value, name) => {
      values[name] = String(value).trim()
    })

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(fields).find((name) => nextErrors[name])
    if (firstInvalid) {
      setSentUrl(null)
      const field = form.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    const url = buildUrl(values)
    window.open(url, '_blank', 'noopener,noreferrer')
    form.reset()
    setSentUrl(url)
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  function errorId(name: string) {
    return `${formId}-${name}-error`
  }

  /** Atributos de accesibilidad y validación para un campo. */
  function fieldProps(name: string) {
    const error = errors[name]
    return {
      name,
      'aria-required': fields[name]?.required || undefined,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId(name) : undefined,
      onInput: () => {
        if (!errors[name]) return
        setErrors((current) => {
          const next = { ...current }
          delete next[name]
          return next
        })
      },
    }
  }

  function fieldError(name: string) {
    const error = errors[name]
    if (!error) return null
    return (
      <span id={errorId(name)} className="form-error">
        {error}
      </span>
    )
  }

  function sentNotice(message: string) {
    if (!sentUrl) return null
    return (
      <div ref={statusRef} className="form-success" role="status" tabIndex={-1}>
        {message}{' '}
        <a href={sentUrl} target="_blank" rel="noopener noreferrer">
          ¿No se abrió? Abrir WhatsApp
        </a>
      </div>
    )
  }

  return { handleSubmit, fieldProps, fieldError, sentNotice }
}
