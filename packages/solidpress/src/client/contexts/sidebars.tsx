import { createContext, createSignal } from 'solid-js'
import sidebars from '@sidebars'

import type { Accessor, JSX, ParentProps } from 'solid-js'

const [sidebars$, setSidebars] = createSignal(sidebars)

export interface SidebarsContextType {
  sidebars: Accessor<typeof sidebars>
}

export const SidebarsContext = createContext<SidebarsContextType>()
const { Provider } = SidebarsContext

export const SidebarsProvider =
  (props: ParentProps): JSX.Element => {

    const data = {
      sidebars: sidebars$,
    }

    return (
      <Provider value={data}>
        {props.children}
      </Provider>
    )
  }

if (import.meta.hot) {
  import.meta.hot.accept('/@sidebars', (m) => {
    if (m) {
      setSidebars(m.default);
    }
  });
}

export {
  sidebars$,
}
