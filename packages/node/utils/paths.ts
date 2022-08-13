import path from 'path'
import { normalizePath } from 'vite'

export const resolve = (...paths: string[]) =>
  normalizePath(path.resolve(...paths))