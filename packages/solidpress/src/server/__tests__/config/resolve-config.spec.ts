import path from 'path';
import {fileURLToPath} from 'url';
import {describe, it, expect} from 'vitest';
import {resolveConfig} from '../../config/resolve-config';
import {DEFAULT_THEME_DIR} from '../../paths';
import {resolve} from '../../utils/paths';

describe('Resolve Config', () => {
  it('should be able to resolve config when no user config were found', async () => {
    const configPath = resolve(fileURLToPath(import.meta.url), '..');
    const resolved = await resolveConfig(configPath);
    expect(resolved).toStrictEqual({
      configPath: undefined,
      deps: [],
      outDir: resolve(configPath, '.solidpress/dist'),
      srcDir: configPath,
      root: configPath,
      tempDir: resolve(configPath, '.solidpress/.tmp'),
      themeDir: DEFAULT_THEME_DIR,
      vite: undefined,
      pages: ['mocks/test.md'],
    });
  });

  it('should be able to resolve and load config from pointed path', async () => {
    const configPath = path.resolve(fileURLToPath(import.meta.url), '../mocks');
    const resolved = await resolveConfig(configPath);
    const configFilePath = resolve(configPath, '.solidpress/config.ts');

    expect(resolved).toStrictEqual({
      configPath: configFilePath,
      deps: [configFilePath],
      outDir: resolve(configPath, '.solidpress/dist'),
      srcDir: configPath,
      root: configPath,
      tempDir: resolve(configPath, '.solidpress/.tmp'),
      themeDir: DEFAULT_THEME_DIR,
      vite: undefined,
      pages: ['test.md'],
    });
  });
});
