import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  PText,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const SelectExampleControlledPage = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<PSelectProps['value']>('a');

  const onUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    setSelectedValue(e.detail.value);
  };

  const debugText = `Selected values: ${selectedValue}`;

  return (
    <>
      <PSelect name="options" label="Some Label" value={selectedValue} onUpdate={onUpdate}>
        <PSelectOption value="a">Option A</PSelectOption>
        <PSelectOption value="b">Option B</PSelectOption>
        <PSelectOption value="c">Option C</PSelectOption>
        <PSelectOption value="d">Option D</PSelectOption>
        <PSelectOption value="e">Option E</PSelectOption>
        <PSelectOption value="f">Option F</PSelectOption>
      </PSelect>

      <PText>{debugText}</PText>
    </>
  );
};
