import {
  type InputSearchInputEventDetail,
  PIcon,
  PInputSearch,
  PSelect,
  PSelectOption,
  SelectChangeEventDetail,
  SelectToggleEventDetail,
} from '@porsche-design-system/components-react';
import { useCallback, useRef, useState } from 'react';

export const SelectExampleAsyncFilter = (): JSX.Element => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState('');
  const debounceTimer = useRef<number | undefined>(undefined);

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    setValue((e.target as HTMLElement & { value: string }).value);
  };

  const loadOptions = useCallback(async (term?: string, isInitial?: boolean) => {
    if (isInitial) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }
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
      setError(null);
      if (isInitial) {
        setHasLoadedOnce(true);
      }
    } catch (err) {
      console.error('Failed to fetch options', err);
      setOptions([]);
      setError('Failed to load options');
    } finally {
      if (isInitial) {
        setInitialLoading(false);
      } else {
        setLoading(false);
      }
    }
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

  const onToggle = async (e: CustomEvent<SelectToggleEventDetail>) => {
    if (e.detail.open && !hasLoadedOnce) {
      loadOptions(undefined, true);
    }
  };

  return (
    <PSelect name="async-search-select" label="Async Search" value={value} onChange={onChange} onToggle={onToggle}>
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
      {initialLoading && !error && (
        <>
          <div className="skeleton h-[40px]" />
          <div className="skeleton h-[40px]" />
          <div className="skeleton h-[40px]" />
          <div className="skeleton h-[40px]" />
          <div className="skeleton h-[40px]" />
          <div className="skeleton h-[40px]" />
        </>
      )}
      {options.map((opt) => (
        <PSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </PSelectOption>
      ))}
      {!initialLoading && options.length === 0 && !error && (
        <div
          className="text-contrast-medium cursor-not-allowed py-static-sm px-[12px]"
          aria-live="polite"
          role="option"
        >
          <span aria-hidden="true">–</span>
          <span className="sr-only">No results found</span>
        </div>
      )}
      {error && (
        <div className="flex flex-col gap-static-sm py-static-sm px-[12px]" aria-live="polite" role="alert">
          <PIcon name="information" color="notification-error" />
          <span className="text-error">{error}</span>
        </div>
      )}
    </PSelect>
  );
};
