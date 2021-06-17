import { ChangeEvent, FocusEvent, InputHTMLAttributes, useState } from 'react';

type Props = {
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  checked?: boolean;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const DummyRadioButton = ({ checked, onChange, ...rest }: Props): JSX.Element => {
  const [checkedState, setCheckedState] = useState(checked);

  const props: InputHTMLAttributes<HTMLInputElement> = {
    ...rest,
    checked: checkedState,
    onChange: (e) => {
      const { checked } = e.target;
      setCheckedState(checked);
      onChange(e);
    },
  };

  return <input type="radio" {...props} />;
};
