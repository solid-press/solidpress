import Layout from '@theme/Layout'
import { DataProvider } from './contexts'


export default () => {

  
  return (
    <DataProvider value={}>
      <Layout>
        { 'Layout' }
      </Layout>
    </DataProvider>
  )
}