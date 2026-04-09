import { PMultiSelect, PMultiSelectOption, POptgroup } from '@porsche-design-system/components-react';
import { useEffect, useState } from 'react';

export const MultiSelectExampleDynamicOptgroupPage = (): JSX.Element => {
  const [value, setValue] = useState<string[]>(['a']);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOptions(Math.random() > 0.5 ? ['a', 'b', 'c'] : ['a', 'b', 'c', 'd']);
      setValue(Math.random() > 0.5 ? ['b'] : ['a']);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PMultiSelect name="options" label="Some Label" value={value}>
      <POptgroup label="Group 1">
        {options.map((option) => (
          <PMultiSelectOption value={option} key={option}>
            Option {option.toUpperCase()}
          </PMultiSelectOption>
        ))}
      </POptgroup>
    </PMultiSelect>
  );
};
