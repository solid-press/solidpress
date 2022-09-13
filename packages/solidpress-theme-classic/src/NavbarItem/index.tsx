import { Dynamic } from 'solid-js/web'
import COMPONENT_TYPES from '@theme/NavbarItem/ComponentTypes'

import type { Props } from '@theme/NavbarItem'
import type { JSX } from 'solid-js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resolveNavbarItemType = (props: Props) => {
  // eslint-disable-next-line solid/reactivity
  const { type } = props
  if (!type || type === 'default') {
    return COMPONENT_TYPES['items' in props ? 'dropdown' : 'default']
  }
  return COMPONENT_TYPES[type]
}

const NavbarItem = (props: Props): JSX.Element => {
  return <Dynamic
    component={resolveNavbarItemType(props)}
    {...props}
  />
}

export default NavbarItem