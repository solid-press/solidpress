import { useRoute } from './useRoute'

import type { Accessor } from 'solid-js'
import type { Route } from '@solidpress/types'

export type UsePageDataReturn = Accessor<Route['data']>

export const usePageData = (): UsePageDataReturn => {
  return () => useRoute().data
}