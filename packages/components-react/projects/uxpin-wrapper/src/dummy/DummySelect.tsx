import { ChangeEvent, FocusEvent, SelectHTMLAttributes, useState } from 'react';

type Props = {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  options?: string[];
};

export const DummySelect = ({
  value,
  onChange,
  options = Array.from(Array(3)).map((_, i) => `Option ${i + 1}`),
  ...rest
}: Props): JSX.Element => {
  const [valueState, setValueState] = useState(value);

  const props: SelectHTMLAttributes<HTMLSelectElement> = {
    ...rest,
    value: valueState,
    onChange: (e) => {
      const { value } = e.target;
      setValueState(value);
      onChange(e);
    },
  };

  return (
    <select {...props}>
      {options.map((item, i) => (
        <option key={i}>{item}</option>
      ))}
    </select>
  );
};
