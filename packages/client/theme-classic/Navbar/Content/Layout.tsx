import type { JSX } from 'solid-js'

export interface Props {
  left: JSX.Element
  right: JSX.Element
}

export default function NavbarContentLayout({
  left,
  right,
}: Props) {
  return (
    <div class="navbar__inner">
      <div class="navbar__items">{left}</div>
      <div class="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}