import { createRequire } from 'module'

// Using require to escape from importing issue reported by typing system.
const pkg = createRequire(import.meta.url)('../package.json')
export const SOLIDPRESS_VERSION = pkg.version
export const isServer = typeof window === 'undefined'
export const EXTERNAL_URL_RE = /^[a-z]+:/i