import { useContext } from 'solid-js'
import { RouterContext } from "../contexts"

import type { Route } from '@solidpress/types'

export const useRoute = (): Route | undefined => {
  return useContext(RouterContext)
}