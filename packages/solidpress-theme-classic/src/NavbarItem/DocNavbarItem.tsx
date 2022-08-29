import { splitProps } from 'solid-js'
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'

import type { Props } from '@theme/NavbarItem/DocNavbarItem'
import type { JSX } from 'solid-js'

const DocNavbarItem = (props: Props): JSX.Element | null => {

  const isActive = () => false
  const [, restProps] = splitProps(props, ['docId', 'label'])
  const docProps = () => {
    return {
      label: props.label ?? '',
      to: 'path'
    }
  }

  return (
    <DefaultNavbarItem
      active={isActive()}
      {...restProps}
      {...docProps()}
    />
  )
}

export default DocNavbarItem