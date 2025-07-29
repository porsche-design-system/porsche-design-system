import {
  type InputEmailInputEventDetail,
  PInputEmail,
  type PInputEmailProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputEmailControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputEmailProps['value']>('');

  const onInput = (e: CustomEvent<InputEmailInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputEmail
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputEmailInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
