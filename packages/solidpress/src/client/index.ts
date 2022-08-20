import { render, isServer } from 'solid-js/web'
import App from './app'

const bootstrapApp = () => {
  render(App, document.querySelector('#app')!)
}

if (!isServer) {
  bootstrapApp()
}