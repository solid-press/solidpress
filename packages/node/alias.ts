import type { Alias } from 'vite'

export const resolveAlias = (_: string, themeDir: string) => {
  const aliases: Alias[] = [
    {
      find: '@theme',
      replacement: themeDir,
    },
    {
      find: '@siteData',
      replacement: '/@siteData',
    }
  ]

  return aliases
}