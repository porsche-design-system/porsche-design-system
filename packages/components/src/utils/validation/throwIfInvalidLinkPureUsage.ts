import { getHTMLElement, getTagName } from '../../utils';

export const throwIfInvalidLinkPureUsage = (host: HTMLElement, hrefValue: string): void => {
  // TODO: it's not clear what valid use cases are and what not
  // with slotted subline, slotted is link or not, therefore validation is weak
  const hasAnchor = getHTMLElement(host, 'a');
  if ((!hrefValue && !hasAnchor) || (hrefValue && hasAnchor)) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Please provide a href property or a slotted anchor.`);
  }
};
