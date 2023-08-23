import { useState } from 'react';
import {
  type MultiSelectUpdateEvent,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
} from '@porsche-design-system/components-react';

export const MultiSelectControlledExamplePage = () => {
  const [selectedValues, setSelectedValues] = useState<PMultiSelectProps['value']>([]);

  const handleUpdate = (e: CustomEvent<MultiSelectUpdateEvent>) => {
    setSelectedValues(e.detail.value);
  };

  const debugText = selectedValues && `Selected values: ${selectedValues.join(', ') || 'none'}`;

  return (
    <>
      <PMultiSelect name="options" label="Some Label" value={selectedValues} onUpdate={handleUpdate}>
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
