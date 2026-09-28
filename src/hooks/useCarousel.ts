import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from 'react'

/** Pares [media query, diapositivas visibles], evaluados en orden; el primero que coincide gana. */
export type VisibleRule = readonly [query: string, count: number]

function resolveVisible(rules: readonly VisibleRule[], fallback: number) {
  return rules.find(([query]) => window.matchMedia(query).matches)?.[1] ?? fallback
}

/** Cantidad de diapositivas visibles según el ancho. `rules` debe ser una constante de módulo. */
export function useVisibleCount(rules: readonly VisibleRule[], fallback: number) {
  const [visible, setVisible] = useState(() => resolveVisible(rules, fallback))

  useEffect(() => {
    const lists = rules.map(([query]) => window.matchMedia(query))
    const update = () => setVisible(resolveVisible(rules, fallback))
    lists.forEach((list) => list.addEventListener('change', update))
    return () => lists.forEach((list) => list.removeEventListener('change', update))
  }, [rules, fallback])

  return visible
}

const SWIPE_THRESHOLD_PX = 40

type UseCarouselOptions = {
  count: number
  /** Diapositivas visibles a la vez. */
  visible?: number
  /** Al llegar al final vuelve al inicio (carrusel con autoplay). */
  loop?: boolean
}

/**
 * Estado y controles de un carrusel: posición, teclado (flechas) y deslizamiento táctil.
 * `isInView` permite marcar como `inert` las diapositivas ocultas para que no reciban foco.
 */
export function useCarousel({ count, visible = 1, loop = false }: UseCarouselOptions) {
  const maxIndex = Math.max(0, count - visible)
  const [rawIndex, setRawIndex] = useState(0)
  const index = Math.min(rawIndex, maxIndex)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (next: number) => {
      setRawIndex(loop ? (next + count) % count : Math.max(0, Math.min(next, maxIndex)))
    },
    [count, loop, maxIndex],
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])

  const handlers = {
    onKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    },
    onTouchStart(event: TouchEvent<HTMLElement>) {
      touchStartX.current = event.touches[0]?.clientX ?? null
    },
    onTouchEnd(event: TouchEvent<HTMLElement>) {
      const startX = touchStartX.current
      touchStartX.current = null
      const endX = event.changedTouches[0]?.clientX
      if (startX === null || endX === undefined) return
      const deltaX = endX - startX
      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return
      if (deltaX < 0) goNext()
      else goPrev()
    },
  }

  return {
    index,
    /** Posiciones navegables (una por punto indicador). */
    positions: maxIndex + 1,
    /** Todas las diapositivas caben: no hacen falta controles. */
    isStatic: maxIndex === 0,
    canGoPrev: loop || index > 0,
    canGoNext: loop || index < maxIndex,
    goTo,
    goPrev,
    goNext,
    isInView: (slide: number) => slide >= index && slide < index + visible,
    handlers,
  }
}
