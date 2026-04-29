import { PButton, POptgroup, PSelect, PSelectOption, type PSelectProps } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const SelectExampleDynamicOptgroupPage = (): JSX.Element => {
  const [value, setValue] = useState<PSelectProps['value']>();
  const [options, setOptions] = useState<string[]>([]);

  const handleOnClick = () => {
    const nextValue = value === 'b' ? 'a' : 'b';
    const nextOptions = options.length === 3 ? ['a', 'b', 'c', 'd'] : ['a', 'b', 'c'];
    setValue(nextValue);
    setOptions(nextOptions);
  };

  return (
    <>
      <PSelect name="options" label="Some Label" value={value}>
        <POptgroup label="Group 1">
          {options.map((option) => (
            <PSelectOption value={option} key={option}>
              Option {option.toUpperCase()}
            </PSelectOption>
          ))}
        </POptgroup>
      </PSelect>

      <div className="flex gap-fluid-sm">
        <PButton onClick={handleOnClick}>Add & change value</PButton>
        <PButton type="reset">Reset</PButton>
      </div>
    </>
  );
};
