import { PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';
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
        <PTextFieldWrapper label="Search" hideLabel={true}>
          <input
            ref={ref}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="Search for products"
            spellCheck={false}
            maxLength={512}
            type="search"
            value={inputValue}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
            }}
          />
        </PTextFieldWrapper>
        <span hidden={!isSearchStalled}>Searching…</span>
      </form>
    </div>
  );
});

const timeout = 200;
let timerId: NodeJS.Timeout | undefined;

function queryHook(query: string, search: (query: string) => void) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), timeout);
}
