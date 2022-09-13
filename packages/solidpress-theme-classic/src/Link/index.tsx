import { isExternalLink } from '@solidpress/utils'
import { splitProps } from 'solid-js'
import { Dynamic, Show } from 'solid-js/web'
import ExternalLink from '@theme/Icon/ExternalLink'

import type { Props } from '@theme/Link'
import type { JSX } from 'solid-js'


const Link = (props: Props): JSX.Element => {

  const isExternal = () => props.href && isExternalLink(props.href)
  const showIcon = () => isExternal() && !props.noIcon
  const anchorAttrs = () => {
    if (!props.href) {
      return {}
    }

    const external = isExternal()

    return {
      href: props.href,
      ...(external ? {
        target: '_blank',
        rel: 'noreferrer nofollower'
      } : {})
    }
  }

  const [, rest] = splitProps(props, ['href', 'children', 'noIcon'])
  return (
    <Dynamic
      component={props.href ? 'a' : 'span'}
      classList={{
        ...(props.classList || {}),
        ...(props.class ? { [props.class]: true, } : {}),
        active: props.active,
      }}
      {...anchorAttrs()}
      {...rest}
    >
      {props.children}
      <Show when={showIcon()}>
        <ExternalLink class="icon"/>
      </Show>
    </Dynamic>
  )

}

export default Link