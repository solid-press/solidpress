import { useWithBase, usePageData } from '@solidpress/core/lib/client'
import { isActive } from '@solidpress/utils'
import Link from '@theme/Link'

import type { Props } from '@theme/NavLink'
import type { JSX } from 'solid-js'

import styles from './styles.module.css'
console.log(styles)

const NavLink = (props: Props): JSX.Element => {
  const withBase = useWithBase()
  const page = usePageData()

  const href = () => withBase(props.href || props.to)
  const active = () => {
    const { activeMatch } = props
    const link = href()
    return isActive(
      page().relativePath,
      activeMatch || link,
      !!activeMatch
    )
  }

  return (
    <Link
      classList={{
        [styles.navlink]: true,
        [styles.active]: active(),
      }}
      href={href()}
      noIcon
    >
      {props.label}
    </Link>
  )

}

export default NavLink