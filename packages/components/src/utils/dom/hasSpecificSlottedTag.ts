import { getHTMLElement } from './getHTMLElement';

export const hasSpecificSlottedTag = (host: HTMLElement, tags: string): boolean => {
  const el = getHTMLElement(host, ':first-child');
  return !!(!el?.nextElementSibling && el?.matches(tags));
};
