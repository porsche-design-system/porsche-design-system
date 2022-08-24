import { ChangeEvent, FocusEvent } from 'react';
import { extractPropsKeys } from '../form-utils';

export type DummyTextareaProps = {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.value
   */
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
};

export const DummyTextarea = (props: Props): JSX.Element => {
  return <textarea {...props} />;
};

export const dummyTextareaPropsKeys = extractPropsKeys<DummyTextareaProps>({
  disabled: null,
  placeholder: null,
  readOnly: null,
  required: null,
  value: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
});
