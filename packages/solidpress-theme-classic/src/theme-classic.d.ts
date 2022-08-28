/// <reference types="@solidpress/alias" />

declare module '@theme/Layout' {
  import type {JSX} from 'solid-js';

  export interface Props {
    readonly children?: JSX.Element;
  }

  export default function Layout(props: Props): JSX.Element;
}

declare module '@theme/Navbar' {
  import type {JSX} from 'solid-js';

  export interface Props {
    readonly children?: JSX.Element;
  }

  export default function NavBar(props: Props): JSX.Element;
}

declare module '@theme/Logo' {
  import type { JSX } from 'solid-js'
  import type { Logo } from '@solidpress/core/lib/client/exports/useThemeConfig'
  type ImgAttrs = JSX.IntrinsicElements['img']
  
  export interface Props extends ImgAttrs {
    titleKls?: string
    logoKls?: string
    brandName?: string
    logo?: Logo
  }

  export default function Logo(props: Props): JSX.Element
}

declare module '@theme/Navbar/Layout' {
  import type {JSX} from 'solid-js';

  export interface Props {
    readonly children?: JSX.Element;
  }

  export default function Layout(props: Props): JSX.Element;
}

declare module '@theme/Navbar/Content' {
  import type {JSX} from 'solid-js';

  export interface Props {
    readonly children?: JSX.Element;
  }

  export default function Content(props: Props): JSX.Element;
}
