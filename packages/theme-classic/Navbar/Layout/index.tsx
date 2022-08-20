import type { ParentProps, JSX } from 'solid-js'

export type Props = ParentProps<void>

export default function(props: Props): JSX.Element {
  let navbarRef: HTMLElement | undefined
  
  return (
    <nav
      ref={navbarRef}
      classList={{
        navbar: true,
        'navbar-fixed-top': true,
      }}
    >
      { props.children }
    </nav>
  )
}