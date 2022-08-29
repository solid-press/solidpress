import type { JSX } from 'solid-js';

import styles from './layout.module.css'
export interface Props {
  left: JSX.Element;
  right: JSX.Element;
}

export default function NavbarContentLayout(props: Props): JSX.Element {

  return (
    <div classList={{
      [styles.navbar__inner]: true,
      flex: true,
      'flex-wrap': true,
      'justify-between': true,
      'items-center': true,
    }}>
      <div class="navbar__items flex items-center">{props.left}</div>
      <div class="navbar__items navbar__items--right">{props.right}</div>
    </div>
  );
}
