import { getHTMLElement } from './getHTMLElement';

export const hasSpecificTag = (host: HTMLElement, tag: string): boolean => {
  const el = getHTMLElement(host, ':only-child');
  return !!(el?.matches(tag));
};
