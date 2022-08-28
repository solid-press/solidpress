import type {UserConfig as ViteConfig, ConfigEnv} from 'vite';
import type {HeadConfigs} from './head';
import type {SiteData} from './site';

export type BuildType = ConfigEnv['command'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserConfig<ThemeConfig = any> = {
  appearance?: boolean;
  themeConfig: ThemeConfig;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserConfigType<ThemeConfig = any> =
  | ConfigType<ThemeConfig>
  | (() => ConfigType<ThemeConfig>);
