import type { LinkTarget } from '../../utils/link-button/link-target';
import type { SelectedAriaAttributes } from '../../types';
import type { LinkAriaAttribute } from '../link/link-utils';
import type { LinkButtonTileAspectRatio } from '../../styles/link-button-tile-styles';

export const LINK_TILE_MODEL_ASPECT_RATIO = ['4:3', '3:4', '9:16'] as const;
export type LinkTileModelAspectRatio = Extract<LinkButtonTileAspectRatio, '4:3' | '3:4' | '9:16'>;

export type LinkTileModelLinkProps =
  | string
  | {
      label: string;
      href: string;
      target?: LinkTarget;
      download?: string;
      rel?: string;
      aria?: SelectedAriaAttributes<LinkAriaAttribute>;
    };
