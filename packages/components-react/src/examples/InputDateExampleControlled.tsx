import {
  type InputDateInputEventDetail,
  PInputDate,
  type PInputDateProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputDateControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputDateProps['value']>('');

  const onInput = (e: CustomEvent<InputDateInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputDate
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputDateInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
