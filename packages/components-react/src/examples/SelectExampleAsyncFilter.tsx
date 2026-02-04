import {
  type InputSearchInputEventDetail,
  PIcon,
  PInputSearch,
  PSelect,
  PSelectOption,
  type SelectChangeEventDetail,
  type SelectToggleEventDetail,
} from '@porsche-design-system/components-react';
import { useCallback, useRef, useState } from 'react';

const useDebounce = <T,>(callback: (value: T) => void, delay = 400) => {
  const timer = useRef<number | undefined>(undefined);
  return (value: T) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => callback(value), delay);
  };
};

export const SelectExampleAsyncFilter = (): JSX.Element => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasLoadedOnce = useRef(false);
  const currentFetchId = useRef(0);

  // 💡Consider using a data-fetching library like React Query or SWR here.
  // They provide built-in caching, deduplication, retries, and loading/error state management,
  // which would make this async logic cleaner and more reliable than manual fetch handling.
  const fetchOptions = useCallback(async (term?: string, isInitial?: boolean) => {
    const fetchId = ++currentFetchId.current;
    isInitial ? setInitialLoading(true) : setLoading(true);
    try {
      const url = term
        ? `https://jsonplaceholder.typicode.com/users?username_like=${term}`
        : `https://jsonplaceholder.typicode.com/users`;

      const res = await fetch(url);
      const data: { id: number; name: string; username: string }[] = await res.json();

      // Ignore stale results
      if (fetchId !== currentFetchId.current) return;

      const newOptions = data.map((user) => ({
        value: user.id.toString(),
        label: `${user.name} (${user.username})`,
      }));

      setOptions(newOptions);
      setError(null);
      hasLoadedOnce.current = true;
    } catch (err) {
      console.error('Failed to fetch options', err);
      setOptions([]);
      setError('Failed to load options');
    } finally {
      isInitial ? setInitialLoading(false) : setLoading(false);
    }
  }, []);

  const debouncedFetch = useDebounce(fetchOptions, 400);

  const onInput = (e: CustomEvent<InputSearchInputEventDetail>) => {
    const term = (e.target as HTMLElement & { value: string }).value;
    setSearchValue(term);
    debouncedFetch(term.trim() || undefined);
  };

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    setValue((e.target as HTMLElement & { value: string }).value);
  };

  const onToggle = async (e: CustomEvent<SelectToggleEventDetail>) => {
    if (e.detail.open && !hasLoadedOnce.current) {
      fetchOptions(undefined, true);
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
        // Prevent bubbling
        onBlur={(e: any) => e.stopPropagation()}
        onChange={(e: any) => e.stopPropagation()}
      />

      {/* Initial skeleton loading */}
      {initialLoading &&
        !error &&
        Array.from({ length: 9 }).map((_, i) => <div key={i} slot="options-status" className="skeleton h-[40px]" />)}

      {/* Options */}
      {options.map((opt) => (
        <PSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </PSelectOption>
      ))}

      {/* No filter results */}
      {!initialLoading && options.length === 0 && !error && (
        <div
          slot="options-status"
          className="text-contrast-medium cursor-not-allowed py-static-sm px-[12px]"
          role="alert"
        >
          <span aria-hidden="true">–</span>
          <span className="sr-only">No results found</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div slot="options-status" className="flex gap-static-sm py-static-sm px-[12px]" role="alert">
          <PIcon name="information" color="notification-error" />
          <span className="text-error">{error}</span>
        </div>
      )}
    </PSelect>
  );
};
