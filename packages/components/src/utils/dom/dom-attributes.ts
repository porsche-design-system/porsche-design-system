export const getAttribute = (el: HTMLElement | Element, attributeName: string): string | null => {
  return el.getAttribute(attributeName);
};

export const setAttribute = (el: HTMLElement, attributeName: string, attributeValue = ''): void => {
  el.setAttribute(attributeName, attributeValue);
};

export const removeAttribute = (el: HTMLElement, attributeName: string): void => {
  el.removeAttribute(attributeName);
};

export const hasAttribute = (el: HTMLElement, attributeName: string): boolean => {
  return el.hasAttribute(attributeName);
};
