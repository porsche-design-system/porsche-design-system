import { POptgroup, PSelect, PSelectOption } from '@porsche-design-system/components-react';
import { useEffect, useState } from 'react';

export const SelectExampleDynamicOptgroupPage = (): JSX.Element => {
  const [value, setValue] = useState('a');
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOptions(Math.random() > 0.5 ? ['a', 'b', 'c'] : ['a', 'b', 'c', 'd']);
      setValue(Math.random() > 0.5 ? 'b' : 'a');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PSelect name="options" label="Some Label" value={value}>
      <POptgroup label="Group 1">
        {options.map((option) => (
          <PSelectOption value={option} key={option}>
            {option}
          </PSelectOption>
        ))}
      </POptgroup>
    </PSelect>
  );
};
