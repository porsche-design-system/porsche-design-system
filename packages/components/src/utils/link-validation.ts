import { getHTMLElement } from './dom';
import { getTagName } from './tag-name';

export const throwIfInvalidLinkUsage = (host: HTMLElement, href: string): void => {
  if (!href && !getHTMLElement(host, 'a')) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Please provide a href property or a slotted anchor.`);
  }
};
