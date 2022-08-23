import { ChangeEvent, FocusEvent } from 'react';

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

// We use a TS `Record` rather than exporting directly a hard-coded array of string
// to ensure that no prop will be missing
const propsAsRecord: Record<keyof DummyTextareaProps, null> = {
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
export const dummyTextareaPropsKeys = Object.keys(propsAsRecord);
