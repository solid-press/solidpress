import type { ParentProps } from 'solid-js'

export type Props = ParentProps<{}>

export default function(props: Props) {
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