import type { LinkTileAspectRatio } from '../link-tile/link-tile-utils';
import type { LinkTarget } from '../../utils/link-button/link-target';
import type { SelectedAriaAttributes } from '../../types';
import type { LinkAriaAttribute } from '../link/link-utils';

export type LinkTileModelAspectRatio = Extract<LinkTileAspectRatio, '4:3' | '3:4' | '9:16'>;

export type LinkTileModelLinkProps = {
  href: string;
  target?: LinkTarget;
  download?: string;
  rel?: string;
  aria?: SelectedAriaAttributes<LinkAriaAttribute>;
};
