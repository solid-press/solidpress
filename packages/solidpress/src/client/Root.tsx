import Layout from '@theme/Layout';
import {
  SiteDataProvider,
  SidebarsProvider,
  RouterProvider,
  VersionsProvider,
} from './contexts';

import type {
  Accessor,
  ParentComponent,
  ParentProps,
  JSX,
} from 'solid-js';
import type { Route } from '@solidpress/types';

export type Props = {
  route: Accessor<Route>;
};

function compose(Providers: ParentComponent[]) {
  return Providers.reduce((
    Parent: ParentComponent,
    Provider
  ) => (innerProps: ParentProps) => (
    <Parent>
      <Provider>
        {innerProps.children}
      </Provider>
    </Parent>),
    (initProps: ParentProps) => <>{initProps.children}</>)
}

export default (props: Props): JSX.Element => {
  const Provider = compose([
    SiteDataProvider,
    SidebarsProvider,
    VersionsProvider,
  ])
  return (
    <Provider>
      <RouterProvider value={props.route()}>
        <Layout>{'Layout'}</Layout>
      </RouterProvider>
    </Provider>
  );
};
