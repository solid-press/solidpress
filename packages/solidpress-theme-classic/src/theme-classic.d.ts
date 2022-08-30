/// <reference types="@solidpress/alias" />

declare module '@theme/Layout' {
  import type { ParentProps, JSX } from 'solid-js';

  export interface Props extends ParentProps {}

  export default function Layout(props: Props): JSX.Element;
}

declare module '@theme/Navbar' {
  import type { ParentProps, JSX } from 'solid-js';

  export interface Props extends ParentProps {}

  export default function NavBar(props: Props): JSX.Element;
}

declare module '@theme/Logo' {
  import type { JSX } from 'solid-js'
  import type { Logo } from '@solidpress/types'
  type ImgAttrs = JSX.IntrinsicElements['img']

  export interface Props extends ImgAttrs {
    titleKls?: string
    logoKls?: string
    brandName?: string
    logo?: Logo
  }

  export default function Logo(props: Props): JSX.Element
}

declare module '@theme/Link' {
  import type { ParentProps, JSX } from 'solid-js'

  export interface Props extends ParentProps, JSX.CustomAttributes<never> {
    active?: boolean
    href?: string
    noIcon?: boolean
  }

  export default function Link(props: Props): JSX.Element
}

declare module '@theme/Navbar/Layout' {
  import type { ParentProps, JSX } from 'solid-js';

  export interface Props extends ParentProps {}

  export default function Layout(props: Props): JSX.Element;
}

declare module '@theme/Navbar/Content' {
  import type { ParentProps, JSX } from 'solid-js';

  export interface Props extends ParentProps {}

  export default function Content(props: Props): JSX.Element;
}

declare module '@theme/NavbarItem/ComponentTypes' {
  import type DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'
  import type { Component } from 'solid-js'


  export type ComponentTypes = {
    default: typeof DefaultNavbarItem
    [componentName: string]: Component
  }

  const COMPONENT_TYPES: ComponentTypes
  export default COMPONENT_TYPES
}

declare module '@theme/NavbarItem' {
  import type { Props as DefaultNavbarItemProps } from '@theme/NavbarItem/DefaultNavbarItem'
  import type { Props as DocNavbarItemProps } from '@theme/NavbarItem/DocNavbarItem'
  import type { Props as HtmlNavbarItemProps } from '@theme/NavbarItem/HtmlNavbarItem'
  import type { Props as DocsVersionNavbarItemProps } from '@theme/NavbarItem/DocsVersionNavbarItem'
  import type { Props as DocSidebarNavbarItemProps } from '@theme/NavbarItem/DocSidebarNavItem'
  import type { JSX } from 'solid-js'

  type AnchorAttrs = JSX.IntrinsicElements['a']

  export type LinkLikeNavbarItemProps =
    | ({ type?: 'default' } & DefaultNavbarItemProps)
    | ({ type: 'doc' } & DocNavbarItemProps)
    | ({ type: 'html' } & HtmlNavbarItemProps)
    | ({ type: 'docsVersion' } & DocsVersionNavbarItemProps)
    | ({ type: 'docSidebar' } & DocSidebarNavbarItemProps)

  export type Props = AnchorAttrs & {
    position?: 'left' | 'right'
  } & (
      | LinkLikeNavbarItemProps
    )

  export type NavbarItemType = Props['type']

  export default function NavbarItem(props: Props): JSX.Element
}

declare module '@theme/NavbarItem/DefaultNavbarItem' {
  import type { Props as NavLinkProps } from '@theme/NavLink'
  import type { JSX } from 'solid-js'

  export type CommonProps = {
    class?: string
    position?: 'left' | 'right'
  } & NavLinkProps

  export type Props = {
    mobile?: boolean
  } & CommonProps

  export default function DefaultNavbarItem(props: Props): JSX.Element
}

declare module '@theme/NavbarItem/DocNavbarItem' {
  import type {
    Props as DefaultNavbarItemProps
  } from '@theme/NavbarItem/DefaultNavbarItem'

  import type { JSX } from 'solid-js'

  export type Props = {
    docId: string
  } & DefaultNavbarItemProps

  export default function DocNavbarItem(props: Props): JSX.Element | null
}

declare module '@theme/NavbarItem/HtmlNavbarItem' {
  import type {
    Props as DefaultNavbarItemProps
  } from '@theme/NavbarItem/DefaultNavbarItem'
  import type { JSX } from 'solid-js'

  export type Props = {
    value: string
  } & DefaultNavbarItemProps

  export default function HtmlNavbarItem(props: Props): JSX.Element
}

declare module '@theme/NavbarItem/DocsVersionNavbarItem' {
  import type {
    Props as DefaultNavbarItemProps
  } from '@theme/NavbarItem/DefaultNavbarItem'
  import type { JSX } from 'solid-js'

  export type Props = DefaultNavbarItemProps
  export default function DocsVersionNavbarItem(props: Props): JSX.Element
}

declare module '@theme/NavbarItem/DocSidebarNavItem' {
  import type { Props as DefaultNavbarItemProps } from '@theme/NavbarItem/DefaultNavbarItem'
  import type { JSX } from 'solid-js'

  export type Props = {
    sidebarId: string
  } & DefaultNavbarItemProps
  export default function DocSidebarNavItem(props: Props): JSX.Element
}


declare module '@theme/NavbarItem/DropdownNavbarItem' {
  import type { Props as NavLinkProps } from '@theme/NavLink'
  import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem'
  import type { JSX } from 'solid-js'

  export type CommonProps = {
    class?: string
    position?: 'left' | 'right'
    items: readonly LinkLikeNavbarItemProps[]
  } & NavLinkProps

  export interface Props extends CommonProps  {
    mobile?: boolean
  }

  export default function DropdownNavbarItem(props: Props): JSX.Element
}

declare module '@theme/NavLink' {
  import type { JSX } from 'solid-js'
  import type { NavItem } from '@solidpress/types'

  export type Props = {
    href?: string
    html?: string
    to?: string
    isDropdownLink?: boolean
    active?: boolean
  } & JSX.CustomAttributes<never> & NavItem

  export default function NavLink(props: Props): JSX.Element
}

declare module '@theme/Icon/ExternalLink' {
  import type { JSX } from 'solid-js'

  export type Props = JSX.IntrinsicElements['svg']

  export default function ExternalLink(props: Props): JSX.Element
}