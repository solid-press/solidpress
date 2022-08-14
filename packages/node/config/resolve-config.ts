import path from 'path'
import fs from 'fs-extra'
import { is } from 'ramda'
import {
  loadConfigFromFile,
} from 'vite'

import { DEFAULT_THEME_DIR } from '../alias'
import { resolve } from '../utils/paths'
import { allowedExtensions, debug } from './constants'
import { mergeUserConfig } from './utils'
import { fetchPages } from './pages'

import type { UserConfig, UserConfigType, BuildType } from './types'

export async function resolveConfig(root: string, buildType: BuildType = 'serve', mode = 'development') {
  const solidPressRoot = path.resolve(root, '.solidpress')

  const {
    config,
    configPath,
    deps,
  } = await resolveUserConfig(
    root,
    buildType,
    mode,
  )

  const srcDir = path.resolve(root, config.srcDir || '.')
  const outDir = config.outDir ? path.resolve(root, config.outDir) : resolve(solidPressRoot, 'dist')

  const userThemeDir = resolve(solidPressRoot, 'theme')
  const themeCustomized = fs.pathExistsSync(userThemeDir)
  const themeDir = themeCustomized ? userThemeDir : DEFAULT_THEME_DIR
  const pages = await fetchPages(srcDir, ['**/node_modules', ...(config.excludes || [])])

  const { vite } = config

  return {
    root,
    srcDir,
    outDir,
    themeDir,
    configPath,
    deps,
    pages,
    vite,
    tempDir: resolve(solidPressRoot, '.tmp')
  }
}

export async function resolveUserConfig(root: string, buildType: BuildType, mode: string) {
  const solidPressRoot = path.resolve(root, '.solidpress')

  const configPath = allowedExtensions.map(
    (ext) => resolve(solidPressRoot, `config.${ext}`))
      .find(fs.pathExistsSync)

  let config: UserConfigType = {}
  let deps: string[] = []

  if (!configPath) {
    debug('Could not load user config, using pre-defined config')
  } else {
    const userConfig = await loadConfigFromFile(
      { command: buildType, mode, },
      configPath,
      root,
    )

    debug(`config loaded successfully from ${configPath}`)

    if (userConfig) {
      config = userConfig.config
      deps = userConfig.dependencies.map(file => resolve(file))
    }
  }

  return {
    config: await resolveConfigExtends(config),
    configPath,
    deps,
  }
}

async function resolveConfigExtends(
  config: UserConfigType,
): Promise<UserConfig> {
  const resolved = await (is(Function, config) ? config() : config)
  if (resolved.extends) {
    return mergeUserConfig(await resolveConfigExtends(resolved.extends), resolved)
  }
  return resolved
}