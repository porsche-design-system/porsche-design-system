import { ChangeEvent, FocusEvent, InputHTMLAttributes, useState } from 'react';

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

export const DummyTextField = ({ type = 'text', value, onChange, ...rest }: Props): JSX.Element => {
  const [valueState, setValueState] = useState(value);

  const props: InputHTMLAttributes<HTMLInputElement> = {
    ...rest,
    type,
    value: valueState,
    onChange: (e) => {
      const { value } = e.target;
      setValueState(value);
      onChange(e);
    },
  };

  return <input {...props} />;
};
