import { loadConfigFromFile } from 'vite';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs-extra';
import { is } from 'ramda';

// import { DEFAULT_THEME_DIR } from '../paths'
import { resolve } from '../utils/paths';
import { resolveAlias } from '../alias';
import { fetchVersionedMetaData } from '../plugin/versioned-plugin'
import { allowedExtensions, debug } from './constants';
import { resolveSiteData } from './site';
import { mergeUserConfig } from './utils';
import { fetchPages } from './pages';

import type { BuildType, SiteConfig, UserConfig, UserConfigType } from './types';

export async function resolveConfig(
  root: string,
  buildType: BuildType = 'serve',
  mode = 'development',
): Promise<SiteConfig> {
  const solidPressRoot = path.resolve(root, '.solidpress');
  const { config, configPath, deps } = await resolveUserConfig(
    root,
    buildType,
    mode,
  );

  const siteData = resolveSiteData(config);

  const srcDir = path.resolve(root, config.srcDir || '.');
  const outDir = config.outDir
    ? path.resolve(root, config.outDir)
    : resolve(solidPressRoot, 'dist');

  const userThemeDir = resolve(solidPressRoot, 'theme');
  const siteRequire = createRequire(solidPressRoot);
  const DEFAULT_THEME_DIR = path.resolve(
    siteRequire.resolve('@solidpress/theme-classic'),
    '..',
  );
  // eslint-disable-next-line no-restricted-properties
  const themeCustomized = fs.pathExistsSync(userThemeDir);
  const themeDir = themeCustomized ? userThemeDir : DEFAULT_THEME_DIR;
  const pages = await fetchPages(srcDir, [
    '**/node_modules',
    ...(config.excludes || []),
  ]);

  const { vite } = config;

  const alias = resolveAlias('', themeDir)

  if (siteData.themeConfig.versioned) {
    // process version.
    const versionedPath = path.resolve(srcDir, 'versioned_docs')
    const versions = await fetchVersionedMetaData(versionedPath)
    versions.forEach((version) => {
      alias.push({
        find: new RegExp(`${version}\\/(.*)`),
        replacement: `${path.join(versionedPath, version)}/$1`,
      })
    })
  }
  console.log(alias)

  return {
    alias,
    configPath,
    deps,
    outDir,
    pages,
    root,
    srcDir,
    site: siteData,
    themeDir,
    tempDir: resolve(solidPressRoot, '.tmp'),
    vite,
  } as SiteConfig;
}

export async function resolveUserConfig(
  root: string,
  buildType: BuildType,
  mode: string,
): Promise<{ configPath: string; config: UserConfig; deps: string[] }> {
  const solidPressRoot = path.resolve(root, '.solidpress');

  const configPath = allowedExtensions
    .map((ext) => resolve(solidPressRoot, `config.${ext}`))
    // eslint-disable-next-line no-restricted-properties
    .find(fs.pathExistsSync);

  let config = {} as UserConfigType;
  let deps: string[] = [];

  if (!configPath) {
    debug('Could not load user config, using pre-defined config');
  } else {
    const userConfig = await loadConfigFromFile(
      { command: buildType, mode },
      configPath,
      root,
    );

    debug(`config loaded successfully from ${configPath}`);

    if (userConfig) {
      config = userConfig.config as UserConfig
      deps = userConfig.dependencies.map((file) => resolve(file));
    }
  }

  return {
    config: await resolveConfigExtends(config),
    configPath,
    deps,
  };
}

async function resolveConfigExtends(
  config: UserConfigType,
): Promise<UserConfig> {
  const resolved = await (is(Function, config) ? config() : config);
  if (resolved.extends) {
    return mergeUserConfig(
      await resolveConfigExtends(resolved.extends),
      resolved,
    ) as UserConfig;
  }
  return resolved;
}
