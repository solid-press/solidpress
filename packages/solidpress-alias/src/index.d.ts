declare module '@theme/Layout' {
  import type {JSX} from 'solid-js';

  export interface Props {
    readonly children?: JSX.Element;
  }

  export default function Layout(props: Props): JSX.Element;
}

declare module '@theme/NotFound' {
  import type {JSX} from 'solid-js';

  export default function NotFound(): JSX.Element;
}


declare module '@siteData' {
  import type { SiteData } from '@solidpress/types';

  const data: SiteData;
  export default data;
}

declare module '@sidebars' {
  const sidebars: { [key: string]: unknown }

  export default sidebars
}

declare module '@versions' {
  const versionsData: {
    enabled: boolean
    versions: string[]
  }

  export default versionsData
}

declare module '@siteData/meta' {}

declare module '@siteData/config' {}

declare module '@siteData/routes' {}
