

import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem'

import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem'
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem'
import type { JSX } from 'solid-js'

const LocaleDropdownNavbarItem = (props: Props): JSX.Element => {
  // const { locales, localesConfig, currentLocale } = useI18n()
  const currentLocale = ''
  const locales = []
  const itemCls$ = () => props.mobile
    ? 'menu__link--active'
    : 'dropdown__link--active'

  const localeItems = (): LinkLikeNavbarItemProps[] => {
    const itemCls = itemCls$()
    return locales.map((locale) => {
      return {
        label: '',
        lang: '',
        to: '',
        target: '_self',
        class: locale === currentLocale
          ? itemCls
          : ''
      }
    })
  }

  return (
    <DropdownNavbarItem
      items={localeItems()}
      {...props}
    />
  )

}

export default LocaleDropdownNavbarItem