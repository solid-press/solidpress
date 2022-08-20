import type { AliasOptions } from 'vite'
import type { HeadConfigs } from './head'
import type { UserConfig } from './config'

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