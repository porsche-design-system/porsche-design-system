export type SwitchChangeEvent = { checked: boolean };

export const isDisabledOrLoading = (disabled: boolean, loading: boolean): boolean => {
  return disabled || loading;
};
