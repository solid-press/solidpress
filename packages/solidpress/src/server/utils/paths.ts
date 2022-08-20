import { normalizePath } from 'vite'
import path from 'path'

export const resolve = (...paths: string[]) =>
  normalizePath(path.resolve(...paths))

export const slash = (p: string) => p.replace(/\\/g, '/')
  