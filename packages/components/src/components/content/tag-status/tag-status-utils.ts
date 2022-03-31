import type { TextColor } from '../../../types';
import { getHTMLElement } from '../../../utils';

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

export const hasSlottedAnchorOrButton = (host: HTMLElement) => {
  return !!getHTMLElement(host, 'a,button');
};
