import { splitProps } from 'solid-js'
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'

import type { Props } from '@theme/NavbarItem/DocsVersionNavbarItem'
import type { JSX } from 'solid-js'

const DocNavbarItem = (props: Props): JSX.Element | null => {
  const [, restProps] = splitProps(props, ['to', 'label'])
  // const version = useVersion()
  const docProps = () => {
    return {
      label: props.label ?? '', // version.
      to: 'path' // versions[version].path
    }
  }

  return (
    <DefaultNavbarItem
      {...restProps}
      {...docProps()}
    />
  )
}

export default DocNavbarItem