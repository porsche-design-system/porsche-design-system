import {
  PInputPassword,
  type PInputPasswordInputEvent,
  type PInputPasswordProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputPasswordControlledExamplePage = () => {
  const [value, setValue] = useState<PInputPasswordProps['value']>('');

  const onInput = (e: PInputPasswordInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputPassword name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
