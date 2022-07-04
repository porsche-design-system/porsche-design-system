import { getHTMLElement, getTagName } from '../../utils';

export const throwIfInvalidLinkUsage = (host: HTMLElement, href: string): void => {
  // TODO: needs to be direct and only child
  const hasAnchor = getHTMLElement(host, 'a');
  if ((!href && !hasAnchor) || (href && hasAnchor)) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Please provide a href property or a slotted anchor.`);
  }
};
