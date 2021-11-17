export const TOAST_STATES = ['neutral', 'success'] as const;
export type ToastState = typeof TOAST_STATES[number];

export type ToastOffset = { bottom: number };
export type ToastOffsetValue = ToastOffset | string;

export const defaultToastOffset = { bottom: 64 };
