export type SwitchChangeEvent = { checked: boolean };

export const isDisabled = (disabled: boolean, loading: boolean): boolean => {
  return disabled || loading;
};
