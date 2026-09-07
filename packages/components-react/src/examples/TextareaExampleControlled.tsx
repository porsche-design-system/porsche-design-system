import {
  PText,
  PTextarea,
  type PTextareaProps,
  type TextareaInputEvent,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const TextareaExampleControlledPage = () => {
  const [value, setValue] = useState<PTextareaProps['value']>('');

  const onInput = (e: TextareaInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PTextarea name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
