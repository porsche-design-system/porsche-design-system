export const TOAST_STATES = ['info', 'success', 'neutral'] as const; // state neutral as default state is deprecated in v3 (new state: 'info')
export type ToastState = typeof TOAST_STATES[number];

// state 'neutral' is deprecated and needs to be mapped to 'info' should be removed in v4
export const toastStateMap = (state: ToastState): ToastState => {
  const stateMap: { [key in ToastState]: ToastState } = {
    neutral: 'info',
    info: 'info',
    success: 'success',
  };
  return stateMap[state];
};
