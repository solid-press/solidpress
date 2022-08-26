import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { slugify } from '@solidpress/utils'

import type { Transformer, Plugin } from 'unified'
import type { Heading } from 'mdast'
import type { Node } from 'unist-util-visit'

type HProperties = {
  id: string
}

export const headingsPlugin: Plugin = (): Transformer => {
  return (root) => {
    visit(root, 'heading', (node: Heading) => {
      const data: Node['data'] = node.data || (node.data = {})
      const props = (data.hProperties
        || (data.hProperties = {})) as HProperties
      const { id } = props
      if (id) {
        data.id = props.id = slugify(id, { maintainCase: true })
      } else {
        const textNodes = node.children.filter(({ type }) => {
          return !['html', 'jsx'].includes(type)
        })
        const heading = toString(textNodes.length ? textNodes : node)
        data.id = props.id = slugify(heading)
      }
    })
  }
}