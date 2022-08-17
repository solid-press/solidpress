import { createServer as createViteServer, ServerOptions } from 'vite'
import { resolveConfig } from './config'
import { ViteSolidPressPlugin } from './plugin/vite-solidpress-plugin'
import SolidPlugin from 'vite-plugin-solid'

export async function createServer(
  root: string = process.cwd(),
  serverOptions: ServerOptions = {},
  recreateServer: () => Promise<void>
) {
  const config = await resolveConfig(root)

  if (serverOptions.base) {
    config.site.base = serverOptions.base
    delete serverOptions.base
  }

  return createViteServer({
    root: config.srcDir,
    base: config.site.base,
    plugins: [
      ViteSolidPressPlugin(config, false, {}),
      SolidPlugin({
        hot: false
      }),
    ],
    server: serverOptions
  })
}
