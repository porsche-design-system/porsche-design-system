import { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';

export type DummyTextFieldProps = {
  type?: 'text' | 'number' | 'email' | 'tel' | 'search' | 'url' | 'date' | 'time' | 'month' | 'week' | 'password';
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.value
   */
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const DummyTextField = ({ type = 'text', ...rest }: Props): JSX.Element => {
  const props: InputHTMLAttributes<HTMLInputElement> = {
    ...rest,
    type,
  };

  return <input {...props} />;
};

// We use a TS `Record` rather than exporting directly a hard-coded array of string
// to ensure that no prop will be missing
const propsAsRecord: Record<keyof DummyTextFieldProps, null> = {
  type: null,
  disabled: null,
  placeholder: null,
  readOnly: null,
  required: null,
  value: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
}

// Export the prop keys to be able filter props in the form components
export const dummyTextFieldPropsKeys = Object.keys(propsAsRecord);
