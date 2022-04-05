import type { TextColor } from '../../../types';
import { getHTMLElement } from '../../../utils';

export type TagStatusColor =
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

export const hasSlottedAnchorOrButton = (host: HTMLElement): boolean => {
  return !!getHTMLElement(host, 'a,button');
};
