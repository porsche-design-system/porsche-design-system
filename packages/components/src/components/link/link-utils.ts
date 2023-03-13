import type { LinkButtonIconName } from '../../types';

export const LINK_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type LinkAriaAttribute = typeof LINK_ARIA_ATTRIBUTES[number];

export type LinkIcon = LinkButtonIconName;
