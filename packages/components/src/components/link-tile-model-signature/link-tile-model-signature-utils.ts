import { getTagName } from '../../utils';
import { getNamedSlotOrThrow } from '../../utils/validation/getNamedSlotOrThrow';

// TODO: unit test
export const getSlottedPLinksOrThrow = (host: HTMLElement): HTMLPLinkElement[] => {
  const primaryLink = getNamedSlotOrThrow(host, 'primary');
  const secondaryLink = getNamedSlotOrThrow(host, 'secondary');

  const primaryLinkTagName = getTagName(primaryLink);
  const secondaryLinkTagName = getTagName(secondaryLink);
  const getErrorMessage = (slotName: 'primary' | 'secondary', tagName: string): string =>
    `Named slot '${slotName}' has to be a "p-link" but received "${tagName}"`;

  if (primaryLinkTagName !== 'p-link') {
    throw new Error(getErrorMessage('primary', primaryLinkTagName));
  }
  if (secondaryLinkTagName !== 'p-link') {
    throw new Error(getErrorMessage('secondary', secondaryLinkTagName));
  }

  return [primaryLink as HTMLPLinkElement, secondaryLink as HTMLPLinkElement];
};
