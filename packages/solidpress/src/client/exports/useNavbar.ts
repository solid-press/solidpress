import { useThemeConfig } from './useThemeConfig'

import type { Accessor } from 'solid-js'
import type { Navbar } from '@solidpress/types'

export const useNavbar = (): Accessor<Navbar> => {
  const themeConfig = useThemeConfig()
  return () => themeConfig().navbar || {} as Navbar
}