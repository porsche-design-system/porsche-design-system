import { ChangeEvent, FocusEvent } from 'react';
import { extractPropsKeys } from '../form-utils';

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

export const dummyRadioButtonPropsKeys = extractPropsKeys<DummyRadioButtonProps>({
  disabled: null,
  readOnly: null,
  required: null,
  checked: null,
  name: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
});
