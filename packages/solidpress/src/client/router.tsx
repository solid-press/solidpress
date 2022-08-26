import {createContext} from 'solid-js';
// import { Suspense } from 'solid-js/web'
// import { loadable } from '@solidpress/utils'
// import NotFound from '@theme/NotFound'
// import { createRouter, pageLoader, setRoute } from './hooks/router'

// import type { JSX, ParentProps } from 'solid-js'
// import type { ContextProviderComponent, } from './hooks/router'

const RouterContext = createContext();

const {Provider: RouterProvider} = RouterContext;

export {RouterContext, RouterProvider};
