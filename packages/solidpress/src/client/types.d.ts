/// <reference types="@solidpress/alias" />

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