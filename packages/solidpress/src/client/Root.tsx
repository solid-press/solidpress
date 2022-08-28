import Layout from '@theme/Layout';
import { SiteDataProvider, RouterProvider } from './contexts';

import type { Accessor, JSX } from 'solid-js';
import type { Route } from '@solidpress/types';

export type Props = {
  route: Accessor<Route>;
};

export default (props: Props): JSX.Element => {
  return (
    <SiteDataProvider>
      <RouterProvider value={props.route()}>
        <Layout>{'Layout'}</Layout>
      </RouterProvider>
    </SiteDataProvider>
  );
};
