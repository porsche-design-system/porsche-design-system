import {
  type InputPasswordInputEvent,
  PInputPassword,
  type PInputPasswordProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputPasswordControlledExamplePage = () => {
  const [value, setValue] = useState<PInputPasswordProps['value']>('');

  const onInput = (e: InputPasswordInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputPassword name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
