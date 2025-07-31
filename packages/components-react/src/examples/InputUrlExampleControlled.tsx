import {
  type InputUrlInputEventDetail,
  PInputUrl,
  type PInputUrlProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputUrlControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputUrlProps['value']>('');

  const onInput = (e: CustomEvent<InputUrlInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputUrl
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputUrlInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
