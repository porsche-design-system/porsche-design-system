import {
  type InputSearchInputEvent,
  PInputSearch,
  type PInputSearchProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputSearchControlledExamplePage = () => {
  const [value, setValue] = useState<PInputSearchProps['value']>('');

  const onInput = (e: InputSearchInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputSearch name="some-name" label="Some Label" value={value} indicator={true} clear={true} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
