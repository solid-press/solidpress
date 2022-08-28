import { splitProps } from 'solid-js'
import type { Props } from '@theme/Logo'
import LogoImage from './Image'
import type { JSX } from 'solid-js'

const Logo = (props: Props): JSX.Element => {

  const rest = splitProps(props, ['logo', 'titleKls', 'logoKls'])[1] as any

  const targetProps = () => {
    const target = props.logo?.target
    return target ? { target } : {}
  }

  return (
    <a
      {...rest}
      href={props.logo?.href || '/'}
      {...targetProps()}
    >
      {props.logo &&
        <LogoImage
          class={props.logoKls}
          logo={props.logo}
        />}
      {
        props.brandName &&
        <b class={props.titleKls}>
          {props.brandName}
        </b>
      }
    </a>
  )
}

export default Logo
