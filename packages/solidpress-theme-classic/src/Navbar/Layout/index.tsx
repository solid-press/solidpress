import type { ParentProps, JSX } from 'solid-js';

export default function (props: ParentProps): JSX.Element {
  let navbarRef: HTMLElement | undefined;

  return (
    <nav
      ref={navbarRef}
      classList={{
        navbar: true,
        'navbar-fixed-top': true,
      }}>
      {props.children}
    </nav>
  );
}
