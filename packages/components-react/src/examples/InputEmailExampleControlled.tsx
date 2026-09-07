import {
  type InputEmailInputEvent,
  PInputEmail,
  type PInputEmailProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputEmailControlledExamplePage = () => {
  const [value, setValue] = useState<PInputEmailProps['value']>('');

  const onInput = (e: InputEmailInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputEmail name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
