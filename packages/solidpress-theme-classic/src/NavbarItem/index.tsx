import { Dynamic } from 'solid-js/web'
import COMPONENT_TYPES from '@theme/NavbarItem/ComponentTypes'

import type { Props } from '@theme/NavbarItem'
import type { JSX } from 'solid-js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resolveNavbarItemType = (type: string) => {
  return COMPONENT_TYPES.default
}

const NavbarItem = (props: Props): JSX.Element => {
  return <Dynamic component={COMPONENT_TYPES.default} {...props} />
}

export default NavbarItem