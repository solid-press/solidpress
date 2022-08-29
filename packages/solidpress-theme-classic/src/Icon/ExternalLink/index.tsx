import type { Props } from '@theme/Icon/ExternalLink'
import type { JSX } from 'solid-js'


export default function ExternalLink(props: Props): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" />
    </svg>
  )
}