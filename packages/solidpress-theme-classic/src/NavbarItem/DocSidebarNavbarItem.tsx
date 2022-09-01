import { splitProps } from 'solid-js'
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'

import type { Props } from '@theme/NavbarItem/DocSidebarNavbarItem'
import type { JSX } from 'solid-js'

const DocNavbarItem = (props: Props): JSX.Element | null => {
  const [, restProps] = splitProps(props, ['sidebarId', 'to', 'label'])
  // const doc = useDoc()
  // const sidebar = useSidebar()
  const docProps = () => {
    return {
      // active: doc.sidebar === props.sidebarId,
      label: props.label ?? '', // sidebar.label
      to: 'path' // sidebar.path
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