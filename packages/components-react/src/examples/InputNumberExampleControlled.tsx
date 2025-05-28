import {
  type InputNumberInputEventDetail,
  PInputNumber,
  type PInputNumberProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputNumberControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputNumberProps['value']>('');

  const onInput = (e: CustomEvent<InputNumberInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputNumber
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputNumberInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
