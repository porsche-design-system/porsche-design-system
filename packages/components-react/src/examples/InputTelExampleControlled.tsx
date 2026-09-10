import {
  PInputTel,
  type PInputTelInputEvent,
  type PInputTelProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputTelControlledExamplePage = () => {
  const [value, setValue] = useState<PInputTelProps['value']>('');

  const onInput = (e: PInputTelInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputTel name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
