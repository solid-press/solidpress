import type { AliasOptions, UserConfig as ViteConfig, ConfigEnv } from 'vite'
import type { HeadConfigs } from './head'

export type BuildType = ConfigEnv['command']

export type UserConfig<ThemeConfig = any> = 
& {
  appearance?: boolean,
  extends?: UserConfigType<ThemeConfig>
  base?: string
  srcDir?: string
  excludes?: string[]
  outDir?: string
  title?: string
  description?: string
  head?: HeadConfigs  
  vite?: ViteConfig
}
& Partial<
    Pick<
      SiteData, 
      'base' | 'lang' | 'locales' | 'title' | 'secondaryTitle' | 'head' | 'description' | 'appearance'
    >
  >

export type ConfigType<T> = UserConfig<T> | Promise<UserConfig<T>>

export type UserConfigType<ThemeConfig = any>  =
  | ConfigType<ThemeConfig>
  | (() => ConfigType<ThemeConfig>)

export interface LanguageConfig {
  lang: string
  label: string
}

export interface SiteData<ThemeConfig = any> {
  base: string
  appearance: boolean
  description: string
  lang: string
  title: string
  secondaryTitle?: string
  head: HeadConfigs
  langs: { [key: string]: LanguageConfig }
  locales: { [key: string]: SiteLocalizedConfig }
  themeConfig: ThemeConfig
}

export type SiteLocalizedConfig = {
  label?: string
} & Pick<SiteData, 'lang'> & Partial<Exclude<SiteData, 'lang'>>

export type SiteConfig = {
  alias: AliasOptions
  root: string
  srcDir: string
  site: SiteData
  configPath: undefined | string
  deps: string[]
  outDir: string
  tempDir: string
  themeDir: string
  pages: string[]
} & Pick<UserConfig, 'vite'>