import { ViteSolidPressPlugin } from './vite-solidpress-plugin'

import type { PluginOption } from 'vite'
import type { SiteConfig } from 'config/types'

const createViteSolidPressPlugins = async (siteConfig: SiteConfig, ssr: boolean, ): Promise<PluginOption[]> => {

  const SolidPressPlugin = (await import('vite-plugin-solid')).default
  return [ViteSolidPressPlugin(siteConfig, ssr, {}), SolidPressPlugin(), (siteConfig.vite?.plugins || [])]
}

export default createViteSolidPressPlugins