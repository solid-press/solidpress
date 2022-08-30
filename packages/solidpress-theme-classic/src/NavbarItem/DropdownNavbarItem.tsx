
import { Dynamic, For } from 'solid-js/web'
import { createSignal, onMount, onCleanup } from 'solid-js'
import {
  // isSamePath,
  // asRegxrMatch,
  ns
} from '@solidpress/utils'
import NavLink from '@theme/NavLink'
import NavbarItem from '@theme/NavbarItem'

// import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem'
import type { CommonProps, Props } from '@theme/NavbarItem/DropdownNavbarItem'
import type { Accessor, JSX } from 'solid-js'


const useDesktopNavbarItems = (props: CommonProps) => {
  const dropdownRef: { value: HTMLDivElement } = { value: undefined }
  const [dropdownVisible, setDropdownVisible] = createSignal(false)
  const cls = ns('dropdown')

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setDropdownVisible((prev) => !prev)
    }
  }

  const onNavItemKeyDown = (i$: Accessor<number>, e: KeyboardEvent,) => {
    const i = i$()
    if (i === props.items.length - 1 && e.key === 'Tab') {
      e.preventDefault()
      setDropdownVisible(false)
      const nextNavbarItem = dropdownRef.value.nextElementSibling
      if (nextNavbarItem) {
        const anchor = (nextNavbarItem.tagName === 'A'
          ? nextNavbarItem
          : nextNavbarItem.querySelector('a')) as HTMLAnchorElement

        anchor.focus()
      }
    }
  }

  const handlers = () => {
    const onClick = props.to ? undefined : (e: Event) => e.preventDefault()
    return {
      onClick,
      onKeyDown,
    }
  }

  const defaultKls = `navbar__item ${cls.kls} ${cls.m('hoverable')}`

  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    if (!dropdownRef.value || dropdownRef.value.contains(e.target as Node)) {
      return
    }
    setDropdownVisible(false)
  }

  const eventsToBind = ['mousedown', 'touchstart']

  onMount(() => {
    eventsToBind.forEach(e => {
      document.addEventListener(e, handleClickOutside)
    })
  })

  onCleanup(() => {
    eventsToBind.forEach(e => {
      document.removeEventListener(e, handleClickOutside)
    })
  })

  return {
    cls,
    dropdownRef: (el: HTMLDivElement) => dropdownRef.value = el,
    dropdownVisible,
    setDropdownVisible,
    onNavItemKeyDown,
    handlers,
    defaultKls,
  }
}

const Desktop = (props: CommonProps): JSX.Element => {

  const {
    dropdownRef,
    defaultKls,
    cls,
    dropdownVisible,
    handlers,
    onNavItemKeyDown,
  } = useDesktopNavbarItems(props)

  return (
    <div
      ref={dropdownRef}
      classList={{
        [defaultKls]: true,
        [cls.m('right')]: props.position === 'right',
        [cls.m('show')]: dropdownVisible()
      }}
    >
      <NavLink
        aria-haspopup="true"
        aria-expanded={dropdownVisible()}
        role='button'
        classList={{
          'navbar__link': true,
          [props.class]: true,
        }}
        {...props}
        {...handlers()}
      >
        {props.children || props.label}
      </NavLink>
      <ul class={cls.e('menu')}>
        <For each={props.items}>
          {(item, i$) => {
            return (
              <NavbarItem
                isDropdownLink
                onKeyDown={[onNavItemKeyDown, i$]}
                {...item}
                activeClass='dropdown__link--active'
              />
            )
          }}
        </For>
      </ul>
    </div>
  )
}

// const isActive = (
//   item: LinkLikeNavbarItemProps,
//   path: string
// ): boolean => {
//   const { to, activeMatch } = item
//   if (
//     isSamePath(to, path)
//     || asRegxrMatch(activeMatch, path)
//     || activeMatch && path.startsWith(activeMatch)
//   ) {
//     return true
//   }
//   return false
// }

// const containsActiveItem = (
//   items: LinkLikeNavbarItemProps[],
//   path: string
// ): boolean => items.some(item => isActive(item, path))

const Mobile = (): JSX.Element => {
  // leave mobile version out for later implementation
  return <></>
}

const DropdownNavbarItem = (props: Props): JSX.Element => {
  const component = () => props.mobile ? Mobile : Desktop
  const others = () => {
    const { mobile, ...rest } = props
    return rest
  }

  return (
    <Dynamic
      component={component()}
      {...others()}
    />
  )
}

export default DropdownNavbarItem
