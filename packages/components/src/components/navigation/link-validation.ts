import { getHTMLElement, getTagName } from '../../utils';

export const throwIfInvalidLinkUsage = (host: HTMLElement, href: string): void => {
  const hasAnchor = getHTMLElement(host, 'a');
  if ((!href && !hasAnchor) || (href && hasAnchor)) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Please provide a href property or a slotted anchor.`);
  }
};
