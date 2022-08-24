/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path'
import Cache from 'lru-cache'
import parse from 'gray-matter'
import { slash } from '../utils/paths'
import { mdRE, CACHE_SIZE } from './constants'
import createRenderer from './markdown'
import { debug, inferMeta } from './utils'

import type { PageData, MDOutput } from '@solidpress/types'

interface CreateMarkdownRendererParams {
  srcDir: string
  pages: string[]
}

const pageMap = new Cache<string, MDOutput>({ max: CACHE_SIZE })

type MDRenderer = ((src: string, file: string, publicDir: string) => Promise<MDOutput>)

export const createMarkdownRenderer = async ({
  srcDir,
  pages,
}: CreateMarkdownRendererParams): Promise<MDRenderer> => {

  const renderer = await createRenderer()

  // eslint-disable-next-line no-param-reassign
  pages = pages.map(page => slash(page.replace(mdRE, '')))
  
  return async (
    src: string,
    file: string,
    publicDir: string
  ) => {
    // Fill in the renderer

    const relativePath = path.relative(srcDir, file)

    const key = JSON.stringify({ src, file })

    if (pageMap.has(key)) {

      debug(`[cache hit]: using cached file for ${relativePath}`)
      return pageMap.get(key)
    }

    const start = Date.now()
    const fileDir = path.dirname(file)

    renderer.__path = file
    renderer.__relativePath = relativePath

    // Parse raw markdown content into two parts
    // See https://github.com/jonschlinkert/gray-matter for more detail
    const { content, data: frontmatter } = parse(src)

    const html = renderer.render(content)
    const data = renderer.__data

    const pageData: PageData = {
      ...inferMeta(frontmatter, content),
      secondaryTitle: frontmatter.secondaryTitle || '',
      frontmatter,
      headers: data.headers || [],
      relativePath,
    }

    const output: MDOutput = {
      pageData,
      html,
    }

    debug(`[render page]: ${file} took ${Date.now() - start}`)

    pageMap.set(key, output)

    return output
  }
}