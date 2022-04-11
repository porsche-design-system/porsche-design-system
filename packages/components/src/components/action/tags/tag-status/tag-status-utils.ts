import { TAG_DISMISSIBLE_COLORS } from '../tag-dismissible/tag-dismissible-utils';

export const TAG_STATUS_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'neutral-contrast-high',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-neutral',
] as const;

export type TagStatusColor = typeof TAG_STATUS_COLORS[number];
