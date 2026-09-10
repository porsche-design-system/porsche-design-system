import { PInputSearch, type PInputSearchElement } from '@porsche-design-system/components-react/ssr';
import { forwardRef, useState } from 'react';
import { type UseSearchBoxProps, useInstantSearch, useSearchBox } from 'react-instantsearch';

export const SearchInput = forwardRef<PInputSearchElement, UseSearchBoxProps>((props, ref) => {
  const { query, refine } = useSearchBox({ ...props, queryHook });
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <form action="" role="search" noValidate={true}>
      <PInputSearch
        clear={true}
        indicator={true}
        name="search-input"
        label="Search"
        hideLabel={true}
        ref={ref}
        autoComplete="off"
        placeholder="What are you looking for?"
        value={inputValue}
        onInput={(event) => {
          setQuery((event.detail.target as HTMLInputElement).value);
        }}
      ></PInputSearch>
      <span hidden={!isSearchStalled}>Searching…</span>
    </form>
  );
});

const timeout = 400;
let timerId: NodeJS.Timeout | undefined;

function queryHook(query: string, search: (query: string) => void) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), timeout);
}
