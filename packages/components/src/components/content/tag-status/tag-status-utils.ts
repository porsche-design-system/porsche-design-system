export const TAG_STATUS_COLORS = [
  'default',
  'neutral-contrast-high',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-neutral',
  'background-surface',
] as const;

export type TagStatusColor = typeof TAG_STATUS_COLORS[number];
