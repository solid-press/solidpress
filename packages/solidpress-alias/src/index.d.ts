
declare module '@theme/Layout' {
  import type { JSX } from 'solid-js';

  export interface Props {
    readonly children?: JSX.Element
  }

  export default function Layout(props: Props): JSX.Element;
}