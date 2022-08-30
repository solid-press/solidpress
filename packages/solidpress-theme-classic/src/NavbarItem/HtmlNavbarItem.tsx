import { Dynamic } from 'solid-js/web'

import type { Props } from '@theme/NavbarItem/HtmlNavbarItem'
import type { JSX } from 'solid-js'

const HtmlNavbarItem = (props: Props): JSX.Element => {
  const component = () => props.isDropdownLink ? 'li' : 'div'

  const isNavbarItem = () => {
    return !(props.mobile || props.isDropdownLink)
  }
  return (
    <Dynamic
      component={component()}
      classList={{
        'navbar__item': isNavbarItem(),
        'menu__list-item': props.mobile,
        ...(props.class ? { [props.class]: true } : {}),
        ...(props.classList || {})
      }}
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={props.value}
    />
  )
}

export default HtmlNavbarItem
