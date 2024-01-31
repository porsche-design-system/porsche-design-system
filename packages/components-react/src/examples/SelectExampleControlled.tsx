import { useState } from 'react';
import {
  type SelectUpdateEventDetail,
  PSelect,
  PSelectOption,
  type PSelectProps,
} from '@porsche-design-system/components-react';

export const SelectControlledExamplePage = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<PSelectProps['value']>('a');

  const handleUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    setSelectedValue(e.detail.value);
  };

  const debugText = `Selected values: ${selectedValue}`;

  return (
    <>
      <PSelect name="options" label="Some Label" value={selectedValue} onUpdate={handleUpdate}>
        <PSelectOption value="a">Option A</PSelectOption>
        <PSelectOption value="b">Option B</PSelectOption>
        <PSelectOption value="c">Option C</PSelectOption>
        <PSelectOption value="d">Option D</PSelectOption>
        <PSelectOption value="e">Option E</PSelectOption>
        <PSelectOption value="f">Option F</PSelectOption>
      </PSelect>

      <p>{debugText}</p>
    </>
  );
};
