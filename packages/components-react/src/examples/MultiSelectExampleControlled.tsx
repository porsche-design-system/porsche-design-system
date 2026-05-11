import {
  type MultiSelectChangeEventDetail,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const MultiSelectExampleControlledPage = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<PMultiSelectProps['value']>([]);

  const onChange = (e: CustomEvent<MultiSelectChangeEventDetail>) => {
    setSelectedValues(e.detail.value);
  };

  const debugText = `Selected values: ${selectedValues!.join(', ') || 'none'}`;

  return (
    <>
      <PMultiSelect name="options" label="Some Label" value={selectedValues} onChange={onChange}>
        <PMultiSelectOption value="a">Option A</PMultiSelectOption>
        <PMultiSelectOption value="b">Option B</PMultiSelectOption>
        <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        <PMultiSelectOption value="d">Option D</PMultiSelectOption>
        <PMultiSelectOption value="e">Option E</PMultiSelectOption>
        <PMultiSelectOption value="f">Option F</PMultiSelectOption>
      </PMultiSelect>

      <PText>{debugText}</PText>
    </>
  );
};
