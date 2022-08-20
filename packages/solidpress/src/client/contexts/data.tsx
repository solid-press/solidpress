import { createContext } from 'solid-js'

import type { ParentProps } from 'solid-js'
// import type { SiteData, PageData } from '../../../node'

// export type SolidPressData<ThemeConfig = any> = {
//   site: Accessor<SiteData<ThemeConfig>>
//   page: Accessor<PageData>
//   theme: Accessor<ThemeConfig>
//   frontmatter: Accessor<PageData['frontmatter']>
//   title: Accessor<string>
//   description: Accessor<string>
//   lang: Accessor<string>
//   localePath: Accessor<string>
// }

export const DataContext = createContext()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataProvider = (props: ParentProps<any>) => {

  const data = () => {
    const { children, ...filteredData} = props
    return filteredData
  }
  return (
    <DataContext.Provider value={data()}>
      {props.children}
    </DataContext.Provider>
  )
}
