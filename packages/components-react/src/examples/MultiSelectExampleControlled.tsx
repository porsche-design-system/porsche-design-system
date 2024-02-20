import { useState } from 'react';
import {
  type MultiSelectUpdateEventDetail,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
} from '@porsche-design-system/components-react';

export const MultiSelectControlledExamplePage = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<PMultiSelectProps['value']>([]);

  const onUpdate = (e: CustomEvent<MultiSelectUpdateEventDetail>) => {
    setSelectedValues(e.detail.value);
  };

  const debugText = `Selected values: ${selectedValues!.join(', ') || 'none'}`;

  return (
    <>
      <PMultiSelect name="options" label="Some Label" value={selectedValues} onUpdate={onUpdate}>
        <PMultiSelectOption value="a">Option A</PMultiSelectOption>
        <PMultiSelectOption value="b">Option B</PMultiSelectOption>
        <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        <PMultiSelectOption value="d">Option D</PMultiSelectOption>
        <PMultiSelectOption value="e">Option E</PMultiSelectOption>
        <PMultiSelectOption value="f">Option F</PMultiSelectOption>
      </PMultiSelect>

      <p>{debugText}</p>
    </>
  );
};
