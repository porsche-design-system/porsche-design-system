import type { LinkButtonIconName } from '../../types';

export type LinkIcon = LinkButtonIconName;

export const LINK_VARIANTS = ['primary', 'secondary'] as const;
export type LinkVariant = (typeof LINK_VARIANTS)[number];
