import type {ServerOptions} from 'vite';
import {createServer as createViteServer} from 'vite';
import SolidPlugin from 'vite-plugin-solid';
import {resolveConfig} from './config';
import {ViteSolidPressPlugin} from './plugin/vite-solidpress-plugin';

export async function createServer(
  root: string = process.cwd(),
  serverOptions: ServerOptions = {},
  // recreateServer: () => Promise<void>
) {
  const config = await resolveConfig(root);

  if (serverOptions.base) {
    config.site.base = serverOptions.base;
    delete serverOptions.base;
  }

  return createViteServer({
    root: config.srcDir,
    base: config.site.base,
    plugins: [
      ViteSolidPressPlugin(config, false, {}),
      SolidPlugin({
        hot: false,
      }),
    ],
    server: serverOptions,
  });
}
