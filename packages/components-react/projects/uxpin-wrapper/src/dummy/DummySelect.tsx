import { ChangeEvent, FocusEvent } from 'react';
import { extractPropsKeys } from '../form-utils';

export type DummySelectProps = {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.value
   */
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  options?: string[];
};

export const DummySelect = ({
  options = Array.from(Array(3)).map((_, i) => `Option ${i + 1}`),
  ...props
}: DummySelectProps): JSX.Element => {
  return (
    <select {...props}>
      {options.map((item, i) => (
        <option key={i}>{item}</option>
      ))}
    </select>
  );
};

export const dummySelectPropsKeys = extractPropsKeys<DummySelectProps>({
  disabled: null,
  placeholder: null,
  readOnly: null,
  required: null,
  value: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  options: null,
});
