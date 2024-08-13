import { FormEvent, useState } from 'react';
import { PText, type PTextareaProps } from '@porsche-design-system/components-react';
import { PTextarea } from '@porsche-design-system/components-react';
import { TextareaInputEventDetail } from '@porsche-design-system/components';

export const TextareaControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PTextareaProps['value']>('');

  const onInput = (e: FormEvent<TextareaInputEventDetail>) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const debugText = `Value: ${value}`;

  return (
    <>
      <PTextarea name="name" value={value} onInput={onInput} />
      <PText>{debugText}</PText>
    </>
  );
};
