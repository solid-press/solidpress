import path from 'path'
import { fileURLToPath } from 'url'
import { describe, it, expect } from 'vitest'
import { resolveConfig } from '../../config/resolve-config'
import { DEFAULT_THEME_DIR, PKG_ROOT  } from '../../alias'
import { resolve } from '../../utils/paths'

describe('Resolve Config', () => {

  it('should be able to resolve config when no user config were found', async () => {
    const resolved = await resolveConfig('.')
    const solidPressRoot = resolve(PKG_ROOT, '..')
    expect(resolved).toStrictEqual({
      configPath: undefined,
      deps: [],
      outDir: resolve(solidPressRoot, '.solidpress/dist'),
      srcDir: solidPressRoot,
      root: '.',
      tempDir: resolve(solidPressRoot, '.solidpress/.tmp'),
      themeDir: DEFAULT_THEME_DIR,
      vite: undefined,
    })
  })
  
  it('should be able to resolve and load config from pointed path', async () => {
    const configPath = path.resolve(fileURLToPath(import.meta.url), './mocks')
    const resolved = await resolveConfig(configPath)

    expect(resolved).toStrictEqual({
      configPath: undefined,
      deps: [],
      outDir: resolve(configPath, '.solidpress/dist'),
      srcDir: configPath,
      root: configPath,
      tempDir: resolve(configPath, '.solidpress/.tmp'),
      themeDir: DEFAULT_THEME_DIR,
      vite: undefined,
    })
  })
})

