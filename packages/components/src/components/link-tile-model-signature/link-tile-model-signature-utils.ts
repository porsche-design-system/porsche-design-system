import type { SelectedAriaAttributes, LinkTarget } from '../../types';
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
