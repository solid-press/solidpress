import { createContext, createSignal } from 'solid-js'
import versions from '@versions'

import type { Accessor, JSX, ParentProps } from 'solid-js'

const [versions$, setSidebars] = createSignal(versions)

export interface VersionsContextType {
  versions: Accessor<typeof versions>
}

export const VersionsContext = createContext<VersionsContextType>()
const { Provider } = VersionsContext

export const VersionsProvider =
  (props: ParentProps): JSX.Element => {

    const data = {
      versions: versions$,
    }

    return (
      <Provider value={data}>
        {props.children}
      </Provider>
    )
  }

if (import.meta.hot) {
  import.meta.hot.accept('/@versions', (m) => {
    if (m) {
      setSidebars(m.default);
    }
  });
}

export {
  versions$,
}
