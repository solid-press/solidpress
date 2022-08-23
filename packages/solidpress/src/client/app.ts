import { render, isServer } from 'solid-js/web'
import NotFound from '@theme/NotFound'
import { createRouter } from './hooks/router'
import Root from './Root'

const bootstrapApp = async () => {
  const { go, route } = createRouter(NotFound)
  await go()
  render(() => Root({ route }), document.querySelector('#app')!)
}

if (!isServer) {
  bootstrapApp()
}