import { Show } from 'solid-js/web'
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem'
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'

import type { Props } from '@theme/NavbarItem/DocsVersionDropdownNavbarItem'
import type { JSX } from 'solid-js'

const DocsVersionDropdownNavbarItem = (props: Props): JSX.Element => {
  const versions = [] // get versions later

  const onItemClick = (name: string) => {
    console.log(name)
  }

  // version link getter
  const links$ = () => versions.map((version) => {
    const { label } = version
    const versionedDoc = {} as any // get versioned doc variable via version.
    return {
      label,
      to: versionedDoc.path,
      isActive: () => false, // active state accessor
    }
  })

  const items$ = () => [
    ...(props.dropdownItemsBefore || []),
    ...links$(),
    ...(props.dropdownItemsAfter || []),
  ]

  return (
    <Show
      when={items$().length > 1}
      fallback={
        <DefaultNavbarItem
          {...props}
        />
      }
    >
      <DropdownNavbarItem
        {...props}
        items={items$()}
        onItemClick={onItemClick}
      />
    </Show>
  )
}

export default DocsVersionDropdownNavbarItem
