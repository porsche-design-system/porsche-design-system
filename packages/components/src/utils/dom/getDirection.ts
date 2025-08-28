export function getDirection(host: HTMLElement, target: HTMLElement | Element): 'ltr' | 'rtl' {
  const dirAttr = target.getAttribute('dir');
  const computedDir = getComputedStyle(host).direction;
  return dirAttr === 'rtl' || computedDir === 'rtl' ? 'rtl' : 'ltr';
}
