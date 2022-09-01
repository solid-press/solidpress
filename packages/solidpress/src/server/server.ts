import { createServer as createViteServer } from 'vite';
import type { ServerOptions, ViteDevServer } from 'vite';
import path from 'path'
import { resolveConfig } from './config';
import createViteSolidPressPlugins from './plugin'
import { fetchVersionedMetaData } from './plugin/versioned-plugin'

export async function createServer(
  root: string = process.cwd(),
  serverOptions: ServerOptions = {},
  // recreateServer: () => Promise<void>
): Promise<ViteDevServer> {
  const config = await resolveConfig(root);

  if (serverOptions.base) {
    config.site.base = serverOptions.base;
    delete serverOptions.base;
  }
  if (config.site.themeConfig.versioned) {
    // process version.
    const versionedPath = path.resolve(config.srcDir, 'versioned_docs')
    const versions = await fetchVersionedMetaData(versionedPath)
    console.log(versions)
  }

  return createViteServer({
    root: config.srcDir,
    base: config.site.base,
    plugins: await createViteSolidPressPlugins(config, false),
    server: serverOptions,
  });
}
