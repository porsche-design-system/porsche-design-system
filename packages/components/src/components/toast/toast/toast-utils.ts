export const TOAST_STATES = ['neutral', 'success'] as const;
export type ToastState = typeof TOAST_STATES[number];
