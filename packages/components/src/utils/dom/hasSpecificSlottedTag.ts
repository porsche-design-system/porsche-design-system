import { getHTMLElement } from './getHTMLElement';

export const hasSpecificSlottedTag = (host: HTMLElement, tag: string): boolean => {
  const el = getHTMLElement(host, ':first-child');
  return !!(!el?.nextElementSibling && el?.matches(tag));
};
