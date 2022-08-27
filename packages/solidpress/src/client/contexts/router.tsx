import { createContext } from 'solid-js';

import type { Route } from '@solidpress/types'

export const RouterContext = createContext<Route>()
export const RouterProvider = RouterContext.Provider
