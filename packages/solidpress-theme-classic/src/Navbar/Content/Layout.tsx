import type { JSX } from 'solid-js';

export interface Props {
  left: JSX.Element;
  right: JSX.Element;
}

export default function NavbarContentLayout(props: Props): JSX.Element {
  return (
    <div class="navbar__inner">
      <div class="navbar__items">{props.left}</div>
      <div class="navbar__items navbar__items--right">{props.right}</div>
    </div>
  );
}
