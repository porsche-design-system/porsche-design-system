import type { TileAspectRatio, TileWeight } from '../../utils';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import type { GroupDirection } from '../../styles/group-direction-styles';
import type { LinkVariant } from '../../types';

export type LinkTileModelSignatureModel = ModelSignatureModel;
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
