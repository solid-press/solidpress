import { compose, isEmpty, isNil } from 'ramda'
import createDebugger from 'debug'

import type { HeadConfigs } from '../config/types'

export const debug = createDebugger('solidpress:md')

const markdownHeadingRE = /^\s*#+\s+(.*)/m

export const inferMeta = (fm: { [key: string]: any }, content: string) => {
  let title = ''
  let description = ''

  if (fm.title) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    title = deeplyParseHeader(fm.title)
  } else {
    const match = content.match(markdownHeadingRE)
    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      title = deeplyParseHeader(match[1]!)
    }
  }

  if (!isNil(fm.description)) {
    ({ description } = fm)
  } else {
    description = getDataFromHeadMeta(fm.head, 'description') || ''
  }

  return {
    title,
    description,
  }
}

function getDataFromHeadMeta(heads: HeadConfigs, key: string) {
  if (isNil(heads) || isEmpty(heads)) {return}

  return heads.find(([tag, attrs = {}]) => {
    return tag === 'meta' && attrs.name === key && attrs.content
  })?.[1].content
}

// COPYRIGHT NOTICE:
// Copied from vitepress/src/node/utils/parseHeaders.ts

// import emojiData from 'markdown-it-emoji/lib/data/full.json'

// const parseEmojis = (str: string) => {
//   return str.replace(
//     /:(.+?):/g,
//     (placeholder, key) => (emojiData as any)[key] || placeholder
//   )
// }

const unescapeHtml = (html: string) =>
  html
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x3A;/g, ':')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const hyperlinkRE = /(\[(.[^\]]+)\]\((.[^)]+)\))/g 
const emphasisRE = /(`|\*{1,3}|_)(.*?[^\\])\1/g 
const escapeSignRE = /(\\)([*_`!<$])/g

const removeMarkdownTokens = (str: string) =>
  str
    .replace(hyperlinkRE, '$2') // matches [display name](link) takes out `display name`
    .replace(emphasisRE, '$2') //  matches `{}` | *{t}* | **{t}** | ***{t}*** | _{t}_ and takes out `t`
    .replace(escapeSignRE, '$2') // matches and removes escape char '\'

const removeCustomAnchor = (str: string) =>
  str.replace(/\{#([\w\-]+)\}\s*$/, '') // {#custom-header}

const trim = (str: string) => str.trim()

// This method remove the raw HTML but reserve the HTML wrapped by `<code>`.
// e.g.
// Input: "<a> b",   Output: "b"
// Input: "`<a>` b", Output: "`<a>` b"
export const removeNonCodeWrappedHTML = (str: string) => {
  // The original code uses String(str) to wrap the parameter which seems redundant
  // since this method was composed and has a pre-hook using string methods, if the pre-hook
  // failed then error should fall through instead of getting auto correction.
  return str.replace(/(^|[^><`\\])<.*>([^><`]|$)/g, '$1$2')
}

// Unescape html, parse emojis and remove some md tokens.
export const parseHeader = compose(
  unescapeHtml,
  // parseEmojis,
  removeCustomAnchor,
  removeMarkdownTokens,
  trim
)

// Also clean the html that isn't wrapped by code.
// Because we want to support using SolidJS components in headers.
// e.g. https://vuepress.vuejs.org/guide/using-vue.html#badge
export const deeplyParseHeader = compose(removeNonCodeWrappedHTML, parseHeader)