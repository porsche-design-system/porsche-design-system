export const labelId = 'label';
export const descriptionId = 'description';

export type BaseLabelProps = {
  host: HTMLElement;
  label: string;
  description?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};
