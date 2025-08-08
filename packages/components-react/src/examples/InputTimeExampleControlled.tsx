import {
  type InputTimeInputEventDetail,
  PInputTime,
  type PInputTimeProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputTimeControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputTimeProps['value']>('');

  const onInput = (e: CustomEvent<InputTimeInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputTime
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputTimeInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
