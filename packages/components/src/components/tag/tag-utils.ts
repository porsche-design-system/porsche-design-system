import type { IconName } from '../../types';

export type TagIcon = IconName | 'none';

export const TAG_VARIANTS = ['primary', 'secondary', 'info', 'warning', 'success', 'error'] as const;
export type TagVariant = (typeof TAG_VARIANTS)[number];
