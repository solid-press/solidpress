import { render, isServer } from 'solid-js/web'
import NotFound from '@theme/NotFound'
import { createRouter } from './hooks/router'
import App from './app'

const bootstrapApp = async () => {
  const { go, route } = createRouter(NotFound)
  await go()
  render(() => App({ route }), document.querySelector('#app')!)
}

if (!isServer) {
  bootstrapApp()
}