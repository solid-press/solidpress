import { HeadConfigs } from './head'

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
