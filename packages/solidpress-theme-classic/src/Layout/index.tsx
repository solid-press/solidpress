import clsx from 'clsx'
import { ErrorBoundary, Show } from 'solid-js/web'
import NavBar from '@theme/Navbar'

import type { ParentProps } from 'solid-js'
export interface Props {
  noFooter?: boolean
  wrapperClass?: string
}

export default function Layout(props: ParentProps<Props>) {
  const {
    children,
    noFooter,
    wrapperClass,
  } = props

  return (
    <div>

      <NavBar />
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