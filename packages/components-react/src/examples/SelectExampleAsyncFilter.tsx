import {
  PSelect,
  PSelectOption,
  PInputSearch,
  type InputSearchInputEventDetail,
} from '@porsche-design-system/components-react';
import { useState, useRef, useCallback } from 'react';

export const SelectExampleAsyncFilter = (): JSX.Element => {
  const [options, setOptions] = useState([
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(''); // controlled input

  const debounceTimer = useRef<number | undefined>(undefined);

  const loadOptions = useCallback(async (term: string) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newOptions = Array.from({ length: 3 }, (_, i) => ({
      value: `${term}-${i + 1}`,
      label: `Result ${i + 1} for "${term}"`,
    }));

    setOptions(newOptions);
    setLoading(false);
  }, []);

  const onInput = (e: CustomEvent<InputSearchInputEventDetail>) => {
    const term = (e.target as HTMLInputElement).value;
    setSearchValue(term); // keep the input value controlled

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = window.setTimeout(() => {
      if (term.trim()) {
        loadOptions(term.trim());
      } else {
        setOptions([
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ]);
      }
    }, 400);
  };

  return (
    <PSelect name="async-search-select" label="Async Search" value="a">
      <PInputSearch
        slot="filter"
        name="search"
        value={searchValue}
        loading={loading}
        clear
        indicator
        compact
        autoComplete="off"
        onInput={(e) => onInput(e as CustomEvent<InputSearchInputEventDetail>)}
      />

      {options.map((opt) => (
        <PSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
