import { isServer, For } from 'solid-js/web'
import { useWithBase } from '@solidpress/core/lib/client'

import type { JSX } from 'solid-js'
import type { Logo } from '@solidpress/types'

type Props = {
  logo: Logo | undefined
  class?: string
}

const Image = (props: Props): JSX.Element => {
  const withBase = useWithBase()

  const htmlProps = () => {
    if (!props.logo) {
      return {}
    }

    const { src, darkSrc, alt, ...rest } = props.logo
    return rest
  }

  const themes = () => {
    return isServer ? ['light', 'dark'] : ['light']
  }

  const source = () => {
    const { src, darkSrc } = props.logo

    return {
      light: withBase(src),
      dark: withBase(darkSrc || src)
    }
  }

  const alt = () => props.logo.alt || ''

  return (
    <div class={props.class}>
      <For each={themes()}>
        {(theme) => (
          <img
            {...htmlProps()}
            src={source()[theme]}
            alt={alt()}
          />
        )}
      </For>
    </div>

  )
}

export default Image
