import { splitProps } from 'solid-js'
import { Dynamic, Show } from 'solid-js/web'
import NavLink from '@theme/NavLink'

import type { CommonProps, Props } from '@theme/NavbarItem/DefaultNavbarItem'
import type { JSX } from 'solid-js'

const Mobile = (props: CommonProps) => {
  return (
    <li class='menu__list-item'>
      <NavLink
        classList={{
          ['menu__link']: true,
          [props.class]: true,
        }}
        {...props}
      />
    </li>
  )
}

const Desktop = (props: CommonProps) => {
  const el = (
    <NavLink
      classList={{
        ['dropdown__link']: props.isDropdownLink,
        ['navbar__item navbar__link']: props.isDropdownLink,
        [props.class]: true,
      }}
      {...props}
    />
  )
  return (
    <Show
      when={props.isDropdownLink}
      fallback={el}
    >
      <li>
        {el}
      </li>
    </Show>
  )
}

const DefaultNavbarItem = (props: Props): JSX.Element => {
  const component = () => props.mobile ? Mobile : Desktop
  const [, omitProps] = splitProps(props, ['mobile'])
  return (
    <Dynamic component={component()} {...omitProps} />
  )
}

export default DefaultNavbarItem