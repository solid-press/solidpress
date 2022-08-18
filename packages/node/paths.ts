import { fileURLToPath } from 'url'
import { resolve, join } from 'path'

export const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../..')

export const DIST_CLIENT_DIR = resolve(PKG_ROOT, 'client')
export const DEFAULT_THEME_DIR = join(DIST_CLIENT_DIR, 'theme-classic')
export const APP_PATH = join(DIST_CLIENT_DIR, 'app')