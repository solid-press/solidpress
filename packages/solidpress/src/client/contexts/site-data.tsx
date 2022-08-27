import { createContext, createSignal } from 'solid-js'
import siteData from '@siteData'

import type { JSX, ParentProps } from 'solid-js'
import type { SiteData } from '@solidpress/types'

const [siteData$, setSiteData] = createSignal<SiteData>(siteData)

export const SiteDataContext = createContext<SiteData>()

export const SiteDataProvider =
  (props: ParentProps): JSX.Element => {
    const { Provider } = SiteDataContext

    return (
      <Provider value={siteData$()}>
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
