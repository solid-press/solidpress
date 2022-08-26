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
