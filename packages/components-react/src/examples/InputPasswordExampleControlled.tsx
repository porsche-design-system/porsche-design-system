import {
  type InputPasswordInputEventDetail,
  PInputPassword,
  type PInputPasswordProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputPasswordControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputPasswordProps['value']>('');

  const onInput = (e: CustomEvent<InputPasswordInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputPassword
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputPasswordInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
