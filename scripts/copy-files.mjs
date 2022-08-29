// Mostly copied from docusaurus with some twist
import fs from 'fs-extra'
import path from 'path'
import chokidar from 'chokidar'
import minimist from 'minimist'

const pwd = process.cwd()
const src = path.join(pwd, 'src')
const dest = path.join(pwd, 'lib')

const IGNORED = /(?:__tests__|\.tsx?$)/

function filter(p) {
  return !IGNORED.test(p)
}

const args = minimist(process.argv.slice(2))

async function copy() {
  await fs.copy(src, dest, {
    filter,
  })
}

if (args['watch']) {
  const watcher = chokidar.watch(src, {
    ignored: IGNORED,
    ignoreInitial: true,
    persistent: true,
  });
  ['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach(
    (evt) => {
      watcher.on(evt, copy)
    })
}

await copy()



