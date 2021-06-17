import { ChangeEvent, FocusEvent, TextareaHTMLAttributes, useState } from 'react';

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

export const DummyTextarea = ({ value, onChange, ...rest }: Props): JSX.Element => {
  const [valueState, setValueState] = useState(value);

  const props: TextareaHTMLAttributes<HTMLTextAreaElement> = {
    ...rest,
    value: valueState,
    onChange: (e) => {
      const { value } = e.target;
      setValueState(value);
      onChange(e);
    },
  };

  return <textarea {...props} />;
};
