import Layout from '@theme/Layout'
import { DataProvider } from './contexts'
import { RouterProvider } from './router'

import type { Accessor, JSX } from 'solid-js'
import type { Route } from '@solidpress/types'

export type Props = {
  route: Accessor<Route>
}

export default (props: Props): JSX.Element => {
  return (
    <DataProvider value={{}}>
      <RouterProvider value={props.route()}>
        <Layout>
          {'Layout'}
        </Layout>
      </RouterProvider>
    </DataProvider>
  )
}