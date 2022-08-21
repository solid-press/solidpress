import Layout from '@theme/Layout'
import { DataProvider } from './contexts'

import type { JSX } from 'solid-js'

export default (): JSX.Element => {
  return (
    <DataProvider value={{}}>
      <Layout>
        { 'Layout' }
      </Layout>
    </DataProvider>
  )
}