export const TOAST_STATES_DEPRECATED = ['neutral'] as const; // state neutral as default state is deprecated in v3 (new state: 'info')
export const TOAST_STATES = ['info', 'success', ...TOAST_STATES_DEPRECATED] as const;
export type ToastState = typeof TOAST_STATES[number];
