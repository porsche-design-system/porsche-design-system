export const TOAST_STATES = ['info', 'success', 'warning', 'error'] as const;
export type ToastState = (typeof TOAST_STATES)[number];
