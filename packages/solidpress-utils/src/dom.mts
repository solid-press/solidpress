export function scrollTo(el: HTMLElement, hash: string, smooth = false): void {
  // let target: Element | null = null

  // try {
  //   target = el.classList.contains('header-anchor')
  //     ? el
  //     : document.querySelector(decodeURIComponent(hash))
  // } catch (e) {
  //   console.warn(e)
  // }

  // if (target) {
  //   let offset = siteDataRef.value.scrollOffset
  //   if (typeof offset === 'string') {
  //     offset =
  //       document.querySelector(offset)!.getBoundingClientRect().bottom + 24
  //   }
  //   const targetPadding = parseInt(
  //     window.getComputedStyle(target as HTMLElement).paddingTop,
  //     10
  //   )
  //   const targetTop =
  //     window.scrollY +
  //     (target as HTMLElement).getBoundingClientRect().top -
  //     offset +
  //     targetPadding
  //   // only smooth scroll if distance is smaller than screen height.
  //   if (!smooth || Math.abs(targetTop - window.scrollY) > window.innerHeight) {
  //     window.scrollTo(0, targetTop)
  //   } else {
  //     window.scrollTo({
  //       left: 0,
  //       top: targetTop,
  //       behavior: 'smooth'
  //     })
  //   }
  // }
  console.log(el, hash, smooth);
}
