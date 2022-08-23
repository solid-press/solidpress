import { isServer, EXTERNAL_URL_RE } from './constants.mjs'

const slashToDash = (s: string): string => {
  return s.replace(/\//g, '_')
}

export const pathToFile = (p: string): string => {
  let pagePath = decodeURIComponent(p.replace(/\.html$/, ''))
  if (pagePath.endsWith('/')) {
    pagePath += 'index'
  }

  if (process.env.DEV) {
    pagePath = `${pagePath}.md?t=${Date.now}`
  } else if (!isServer) {
    const base = process.env.BASE_URL

    pagePath = `${slashToDash(pagePath.slice(base.length))}.md`
    const pageHash = __SP_HASH_MAP__[pagePath.toLowerCase()]
    pagePath = `${base}assets/${pagePath}.${pageHash}.js`
  } else {
    pagePath = `./${slashToDash(pagePath.slice(1))}.md.js`
  }

  return pagePath
}

export const joinPath = (base: string, seg: string): string => {
  return `${base}${seg}`.replace(/\/+/g, '/')
}

export const withBase = (path: string, base: string): string => {
  return EXTERNAL_URL_RE.test(path) ? path : joinPath(base, path)
}