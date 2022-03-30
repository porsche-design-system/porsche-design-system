import type { TextColor } from '../../../types';

export type TagColor =
  | Extract<
      TextColor,
      | 'default'
      | 'neutral-contrast-high'
      | 'notification-success'
      | 'notification-warning'
      | 'notification-error'
      | 'notification-neutral'
    >
  | 'background-surface';
