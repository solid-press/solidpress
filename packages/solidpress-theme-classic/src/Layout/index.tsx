import clsx from 'clsx';
import { ErrorBoundary, Show } from 'solid-js/web';
import { useRoute } from '@solidpress/core/lib/client';
import NavBar from '@theme/Navbar';

import type { ParentProps, JSX } from 'solid-js';

import '../styles/vars.css'
import '../styles/base.css'
import '../styles/index.css'
export interface Props {
  noFooter?: boolean;
  wrapperClass?: string;
}

export default function Layout(props: ParentProps<Props>): JSX.Element {
  const route = useRoute();
  const Component = route.component;
  return (
    <div>
      <NavBar />
      <div class={clsx(props.wrapperClass)}>
        <ErrorBoundary fallback={(params: any) => params}>
          {props.children}
          <Component />
        </ErrorBoundary>
      </div>

      <Show when={!props.noFooter}>
        <div>Footer</div>
      </Show>
    </div>
  );
}
