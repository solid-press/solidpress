/// <reference types="@solidpress/alias" />
/// <reference types="vite/client" />

declare module '@siteData' {
  import type {SiteData} from '@solidpress/types';

  const data: SiteData;
  export default data;
}
