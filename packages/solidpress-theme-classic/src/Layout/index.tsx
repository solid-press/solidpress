import clsx from 'clsx'
import { ErrorBoundary, Show } from 'solid-js/web'
import NavBar from '@theme/Navbar'

import type { ParentProps, JSX } from 'solid-js'
export interface Props {
  noFooter?: boolean
  wrapperClass?: string
}

export default function Layout(props: ParentProps<Props>): JSX.Element {

  return (
    <div>
      <NavBar />
      <div class={clsx(props.wrapperClass)}>
        <ErrorBoundary fallback={(params: any) => params}>
          {props.children}
        </ErrorBoundary>
      </div>

      <Show when={!props.noFooter}>
        <div>
          Footer
        </div>
      </Show>
    </div>
  )
}