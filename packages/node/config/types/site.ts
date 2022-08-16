import { HeadConfigs } from './head'
import { UserConfig } from './config'

export interface LanguageConfig {
  lang: string
  label: string
}

export interface SiteData {
  base: string
  appearance: boolean
  description: string
  lang: string
  title: string
  secondaryTitle?: string
  head: HeadConfigs
  langs: Record<string, LanguageConfig>
  locales: Record<string, SiteLocalizedConfig>
}

export type SiteLocalizedConfig = {
  label?: string
} & Pick<SiteData, 'lang'> & Partial<Exclude<SiteData, 'lang'>>

export type SiteConfig = {
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