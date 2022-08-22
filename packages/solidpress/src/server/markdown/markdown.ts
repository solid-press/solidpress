import MD from 'markdown-it'

import type { MDEnhanced } from '@solidpress/types'

const createRenderer = async (): Promise<MDEnhanced> => {
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