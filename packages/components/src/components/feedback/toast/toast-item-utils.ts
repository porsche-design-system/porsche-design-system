import type { IconName } from '../../../types';

import { AriaAttributes } from 'react';

export const TOAST_ITEM_STATES = ['neutral', 'success'] as const;
export type ToastItemState = typeof TOAST_ITEM_STATES[number];

export const getIconName = (state: ToastItemState): IconName => {
  const stateToIconMap: { [key in ToastItemState]: IconName } = {
    neutral: 'information',
    success: 'success',
  };
  return stateToIconMap[state];
};

export const getContentAriaAttributes = (labelId: string, descriptionId: string): AriaAttributes & { role: string } => {
  return {
    role: 'status',
    'aria-live': 'polite',
    'aria-labelledby': labelId,
    'aria-describedby': descriptionId,
  };
};
