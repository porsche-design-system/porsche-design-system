import { getHTMLElement } from './getHTMLElement';

// TODO: unit test is missing
export const hasSpecificSlottedTag = (host: HTMLElement, tags: string): boolean => {
  const el = getHTMLElement(host, ':first-child');
  return host.children.length === 1 && el?.matches(tags);
};
