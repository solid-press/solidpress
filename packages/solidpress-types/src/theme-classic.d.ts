export interface NavItem {
  activeMatch?: string
  label?: string
  items?: NavItem[]
  position?: 'left' | 'right'
  [key: string]: unknown
}

export interface Logo {
  alt?: string
  src: string
  // src used when dark mode.
  darkSrc?: string
  // When href givin, logo will be wrapped with an a tag.
  href?: string
  // Only used when href were given.
  target?: string
  // since width and height in solid-js is strictly string
  // so we only allow explicit unit-marked size indicator.
  width?: string
  height?: string
  // customized class name for the logo wrapper.
  class?: string
}

export interface Navbar {
  items: NavItem[]
  name?: string
  logo?: Logo
}

export interface ThemeConfig {
  navbar: Navbar
  versioned?: boolean
  // Only available when versioned is true
  // Default to `versioned_docs`
  versionedContentPath?: string
  // Only available when versioned is true
  // Default to `versioned_sidebars`
  versionedSidebarPath?: string
  // Default to `.solidpress/sidebar.[ts|js|json]`
  sidebarPath?: string
}