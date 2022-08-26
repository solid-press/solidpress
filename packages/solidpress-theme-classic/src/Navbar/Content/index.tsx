import NavbarContentLayout from './Layout';

import type {JSX} from 'solid-js';

export default function (): JSX.Element {
  return <NavbarContentLayout left={<>Logo</>} right={<>Items</>} />;
}
