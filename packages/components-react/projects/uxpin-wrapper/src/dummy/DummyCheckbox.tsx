import { ChangeEvent, FocusEvent } from 'react';
import { extractPropsKeys } from '../form-utils';

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

export const DummyCheckbox = (props: DummyCheckboxProps): JSX.Element => {
  return <input type="checkbox" {...props} />;
};

export const dummyCheckboxPropsKeys = extractPropsKeys<DummyCheckboxProps>({
  disabled: null,
  readOnly: null,
  required: null,
  checked: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
});
