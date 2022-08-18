import clsx from 'clsx'
import { ErrorBoundary, Show } from 'solid-js/web'

import type { Props } from '@theme/Layout'

export default function Layout(props: Props) {

  const {
    children,
    noFooter,
    wrapperClass,
  } = props

  return (
  <div>
    <div class={clsx(wrapperClass)}>
      <ErrorBoundary fallback={(params) => params}>
        {children}
      </ErrorBoundary>
    </div>

    <Show when={!noFooter}>
      <div>
        Footer
      </div>
    </Show>

  </div>
  )
}