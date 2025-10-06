import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  PText,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const SelectExampleControlledPage = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<PSelectProps['value']>('a');

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    setSelectedValue(e.detail.value);
  };

  const debugText = `Selected values: ${selectedValue}`;

  return (
    <>
      <PSelect name="options" label="Some Label" value={selectedValue} onChange={onChange}>
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
