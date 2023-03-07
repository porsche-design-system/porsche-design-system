import type { LinkTarget } from '../../utils/link-button/link-target';
import type { SelectedAriaAttributes } from '../../types';
import type { LinkAriaAttribute } from '../link/link-utils';

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
