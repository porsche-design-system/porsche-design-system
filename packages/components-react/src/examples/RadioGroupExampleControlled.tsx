import {
  PRadioGroup,
  PRadioGroupOption,
  type PRadioGroupProps,
  PText,
  type RadioGroupChangeEventDetail,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const RadioGroupExampleControlledPage = () => {
  const [selectedValue, setSelectedValue] = useState<PRadioGroupProps['value']>('a');

  const onChange = (e: CustomEvent<RadioGroupChangeEventDetail> | FormEvent<{}>) => {
    const input = e.target as HTMLElement & { value: string };
    setSelectedValue(input.value);
  };

  const debugText = `Selected values: ${selectedValue}`;

  return (
    <>
      <PRadioGroup name="options" label="Some Label" value={selectedValue} onChange={onChange}>
        <PRadioGroupOption label="Option A" value="a"></PRadioGroupOption>
        <PRadioGroupOption label="Option B" value="b"></PRadioGroupOption>
        <PRadioGroupOption label="Option C" value="c"></PRadioGroupOption>
        <PRadioGroupOption label="Option D" value="d"></PRadioGroupOption>
        <PRadioGroupOption label="Option E" value="e"></PRadioGroupOption>
        <PRadioGroupOption label="Option F" value="f"></PRadioGroupOption>
      </PRadioGroup>

      <PText>{debugText}</PText>
    </>
  );
};
