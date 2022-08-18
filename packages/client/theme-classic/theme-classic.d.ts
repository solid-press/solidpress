declare module '@theme/Layout' {
  import type { JSX } from 'solid-js'

  export interface Props {
    readonly children?: JSX.Element
    readonly noFooter?: boolean
    readonly wrapperClass?: string
  }
}