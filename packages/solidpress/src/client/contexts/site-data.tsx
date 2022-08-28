import { createContext, createSignal } from 'solid-js'
import siteData from '@siteData'

import type { Accessor, JSX, ParentProps } from 'solid-js'
import type { SiteData } from '@solidpress/types'

const [siteData$, setSiteData] = createSignal<SiteData>(siteData)

export interface SiteDataContextType {
  siteData: Accessor<SiteData>
}

export const SiteDataContext = createContext<SiteDataContextType>()

export const SiteDataProvider =
  (props: ParentProps): JSX.Element => {
    const { Provider } = SiteDataContext

    const data = {
      siteData: siteData$,
    }

    return (
      <Provider value={data}>
        {props.children}
      </Provider>
    )
  }

if (import.meta.hot) {
  import.meta.hot.accept('/@siteData', (m) => {
    if (m) {
      setSiteData(m.default);
    }
  });
}

export {
  siteData$,
}
