import { useContext } from 'solid-js'
import { SiteDataContext } from '../contexts'

import type { SiteDataContextType } from '../contexts'

export const useSiteData = (): SiteDataContextType | undefined => {
  return useContext(SiteDataContext)
}