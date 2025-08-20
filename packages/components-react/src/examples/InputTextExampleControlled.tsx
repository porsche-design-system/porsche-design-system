import {
  type InputTextInputEventDetail,
  PInputText,
  type PInputTextProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputTextControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputTextProps['value']>('');

  const onInput = (e: CustomEvent<InputTextInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputText
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputTextInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
