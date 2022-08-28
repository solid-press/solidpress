import { useNavbar } from '@solidpress/core/lib/client'
import NavbarContentLayout from './Layout';
import NavbarLogo from '../Logo'

import type { JSX } from 'solid-js';

export default function (): JSX.Element {

  const navbar = useNavbar()
  const logo = () => navbar().logo
  const brandName = () => navbar().name
  // const navbarItems = () => navbar().items
  // console.log(navbar())
  return (
    <NavbarContentLayout
      left={
        <>
          <NavbarLogo
            logo={logo()}
            brandName={brandName()}
          />
        </>
      }
      right={<>Items</>} />
  )
}
