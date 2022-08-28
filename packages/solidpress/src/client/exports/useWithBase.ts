import { withBase } from '@solidpress/utils'
import { useSiteData } from './useSiteData'

type UseWithBaseReturn = (path: string) => string

export const useWithBase = (): UseWithBaseReturn => {
  const { siteData } = useSiteData()

  return (path: string) => {
    const { base } = siteData()

    return withBase(path, base)
  }
}