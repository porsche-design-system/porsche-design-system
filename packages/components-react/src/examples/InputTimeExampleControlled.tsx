import {
  type InputTimeInputEvent,
  PInputTime,
  type PInputTimeProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputTimeControlledExamplePage = () => {
  const [value, setValue] = useState<PInputTimeProps['value']>('');

  const onInput = (e: InputTimeInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputTime name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
