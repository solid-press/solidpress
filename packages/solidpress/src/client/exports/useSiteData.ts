import { useContext } from 'solid-js'
import { SiteDataContext } from '../contexts'

import type { SiteData } from '@solidpress/types'

export const useSiteData = (): SiteData | undefined => {
  return useContext(SiteDataContext)
}