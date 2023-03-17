import type { TileAspectRatio, TileWeight } from '../../utils';
import { getPrefixedTagNames, getTagName } from '../../utils';
import { getNamedSlotOrThrow } from '../../utils/validation/getNamedSlotOrThrow';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import type { LinkButtonGroupDirection } from '../../styles/link-button-group-direction-styles';
import type { LinkVariant } from '../../types';

export type LinkTileModelSignatureModel = ModelSignatureModel;
export const LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type LinkTileModelSignatureHeadingTag = (typeof LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS)[number];

export type LinkTileModelSignatureWeight = TileWeight;
export type LinkTileModelSignatureAspectRatio = TileAspectRatio;
export type LinkTileModelSignatureLinkDirection = LinkButtonGroupDirection;

export const setRequiredPropsOfSlottedLinks = (linkElements: [HTMLPLinkElement, HTMLPLinkElement]): void => {
  linkElements.forEach((link) => {
    link.theme = 'dark';
    link.variant = link.slot as LinkVariant;
  });
};

export const throwIfSlotIsNotPLink = (host: HTMLElement, slot: HTMLSlotElement, slotName: LinkVariant): void => {
  const { pLink } = getPrefixedTagNames(host);
  const slotTagName = getTagName(slot);

  if (slotTagName !== pLink) {
    throw new Error(`Named slot "${slotName}" has to be a "${pLink}" but received "${slotTagName}"`);
  }
};

export const getSlottedPLinksOrThrow = (host: HTMLElement): [HTMLPLinkElement, HTMLPLinkElement] => {
  const primaryLink = getNamedSlotOrThrow(host, 'primary');
  const secondaryLink = getNamedSlotOrThrow(host, 'secondary');

  throwIfSlotIsNotPLink(host, primaryLink, 'primary');
  throwIfSlotIsNotPLink(host, secondaryLink, 'secondary');

  return [primaryLink as unknown as HTMLPLinkElement, secondaryLink as unknown as HTMLPLinkElement];
};
