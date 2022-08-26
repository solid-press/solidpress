import type {UserConfig as ViteConfig, ConfigEnv} from 'vite';
import type {HeadConfigs} from './head';
import type {SiteData} from './site';

export type BuildType = ConfigEnv['command'];

export type UserConfig<ThemeConfig = any> = {
  appearance?: boolean;
  extends?: UserConfigType<ThemeConfig>;
  base?: string;
  srcDir?: string;
  excludes?: string[];
  outDir?: string;
  title?: string;
  description?: string;
  head?: HeadConfigs;
  vite?: ViteConfig;
} & Partial<
  Pick<
    SiteData,
    | 'base'
    | 'lang'
    | 'locales'
    | 'title'
    | 'secondaryTitle'
    | 'head'
    | 'description'
    | 'appearance'
  >
>;

export type ConfigType<T> = UserConfig<T> | Promise<UserConfig<T>>;

export type UserConfigType<ThemeConfig = any> =
  | ConfigType<ThemeConfig>
  | (() => ConfigType<ThemeConfig>);
