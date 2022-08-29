import { ns } from '@solidpress/utils'
import type { ParentProps, JSX } from 'solid-js';

import styles from './styles.module.css'

export default function (props: ParentProps): JSX.Element {
  let navbarRef: HTMLElement | undefined;

  const cls = ns('navbar')
  const clsx = [cls.kls, cls.m('fixed-top'), 'sticky', 'flex', 'top-0']
  return (
    <nav
      ref={navbarRef}
      id={styles.navbar}
      class={clsx.join(' ')}
    >
      {props.children}
    </nav>
  );
}
