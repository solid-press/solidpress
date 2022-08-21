import type { Alias } from 'vite'
import path from 'path'
import { DIST_CLIENT_DIR } from './paths'


export const resolveAlias = (_: string, themeDir: string): Alias[] => {
  const aliases: Alias[] = [
    {
      find: '@theme',
      replacement: themeDir,
    },
    {
      find: '@siteData',
      replacement: '/@siteData',
    },
    {
      find: /^solidpress$/,
      replacement: path.join(DIST_CLIENT_DIR, '/index'),
    },
    {
      find: /^solidpress\/theme$/,
      replacement: path.join(DIST_CLIENT_DIR, '/theme-classic/index')
    }
  ]

  return aliases
}