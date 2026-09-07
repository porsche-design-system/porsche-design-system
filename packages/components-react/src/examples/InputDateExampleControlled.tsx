import {
  type InputDateInputEvent,
  PInputDate,
  type PInputDateProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputDateControlledExamplePage = () => {
  const [value, setValue] = useState<PInputDateProps['value']>('');

  const onInput = (e: InputDateInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputDate name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
