import { useState } from 'react';
import { PText, type PTextareaProps } from '@porsche-design-system/components-react';
import { PTextarea } from '@porsche-design-system/components-react';
import { TextareaInputEventDetail } from '@porsche-design-system/components';

export const TextareaControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PTextareaProps['value']>('');

  const onInput = (e: CustomEvent<TextareaInputEventDetail>) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const debugText = `Value: ${value}`;

  return (
    <>
      <PTextarea name="some-name" value={value} onInput={(e) => onInput(e as CustomEvent<TextareaInputEventDetail>)} />
      <PText>{debugText}</PText>
    </>
  );
};
