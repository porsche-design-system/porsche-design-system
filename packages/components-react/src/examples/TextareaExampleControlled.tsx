import { useState } from 'react';
import {
  PTextarea,
  PText,
  type PTextareaProps,
  type TextareaInputEventDetail,
} from '@porsche-design-system/components-react';

export const TextareaControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PTextareaProps['value']>('');

  const onInput = (e: CustomEvent<TextareaInputEventDetail>) => {
    setValue((e.detail.target as HTMLTextAreaElement).value);
  };

  return (
    <>
      <PTextarea name="some-name" value={value} onInput={(e) => onInput(e as CustomEvent<TextareaInputEventDetail>)} />
      <PText>Value: {value}</PText>
    </>
  );
};
