import {
  type InputWeekInputEventDetail,
  PInputWeek,
  type PInputWeekProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputWeekControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputWeekProps['value']>('');

  const onInput = (e: CustomEvent<InputWeekInputEventDetail>) => {
    setValue((e.target as HTMLElement & PInputWeekProps).value);
  };

  return (
    <>
      <PInputWeek
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputWeekInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
