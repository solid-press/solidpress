import type { ComponentTypes } from '@theme/NavbarItem/ComponentTypes'

import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'
import DocNavbarItem from '@theme/NavbarItem/DocNavbarItem'
import DocsVersionNavbarItem from '@theme/NavbarItem/DocsVersionNavbarItem'
import HtmlNavbarItem from '@theme/NavbarItem/HtmlNavbarItem'


const COMPONENT_TYPES: ComponentTypes = {
  default: DefaultNavbarItem,
  doc: DocNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  html: HtmlNavbarItem,
}

export default COMPONENT_TYPES