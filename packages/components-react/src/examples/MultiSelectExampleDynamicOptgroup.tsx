import { PButton, PMultiSelect, PMultiSelectOption, POptgroup } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const MultiSelectExampleDynamicOptgroupPage = () => {
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const handleOnClick = () => {
    const nextValue = value?.includes('b') ? ['a'] : ['b'];
    const nextOptions = options.length === 3 ? ['a', 'b', 'c', 'd'] : ['a', 'b', 'c'];
    setValue(nextValue);
    setOptions(nextOptions);
  };

  return (
    <>
      <PMultiSelect name="options" label="Some Label" value={value}>
        <POptgroup label="Group 1">
          {options.map((option) => (
            <PMultiSelectOption value={option} key={option}>
              Option {option.toUpperCase()}
            </PMultiSelectOption>
          ))}
        </POptgroup>
      </PMultiSelect>

      <div className="flex gap-fluid-sm">
        <PButton onClick={handleOnClick}>Add & change value</PButton>
        <PButton type="reset">Reset</PButton>
      </div>
    </>
  );
};
