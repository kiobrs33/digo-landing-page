---
target: "digo-landing home: contenido y organización"
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/home/renel/projects/digo-telecom/digo-landing-app/digo-landing/src/pages/HomePage.tsx"
target_fingerprint: "sha256:2053e23dd0f8662fc1fe96fdf2b1451c2ab41824d309acbdef080e4c1f917d7d"
target_path: /home/renel/projects/digo-telecom/digo-landing-app/digo-landing/src/pages/HomePage.tsx
timestamp: 2026-10-05T07-18-09Z
slug: src-pages-homepage-tsx
---
# Crítica: contenido y organización de la home de Hogar (src/pages/HomePage.tsx)

## Puntuación de salud (21/32, Aceptable)
| # | Heurística | Nota | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Beneficios y Proceso no están en el nav; el resaltado sigue en "Planes" |
| 2 | Lenguaje del usuario | 3 | "Simétrica", "Mbps" y TV Full/Premium no se traducen a necesidades del hogar |
| 3 | Control y libertad | 3 | El carrusel rotativo roba atención, aunque se puede pausar |
| 4 | Consistencia | 2 | 5 rótulos distintos para el mismo CTA; "Teléfono fijo" también es WhatsApp; #servicios repite el tablero de planes |
| 5 | Prevención de errores | 3 | Se puede pulsar "Lo quiero" sin confirmar la cobertura |
| 6 | Reconocer antes que recordar | 2 | En móvil los planes van en carril horizontal y comparar exige memorizar |
| 7 | Flexibilidad | n/a | Landing de una sola pasada |
| 8 | Estética minimalista | 2 | Mismos 5 hechos dichos 3 o 4 veces; ~2 secciones de relleno |
| 9 | Recuperación de errores | 3 | El respaldo por WhatsApp cuando no hay cobertura solo existe en /cobertura |
| 10 | Ayuda | n/a | La FAQ es una ruta aparte (falta un adelanto en la home) |

## Veredicto de especificidad
Hecha para Digo arriba (hero galaxia, tarjetas "diagrama de fibra" cuyo pulso corre más rápido cuanto más rápido es el plan) e intercambiable en el medio (Beneficios, Servicios, 4 pasos, testimonios: plantilla genérica de ISP sobre fondo claro). Detector CLI: 0 hallazgos. Navegador: brillo y sombra del hero, longitud de línea del aviso legal del footer, transición de ancho de los puntos del carrusel y pulsos "marquee" (probables falsos positivos); en móvil hay 5 avisos de texto en el borde del viewport que son falsos positivos de los carriles.

## Problemas prioritarios
- [P0] La home nunca muestra cobertura: dice "en Arequipa" (HeroSection.tsx:20) y Socabaya y Centro solo aparecen en una diapositiva rotativa y opcional del CMS. CoverageSection solo se usa en /cobertura. Arreglo: nombrar las zonas en el hero y añadir una franja compacta de cobertura (chips de zonas, "Usar mi ubicación", WhatsApp de respaldo).
- [P1] Planes, "Todos los planes incluyen", "Lo que incluye cada plan" y Servicios cuentan la misma idea 4 veces; homeServices (content.ts:100-120) y el paso 2 (content.ts:140) repiten a mano datos del CMS. Arreglo: eliminar ServicesSection, unir los beneficios en una sola lista bajo las tarjetas (más router y OSIPTEL 70%) y derivar el paso 2 de homePlans.
- [P1] No hay capa de confianza en producción: los 3 testimonios son synthetic, así que la sección no se publica. Arreglo: un bloque de confianza con hechos reales (dirección de la oficina, garantía OSIPTEL del 70%, Libro de reclamaciones, equipo local, foto real del equipo) antes de Contacto.
- [P2] En móvil, el plan recomendado (S/ 44.50) es la tarjeta 3 de 3 y el botón flotante de WhatsApp tapa las condiciones de la promo. Arreglo: abrir el carril en el plan destacado o apilar las tarjetas con ese plan primero, y dejar margen para el botón flotante.
- [P2] El nav tiene 9 entradas: "Inicio" repite el logo, "Servicios" apunta a contenido duplicado y "Medios de pago" (clientes actuales) se mezcla con la navegación de venta. Arreglo: Planes · Cobertura · Preguntas · Nosotros · Contacto + Empresas, con "Medios de pago" como enlace aparte para clientes.

## Señales de alerta por persona
- Primerizo: asume que hay cobertura por "Arequipa", pulsa "Lo quiero" y descubre en WhatsApp que no llegan a su zona. No sabe por qué elegir 800 o 1000.
- Móvil: tiene que deslizar dos veces para ver el plan recomendado; el botón flotante y el de volver arriba tapan contenido; el formulario pide 5 campos cuando WhatsApp es un toque.
- Hogar de Socabaya frente a Movistar o Claro: la home nunca nombra su distrito, la permanencia no se aclara y la presencia local solo está en el footer.

## Observaciones menores
- "Todos los planes incluyen" y "Lo que incluye cada plan" están a ~100 px una de otra.
- El H1 gasta el titular en el eslogan ("siempre contigo").
- La entradilla de planes escribe a mano "TV desde 800 Mbps" (PlansSection.tsx).
- El "(01)" de Lima choca con el principio "local primero".
- El carrusel mezcla venta y atención al cliente (diapositiva de Yape).
- "Aplican términos" no enlaza a los términos.

## Preguntas
- Si se borrara todo lo que hay bajo los planes salvo "Cómo contratar" y Contacto, ¿qué perdería el visitante?
- ¿Por qué decir "Arequipa" si nombrar Socabaya es el argumento local más fuerte?
- ¿Debería "Ya soy cliente" (pagos, Yape) tener su propia entrada fuera del hero de venta?
