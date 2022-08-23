import clsx from 'clsx'
import { useContext } from 'solid-js'
import { ErrorBoundary, Show } from 'solid-js/web'
import { RouterContext } from '@solidpress/core/lib/client'
import NavBar from '@theme/Navbar'
console.log(RouterContext)

import type { ParentProps, JSX } from 'solid-js'
export interface Props {
  noFooter?: boolean
  wrapperClass?: string
}

export default function Layout(props: ParentProps<Props>): JSX.Element {
  const route = useContext(RouterContext)
  console.log(route)
  return (
    <div>
      <NavBar />
      {}
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