import { ChangeEvent, FocusEvent } from 'react';

type Props = {
  type?: 'text' | 'number' | 'email' | 'tel' | 'search' | 'url' | 'date' | 'time' | 'month' | 'week' | 'password';
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const DummyTextField = ({ type = 'text', ...rest }: Props): JSX.Element => {
  const props = { ...rest, type };

  return <input {...props} />;
};
