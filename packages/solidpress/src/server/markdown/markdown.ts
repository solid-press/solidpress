import MD from 'markdown-it'

import type { MDEnhanced } from './types'

const createRenderer = async () => {
  const md = MD({
    html: true,
    linkify: true,
  }) as MDEnhanced

  const _render = md.render

  md.render = (...args) => {
    md.__data = {}
    return _render.call(md, ...args)
  }

  return md
}

export default createRenderer