import { getPrefixedTagNames, getTagName } from '../../utils';
import { getNamedSlotOrThrow } from '../../utils/validation/getNamedSlotOrThrow';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import type { LinkTileAspectRatio, LinkTileWeightWithoutDeprecated } from '../link-tile/link-tile-utils';
import type { JssDirections } from '../../styles/jss-direction-styles';
import type { LinkVariant } from '../../types';

export type LinkTileModelSignatureModel = ModelSignatureModel;
export const LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type LinkTileModelSignatureHeadingTag = (typeof LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS)[number];

export type LinkTileModelSignatureWeight = LinkTileWeightWithoutDeprecated;
export type LinkTileModelSignatureAspectRatio = LinkTileAspectRatio;
export type LinkTileModelSignatureLinkDirection = JssDirections;

// TODO: unit test
export const setRequiredPropsOfSlottedLinks = (links: HTMLPLinkElement[]): void => {
  links.forEach((link) => {
    link.theme = 'dark';
    link.variant = link.slot as LinkVariant;
  });
};

export const throwIfSlotIsNotPLink = (host: HTMLElement, slot: HTMLElement, slotName: LinkVariant): void => {
  const { pLink } = getPrefixedTagNames(host);
  const slotTagName = getTagName(slot);

  if (slotTagName !== pLink) {
    throw new Error(`Named slot "${slotName}" has to be a "${pLink}" but received "${slotTagName}"`);
  }
};

export const getSlottedPLinksOrThrow = (host: HTMLElement): HTMLPLinkElement[] => {
  const primaryLink = getNamedSlotOrThrow(host, 'primary') as HTMLPLinkElement;
  const secondaryLink = getNamedSlotOrThrow(host, 'secondary') as HTMLPLinkElement;

  throwIfSlotIsNotPLink(host, primaryLink, 'primary');
  throwIfSlotIsNotPLink(host, secondaryLink, 'secondary');

  return [primaryLink, secondaryLink];
};
