import {
  PInputWeek,
  type PInputWeekInputEvent,
  type PInputWeekProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputWeekControlledExamplePage = () => {
  const [value, setValue] = useState<PInputWeekProps['value']>('');

  const onInput = (e: PInputWeekInputEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PInputWeek name="some-name" label="Some Label" value={value} onInput={onInput} />
      <PText>Value: {value}</PText>
    </>
  );
};
