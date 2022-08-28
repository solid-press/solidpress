import { useThemeConfig } from './useThemeConfig'

import type { Accessor } from 'solid-js'
import type { Navbar } from './useThemeConfig'

export const useNavbar = (): Accessor<Navbar> => {
  const themeConfig = useThemeConfig()
  return () => themeConfig().navbar || {} as Navbar
}