import { useSiteData } from './useSiteData'

import type { ThemeConfig } from '@solidpress/types'
import type { Accessor } from 'solid-js'

export const useThemeConfig = (): Accessor<ThemeConfig> => {
 const { siteData } = useSiteData()

 return () => siteData().themeConfig
}