import {
  PInputMonth,
  type PInputMonthInputEvent,
  type PInputMonthProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputMonthControlledExamplePage = () => {
  const [value, setValue] = useState<PInputMonthProps['value']>('');

  const onInput = (e: PInputMonthInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputMonth name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
