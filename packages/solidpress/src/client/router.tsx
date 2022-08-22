import { createContext, lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'
import { loadable } from '@solidpress/utils'
import NotFound from '@theme/NotFound'
import { createRouter, pageLoader, setRoute } from './hooks/router'

import type { JSX, ParentProps } from 'solid-js'
import type { ContextProviderComponent, } from './hooks/router'

const RouterContext = createContext()

export interface Props extends ParentProps {
  path: string
}

export default function RouterProvider(props: Props): JSX.Element {

  const Router = lazy(
    loadable(
      createRouter(async () => {
        const { __pageData: pageData } = await pageLoader(props.path)
        setRoute((prevRoute) => ({
          ...prevRoute,
          path: props.path,
        }))
        return (
          <RouterContext.Provider value={pageData}>
            {props.children}
          </RouterContext.Provider>
        ) as ContextProviderComponent
      }, NotFound)
    )
  )

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Router />
    </Suspense>
  )
}

export { RouterContext, RouterProvider }
