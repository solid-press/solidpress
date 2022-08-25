import MD from 'markdown-it'
import anchorPlugin from 'markdown-it-anchor'
// import attrsPlugin from 'markdown-it-attrs'
import emojiPlugin from 'markdown-it-emoji'
import tocPlugin from 'markdown-it-toc-done-right'


import type { MDEnhanced } from '@solidpress/types'

const createRenderer = async (): Promise<MDEnhanced> => {
  const md = MD({
    html: true,
    linkify: true,
  }) as MDEnhanced

  md
    .use(anchorPlugin, {
      permalink: anchorPlugin.permalink.ariaHidden({}),
    })
    .use(tocPlugin, {
      level: [2, 3],
      format: (x: string, htmlEncode: (s: string) => string) => {
        htmlEncode(x)
      },
      listType: 'ul',
    })
    .use(emojiPlugin)

  const _render = md.render

  md.render = (...args) => {
    md.__data = {}
    return _render.call(md, ...args)
  }

  return md
}

export default createRenderer