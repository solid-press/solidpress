import type { NavItem } from '@solidpress/types'

const isPositionedItem = (
  item: NavItem,
  position: NavItem['position'] = 'left'
) => {
  return item.position === position
}

export const splitNavbarItems =
  (items: NavItem[]): [NavItem[], NavItem[]] => {
    const leftItems = []
    const rightItems = []
    for (const item of items) {
      (isPositionedItem(item) ? leftItems : rightItems)
        .push(item)
    }
    return [leftItems, rightItems]
  }