import { For } from 'solid-js/web'
import { useNavbar } from '@solidpress/core/lib/client'
import NavbarItem from '@theme/NavbarItem'
import NavbarContentLayout from './Layout';
import NavbarLogo from '../Logo'

import type { JSX } from 'solid-js';
import type { NavItem } from '@solidpress/types'

const NavbarItems = (props: {
  items: NavItem[],
}): JSX.Element => {
  return (
    <For each={props.items}>
      {(item) => {
        return <NavbarItem {...(item as any)} />
      }}
    </For>
  )
}

export default function (): JSX.Element {
  const navbar = useNavbar()
  const logo = () => navbar().logo
  const brandName = () => navbar().name
  const navbarItems = () => navbar().items
  return (
    <NavbarContentLayout
      left={
        <>
          <NavbarLogo
            logo={logo()}
            brandName={brandName()}
          />
          <NavbarItems items={navbarItems()}/>
        </>
      }
      right={<>Items</>} />
  )
}
