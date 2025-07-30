import {
  type InputTelInputEventDetail,
  PInputTel,
  type PInputTelProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputTelControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputTelProps['value']>('');

  const onInput = (e: CustomEvent<InputTelInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputTel
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputTelInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
