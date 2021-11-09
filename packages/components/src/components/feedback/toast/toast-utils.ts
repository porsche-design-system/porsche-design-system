import { AriaAttributes } from 'react';
import type { IconName } from '../../../types';

export const TOAST_STATES = ['neutral', 'success'] as const;
export type ToastState = typeof TOAST_STATES[number];

export type ToastOffset = { bottom: number };
export type ToastOffsetValue = ToastOffset | string;

export const getIconName = (state: ToastState): IconName => {
  const stateToIconMap: { [key in ToastState]: IconName } = {
    neutral: 'information',
    success: 'success',
  };
  return stateToIconMap[state];
};

export const getContentAriaAttributes = (descriptionId: string): AriaAttributes & { role: string } => {
  return {
    role: 'status',
    'aria-live': 'polite',
    'aria-describedby': descriptionId,
  };
};

export const parseJSON = (prop: ToastOffsetValue): ToastOffset => {
  if (typeof prop === 'string') {
    // prop is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "false"
    return JSON.parse(
      prop
        .replace(/'/g, '"') // convert single quotes to double quotes
        .replace(/[\s"]?([\w]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls);
    );
  } else {
    // prop is object, e.g. { base: 'block', l: 'inline' } or number, e.g. 123 or boolean, e.g. true
    return prop;
  }
};
