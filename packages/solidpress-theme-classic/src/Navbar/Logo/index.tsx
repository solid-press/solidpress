import { ns } from '@solidpress/utils'
import Logo from '@theme/Logo'

import type { Props } from '@theme/Logo'
import type { JSX } from 'solid-js'

type NavbarLogoProps = Pick<Props, 'logo' | 'brandName'>

const NavbarLogo = (props: NavbarLogoProps): JSX.Element => {
  const _ns = ns('navbar')
  const brandKls = _ns.e('brand')
  const logoKls = _ns.e('logo')
  const titleKls = `${_ns.e('title')} truncated`

  return <Logo
    class={brandKls}
    logoKls={logoKls}
    titleKls={titleKls}
    logo={props.logo}
    brandName={props.brandName}
  />
}

export default NavbarLogo