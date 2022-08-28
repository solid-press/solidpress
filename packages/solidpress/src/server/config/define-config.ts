import type { ThemeConfig } from '@solidpress/types'
import type { UserConfig } from './types';

export const defineConfig = (
  config: UserConfig<ThemeConfig>
):UserConfig<ThemeConfig> => {
  return config;
};
