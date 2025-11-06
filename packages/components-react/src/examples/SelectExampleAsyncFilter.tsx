import {
  type InputSearchInputEventDetail,
  PInputSearch,
  PSelect,
  PSelectOption,
  SelectChangeEventDetail,
} from '@porsche-design-system/components-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export const SelectExampleAsyncFilter = (): JSX.Element => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debounceTimer = useRef<number | undefined>(undefined);

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    setValue((e.target as HTMLElement & { value: string }).value);
  };

  const loadOptions = useCallback(async (term?: string) => {
    setLoading(true);
    try {
      // If no term is provided, fetch all users
      const url = term
        ? `https://jsonplaceholder.typicode.com/users?username_like=${term}`
        : `https://jsonplaceholder.typicode.com/users`;

      const res = await fetch(url);
      const data: { id: number; name: string; username: string }[] = await res.json();

      const newOptions = data.map((user) => ({
        value: user.id.toString(),
        label: `${user.name} (${user.username})`,
      }));

      setOptions(newOptions);
    } catch (err) {
      console.error('Failed to fetch options', err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load all users on mount
  useEffect(() => {
    loadOptions();
  }, []);

  const onInput = (e: CustomEvent<InputSearchInputEventDetail>) => {
    const term = (e.target as HTMLInputElement).value;
    setSearchValue(term);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = window.setTimeout(() => {
      loadOptions(term.trim() || undefined);
    }, 400);
  };

  return (
    <PSelect name="async-search-select" label="Async Search" value={value} onChange={onChange}>
      <PInputSearch
        slot="filter"
        name="search"
        value={searchValue}
        loading={loading}
        clear
        indicator
        compact
        autoComplete="off"
        onInput={onInput}
        onBlur={(e: any) => e.stopPropagation()}
        onChange={(e: any) => e.stopPropagation()}
      />

      {options.map((opt) => (
        <PSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
