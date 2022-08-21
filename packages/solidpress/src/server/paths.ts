import { fileURLToPath } from 'url'
import path from 'path'

export const PKG_ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')

export const DIST_CLIENT_DIR = path.resolve(PKG_ROOT, 'client')

// export const DEFAULT_THEME_DIR = require.resolve('@solidpress/theme-classic')

export const APP_PATH = DIST_CLIENT_DIR 