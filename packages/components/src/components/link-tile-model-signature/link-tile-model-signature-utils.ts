import type { TileAspectRatio, TileWeight } from '../../utils';
import type { GroupDirection } from '../../styles/group-direction-styles';
import type { LinkVariant } from '../../types';

// array is redefined instead of using the one from in model-signature
// because it is created via Object.keys(MODEL_SIGNATURES_MANIFEST) would bundle the entire manifest into both chunks
export const LINK_TILE_MODEL_SIGNATURE_MODELS = [
  '718',
  '911',
  'boxster',
  'cayenne',
  'cayman',
  'macan',
  'panamera',
  'taycan',
  'turbo-s',
  'turbo',
] as const;
export type LinkTileModelSignatureModel = (typeof LINK_TILE_MODEL_SIGNATURE_MODELS)[number];

export const LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type LinkTileModelSignatureHeadingTag = (typeof LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS)[number];

export type LinkTileModelSignatureWeight = TileWeight;
export type LinkTileModelSignatureAspectRatio = TileAspectRatio;
export type LinkTileModelSignatureLinkDirection = GroupDirection;

export const setRequiredPropsOfSlottedLinks = (linkElements: [HTMLPLinkElement, HTMLPLinkElement]): void => {
  linkElements.forEach((link) => {
    link.theme = 'dark';
    link.variant = link.slot as LinkVariant;
  });
};

export const getLinkOrSlottedAnchorElement = (linkElement: HTMLPLinkElement): HTMLPLinkElement | HTMLAnchorElement => {
  return linkElement.href ? linkElement : linkElement.querySelector('a');
};
