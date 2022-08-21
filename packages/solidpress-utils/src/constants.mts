import { createRequire } from 'module'
// Using require to escape from importing issue reported by typing system.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = createRequire(import.meta.url)('../package.json')
export const SOLIDPRESS_VERSION = pkg.version