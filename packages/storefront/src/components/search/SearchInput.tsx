import { PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';
import { useRef, useState } from 'react';
import { type UseSearchBoxProps, useInstantSearch, useSearchBox } from 'react-instantsearch';

export const SearchInput = (props: UseSearchBoxProps) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div>
      <form
        action=""
        role="search"
        noValidate={true}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery('');

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <PTextFieldWrapper label="Search" hideLabel={true}>
          <input
            ref={inputRef}
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
            autoFocus={true}
          />
        </PTextFieldWrapper>
        <span hidden={!isSearchStalled}>Searching…</span>
      </form>
    </div>
  );
};
