import { getDirectChildHTMLElement } from './getDirectChildHTMLElement'

export const hasSpecificDirectChildTag = (host: HTMLElement, tag: string): boolean => {
  const el = getDirectChildHTMLElement(host, 'only-child');
  return !!(el?.matches(tag));
};
