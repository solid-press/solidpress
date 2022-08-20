import { scriptClientRE } from './constants'

import type { OutputChunk } from 'rollup'

export const isPageChunk = (chunk: OutputChunk): chunk is OutputChunk & {
  facadeModuleId: string
} => {
  return Boolean(
    chunk.type === 'chunk' &&
    chunk.isEntry &&
    chunk.facadeModuleId?.endsWith('md')
  )
}

export const processClientJS = (code: string, id: string, map?: { [key: string]: string }, ssr = false) => {
  const isClientScript = scriptClientRE.test(code)

  return isClientScript
    ? code.replace(scriptClientRE, (match, content) => {
      if (ssr && map) { 
        map[id] = content
      }
      return '\n'.repeat(match.split('\n').length - 1)
    })
    : code
}

export const isPageFile = (filename: string) => ['mdx', 'md'].some(ext => filename.endsWith(ext))