import type { InputSearchInputEventDetail } from '@porsche-design-system/components-react';
import { PInputSearch } from '@porsche-design-system/components-react/ssr';
import { forwardRef, useState } from 'react';
import { type UseSearchBoxProps, useInstantSearch, useSearchBox } from 'react-instantsearch';

export const SearchInput = forwardRef<HTMLInputElement, UseSearchBoxProps>((props, ref) => {
  const { query, refine } = useSearchBox({ ...props, queryHook });
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div>
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
            setQuery(((event as CustomEvent<InputSearchInputEventDetail>).detail.target as HTMLInputElement).value);
          }}
        ></PInputSearch>
        <span hidden={!isSearchStalled}>Searching…</span>
      </form>
    </div>
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
