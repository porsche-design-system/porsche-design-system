import { getTagName } from '../../utils';
import { getNamedSlotOrThrow } from '../../utils/validation/getNamedSlotOrThrow';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import type { LinkTileAspectRatio, LinkTileWeight } from '../link-tile/link-tile-utils';
import type { JssDirections } from '../../styles/jss-direction-styles';
import { throwIfPropIsNotOfKind } from '../../utils/validation/throwIfPropIsNotOfKind';

export type LinkTileModelSignatureModel = ModelSignatureModel;
export type LinkTileModelSignatureWeight = LinkTileWeight;
export type LinkTileModelSignatureAspectRatio = LinkTileAspectRatio;
export type LinkTileModelSignatureLinkDirection = JssDirections;

// TODO: unit test
export const throwIfInvalidPropsOfSlottedLinks = (pLinks: HTMLPLinkElement[]): void => {
  pLinks.forEach((link, i) => {
    throwIfPropIsNotOfKind(link, 'variant', i < 1 ? 'primary' : 'secondary');
    throwIfPropIsNotOfKind(link, 'theme', 'dark');
  });
};
export const getSlottedPLinkOrThrow = (host: HTMLElement): HTMLPLinkElement => {
  const primaryLink = getNamedSlotOrThrow(host, 'primary') as HTMLPLinkElement;
  const secondaryLink = getNamedSlotOrThrow(host, 'secondary') as HTMLPLinkElement;

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

  throwIfInvalidPropsOfSlottedLinks([primaryLink, secondaryLink]);

  return primaryLink;
};
