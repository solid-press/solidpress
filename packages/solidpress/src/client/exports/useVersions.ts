import { useContext } from 'solid-js'
import { VersionsContext } from '../contexts'

import type { VersionsContextType } from '../contexts'

export const useVersions = (): VersionsContextType => {
  return useContext(VersionsContext)
}