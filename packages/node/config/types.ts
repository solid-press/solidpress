import type { UserConfig as ViteConfig, ConfigEnv } from 'vite'

export type BuildType = ConfigEnv['command']

export interface UserConfig<ThemeConfig = any> {
  extends?: UserConfigType<ThemeConfig>
  base?: string
  srcDir?: string
  excludes?: string[]
  outDir?: string
  lang?: string
  title?: string
  description?: string
  head?: string
  vite?: ViteConfig
}

export type ConfigType<T> = UserConfig<T> | Promise<UserConfig<T>>

export type UserConfigType<ThemeConfig = any>  =
  | ConfigType<ThemeConfig>
  | (() => ConfigType<ThemeConfig>)