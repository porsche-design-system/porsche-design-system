import { ChangeEvent, FocusEvent } from 'react';

export type DummyCheckboxProps = {
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.checked
   */
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const DummyCheckbox = (props: Props): JSX.Element => {
  return <input type="checkbox" {...props} />;
};

// We use a TS `Record` rather than exporting directly a hard-coded array of string
// to ensure that no prop will be missing
const propsAsRecord: Record<keyof DummyCheckboxProps, null> = {
  disabled: null,
  readOnly: null,
  required: null,
  checked: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
}

// Export the prop keys to be able filter props in the form components
export const dummyCheckboxPropsKeys = Object.keys(propsAsRecord);

