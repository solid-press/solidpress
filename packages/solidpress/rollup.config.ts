// import { promises as fs } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import type { RollupOptions } from 'rollup';

const pkg = /** @type {import("./package.json")} */ (
  createRequire(import.meta.url)('./package.json')
)

const DEV = !!process.env.DEV
const PROD = !DEV

const ROOT = fileURLToPath(import.meta.url)
const r = (p: string) => resolve(ROOT, '..', p)

const external = [...Object.keys(pkg.dependencies), 'buffer', 'punycode']

const plugins = [
  alias({
    entries: {
      'readable-stream': 'stream'
    }
  }),
  replace({
    // polyfill broken browser check from bundled deps
    'navigator.userAgentData': 'undefined',
    'navigator.userAgent': 'undefined',
    preventAssignment: true
  }),
  commonjs(),
  nodeResolve(),
  esbuild({ target: 'node14' }),
  json()
]

const esmBuild: RollupOptions = {
  input: [r('src/server/index.ts'), r('src/server/cli.ts')],
  output: {
    format: 'esm',
    entryFileNames: `[name].js`,
    chunkFileNames: 'serve-[hash].js',
    dir: r('lib/server')
  },
  external,
  plugins,
  onwarn(warning, warn) {
    if (warning.code !== 'EVAL') { warn(warning) }
  }
}

const cjsBuild: RollupOptions = {
  input: [r('src/server/index.ts'), r('src/server/cli.ts')],
  output: {
    format: 'cjs',
    dir: r('lib/server-cjs'),
    entryFileNames: `[name].cjs`,
    chunkFileNames: 'serve-[hash].cjs'
  },
  external,
  plugins,
  onwarn(warning, warn) {
    if (warning.code !== 'EVAL') { warn(warning) }
  }
}

const nodeTypes: RollupOptions = {
  input: r('src/server/index.ts'),
  output: {
    format: 'esm',
    file: r('lib/server/index.d.ts')
  },
  plugins: [dts()]
}

// const clientTypes: RollupOptions = {
//   input: r('dist/client-types/index.d.ts'),
//   output: {
//     format: 'esm',
//     file: 'dist/client/index.d.ts'
//   },
//   plugins: [
//     dts(),
//     {
//       name: 'cleanup',
//       async closeBundle() {
//         if (PROD) {
//           await fs.rm(r('dist/client-types'), { recursive: true })
//         }
//       }
//     }
//   ]
// }

const config = defineConfig([])

config.push(esmBuild)

if (PROD) {
  config.push(cjsBuild)
}

config.push(nodeTypes)
// config.push(clientTypes)

export default config
