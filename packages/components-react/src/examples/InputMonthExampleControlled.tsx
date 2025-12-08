import {
  type InputMonthInputEventDetail,
  PInputMonth,
  type PInputMonthProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputMonthControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputMonthProps['value']>('');

  const onInput = (e: CustomEvent<InputMonthInputEventDetail>) => {
    setValue((e.target as HTMLElement & { value: PInputMonthProps['value'] }).value);
  };

  return (
    <>
      <PInputMonth
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputMonthInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
