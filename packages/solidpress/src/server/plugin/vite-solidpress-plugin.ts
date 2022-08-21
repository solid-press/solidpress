import { defineConfig, mergeConfig } from 'vite'
import type { Plugin, ResolvedConfig } from 'vite'
import { equals, isNil } from 'ramda'
import { createMarkdownRenderer } from '../markdown'
import { solidPressMiddleware } from './middleware'
import {
  SITE_DATA_PATH,
  staticInjectMarkerRE,
  staticRestoreRE,
  staticStripRE,
  hashRE,
} from './constants'
import { isPageChunk, isPageFile } from './utils'

import type { OutputBundle, OutputChunk } from 'rollup'
import type { SiteConfig } from '../config/types'

export const ViteSolidPressPlugin = (
  siteConfig: SiteConfig,
  ssr = false,
  pagesMap:{ [key: string]: string },
) => {
  const { 
    alias,
    configPath,
    deps,
    srcDir,
    site,
    vite,
    pages,
  } = siteConfig

  let config: ResolvedConfig
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let render: Awaited<ReturnType<typeof createMarkdownRenderer>>

  const plugin: Plugin = {
    name: 'solidpress',
    config() {
      // fundamental configuration for the solid press
      const _config = defineConfig({
        resolve: {
          alias,
        },
        optimizeDeps: {
          include: ['solid-js']
        },
        server: {
          fs: {
            allow: [srcDir, process.cwd()]
          }
        }
      })
      // Merge user defined config with the basic config.
      return isNil(vite) ? _config : mergeConfig(vite, _config)      
    },
    async configResolved(_config) {
      config = _config

      render = await createMarkdownRenderer({
        pages,
        srcDir,
      })
    },
    resolveId(id) {
      return equals(id, SITE_DATA_PATH) && SITE_DATA_PATH || undefined
    },
    load(id) {
      if (equals(id, SITE_DATA_PATH)) {
        let data = site
        if (equals(config.command, 'build')) {
          data = { ...site, head: [] }
        }

        return `export default JSON.parse(${
          JSON.stringify(data)
        })`
      }
    },
    async transform(code, id) {
      if (isPageFile(id)) {
        // const { 

        // } = await render(code, id, config.publicDir)
      }

      return code
    },

    configureServer(server) {
      if (configPath) {
        [configPath, ...deps].forEach((dep) => server.watcher.add(dep))
      }

      return () => {
        server.middlewares.use(solidPressMiddleware)
      }
    },

    renderChunk(code, chunk) {
      if (!ssr && isPageChunk(chunk as OutputChunk)) {
        const replaced = code.replace(
          staticInjectMarkerRE,
          '$1("__VP_STATIC_START__$2__VP_STATIC_END__", $3)'
        )
        return replaced
      }

      return null 
    },

    generateBundle(_, bundle) {
      if (ssr) {
        SSRBuild(bundle)
      } else {
        normalBuild(bundle, pagesMap)
      }
    },
  }

  return plugin
}

function SSRBuild(bundle: OutputBundle) {
  // ssr build:
  // delete all asset chunks
  for (const name in bundle) {
    if (bundle[name].type === 'asset') {
      delete bundle[name]
    }
  }
}

function normalBuild(bundle: OutputBundle, pagesMap: { [key: string]: string }) {
  // client build:
  // for each .md entry chunk, adjust its name to its correct path.
  for (const name in bundle) {
    const chunk = bundle[name] as OutputChunk
    if (isPageChunk(chunk)) {
      // record page -> hash relations
      const fileHash = chunk.fileName.match(hashRE)![1]
      pagesMap[chunk.name.toLowerCase()] = fileHash

      // inject another chunk with the content stripped
      bundle[`${name  }-lean`] = {
        ...chunk,
        fileName: chunk.fileName.replace(/\.js$/, '.lean.js'),
        code: chunk.code.replace(staticStripRE, '""')
      }

      // remove static markers from original code
      chunk.code = chunk.code.replace(staticRestoreRE, '')
    }
  }
}