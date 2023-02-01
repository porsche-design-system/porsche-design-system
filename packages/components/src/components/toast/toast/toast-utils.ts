export const TOAST_STATES = ['info', 'success', 'neutral'] as const; // state neutral as default state is deprecated in v3 (new state: 'info')
export type ToastState = typeof TOAST_STATES[number];
