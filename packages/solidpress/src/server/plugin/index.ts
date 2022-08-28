import type { PluginOption } from 'vite';
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'
import { ViteSolidPressPlugin } from './vite-solidpress-plugin';
import { PKG_ROOT } from '../paths';
import type { SiteConfig } from '../config/types';

const createViteSolidPressPlugins = async (
  siteConfig: SiteConfig,
  ssr: boolean,
): Promise<PluginOption[]> => {
  const SolidPressPlugin = (await import('vite-plugin-solid')).default;
  return [
    WindiCSS({
      scan: {
        dirs: [path.join(PKG_ROOT, '../../solidpress-theme-classic/src')],
        fileExtensions: ['tsx']
      },
    }),
    ViteSolidPressPlugin(siteConfig, ssr, {}),
    SolidPressPlugin(),
    siteConfig.vite?.plugins || [],
  ];
};

export default createViteSolidPressPlugins;
