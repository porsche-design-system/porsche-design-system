import { ChangeEvent, FocusEvent } from 'react';

export type DummyRadioButtonProps = {
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.checked
   */
  checked?: boolean;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const DummyRadioButton = (props: Props): JSX.Element => {
  return <input type="radio" {...props} />;
};

// We use a TS `Record` rather than exporting directly a hard-coded array of string
// to ensure that no prop will be missing
const propsAsRecord: Record<keyof DummyRadioButtonProps, null> = {
  disabled: null,
  readOnly: null,
  required: null,
  checked: null,
  name: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
}

// Export the prop keys to be able filter props in the form components
export const dummyRadioButtonPropsKeys = Object.keys(propsAsRecord);
