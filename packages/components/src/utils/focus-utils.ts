// TODO: could be extended by audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]) or iframe
export const unpackChildren = (el: HTMLElement | ShadowRoot): HTMLElement[] => {
  return (Array.from(el.children) as HTMLElement[])
    .map((child) => (child.children ? [child].concat(unpackChildren(child)) : child))
    .flat()
    .map((child) => (child.shadowRoot ? [child].concat(unpackChildren(child.shadowRoot)) : child))
    .flat();
};

export const isFocusableElement = (el: HTMLInputElement): boolean => {
  const { nodeName } = el;
  const nodeNames = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'];
  if (
    ((nodeName === 'INPUT' && el.type !== 'hidden') ||
      nodeName === 'TEXTAREA' ||
      nodeName === 'SELECT' ||
      nodeName === 'BUTTON' ||
      (nodeName === 'A' && !!(el as any).href)) &&
    !el.disabled &&
    el.tabIndex >= 0
  ) {
    return true;
  } else return !nodeNames.includes(nodeName) && el.tabIndex >= 0;
};

export const hasFocusableElements = (host: HTMLElement): boolean => unpackChildren(host).some(isFocusableElement);
