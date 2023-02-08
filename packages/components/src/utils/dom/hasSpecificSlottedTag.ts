import { getHTMLElement } from './getHTMLElement';

export const hasSpecificSlottedTag = (host: HTMLElement, tags: string): boolean => {
  // TODO: needs to be direct and only child
  const el = getHTMLElement(host, ':first-child');
  return el?.matches(tags);
};
