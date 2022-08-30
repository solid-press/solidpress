import type { ComponentTypes } from '@theme/NavbarItem/ComponentTypes'

import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'
import DocNavbarItem from '@theme/NavbarItem/DocNavbarItem'
import DocsVersionNavbarItem from '@theme/NavbarItem/DocsVersionNavbarItem'
import DocSidebarNavbarItem from '@theme/NavbarItem/DocSidebarNavItem'
import HtmlNavbarItem from '@theme/NavbarItem/HtmlNavbarItem'


const COMPONENT_TYPES: ComponentTypes = {
  default: DefaultNavbarItem,
  doc: DocNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  html: HtmlNavbarItem,
}

export default COMPONENT_TYPES