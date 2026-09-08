import type { IconName } from '../../types';

export type TagIcon = IconName | 'none';

export const TAG_VARIANTS = [
  'primary',
  'secondary',
  'info',
  'info-frosted',
  'warning',
  'warning-frosted',
  'success',
  'success-frosted',
  'error',
  'error-frosted',
] as const;
export type TagVariant = (typeof TAG_VARIANTS)[number];
