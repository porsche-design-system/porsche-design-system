import type { IconName } from '../../types';
import { TAG_DISMISSIBLE_COLORS } from '../tag-dismissible/tag-dismissible-utils';

export type TagIcon = IconName;

export const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'background-frosted',
  'primary',
  'notification-info-soft',
  'notification-warning-soft',
  'notification-success-soft',
  'notification-error-soft',
] as const;
export type TagColor = (typeof TAG_COLORS)[number];
