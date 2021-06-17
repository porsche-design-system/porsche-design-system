import { ChangeEvent, FocusEvent } from 'react';

type Props = {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
};

export const DummyTextarea = ({ value = 'DummyInput', ...rest }: Props): JSX.Element => {
  const props = { ...rest, value };

  return <textarea {...props} />;
};
