export const TOAST_STATES = ['info', 'success'] as const;
export type ToastState = typeof TOAST_STATES[number];
