import {
  PInputUrl,
  type PInputUrlInputEvent,
  type PInputUrlProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputUrlControlledExamplePage = () => {
  const [value, setValue] = useState<PInputUrlProps['value']>('');

  const onInput = (e: PInputUrlInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputUrl name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
