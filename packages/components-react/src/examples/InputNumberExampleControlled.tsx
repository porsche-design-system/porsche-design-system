import {
  type InputNumberInputEvent,
  PInputNumber,
  type PInputNumberProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputNumberControlledExamplePage = () => {
  const [value, setValue] = useState<PInputNumberProps['value']>('');

  const onInput = (e: InputNumberInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputNumber name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
