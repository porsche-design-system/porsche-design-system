import {
  PInputSearch,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectChangeEventDetail,
  type SelectToggleEventDetail,
} from '@porsche-design-system/components-react';
import { useRef, useState } from 'react';

export const SelectExampleAsyncLoad = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<PSelectProps['value'] | undefined>('a');
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const hasLoadedRef = useRef(false);

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    setSelectedValue(e.detail.value);
  };

  const onToggle = (e: CustomEvent<SelectToggleEventDetail>) => {
    const isOpen = e.detail.open;

    if (isOpen && !hasLoadedRef.current) {
      setLoading(true);

      setTimeout(() => {
        setOptions([
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ]);
        setLoading(false);
        hasLoadedRef.current = true;
      }, 1000);
    }
  };

  return (
    <PSelect
      name="async-select"
      label="Async Load on Open"
      value={selectedValue}
      onChange={onChange}
      onToggle={(e) => onToggle(e as CustomEvent<SelectToggleEventDetail>)}
    >
      <PInputSearch name="some-name" slot="filter" loading={loading} clear indicator compact autoComplete="off" />

      {options.map((opt) => (
        <PSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
