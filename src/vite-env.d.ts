/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API de digo-landing-backend, p. ej. https://cms-api.digo.net.pe. Vacía en local (proxy de Vite). */
  readonly VITE_API_URL?: string
  /** Sitio de DIGO EMPRESAS, p. ej. https://digoempresas.pe */
  readonly VITE_EMPRESAS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
