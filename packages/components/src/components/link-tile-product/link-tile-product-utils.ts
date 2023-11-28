import { LinkTarget } from '../../utils/link-button/link-target';
import { LinkAriaAttribute } from '../../utils';

export type LinkTileProductTarget = LinkTarget;
export type LinkTileProductAriaAttribute = LinkAriaAttribute;
export type LinkTileProductUpdateEvent = {
  liked: boolean;
};

export const tagsSlotName = 'tags';
