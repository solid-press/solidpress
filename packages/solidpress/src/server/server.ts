import type { ServerOptions, ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';
import { resolveConfig } from './config';
import createViteSolidPressPlugins from './plugin'

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

  return createViteServer({
    root: config.srcDir,
    base: config.site.base,
    plugins: await createViteSolidPressPlugins(config, false),
    server: serverOptions,
  });
}
