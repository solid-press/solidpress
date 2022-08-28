import { render, isServer } from 'solid-js/web';
import 'virtual:windi-devtools'
import NotFound from '@theme/NotFound';
import { createRouter } from './hooks/router';
import Root from './Root';

import 'virtual:windi.css'

const bootstrapApp = async () => {
  const { go, route } = createRouter(NotFound);
  await go();
  render(() => Root({ route }), document.querySelector('#app')!);
};

if (!isServer) {
  bootstrapApp();
}
