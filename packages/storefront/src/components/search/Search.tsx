'use client';

import { SearchInput } from '@/components/search/SearchInput';
import { SearchResults } from '@/components/search/SearchResults';
import { algoliaClient } from '@/lib/algolia/client';
import { PHeading, PModal } from '@porsche-design-system/components-react/ssr';
import type { SearchOptions, SearchResponses } from 'algoliasearch-helper/types/algoliasearch';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { InstantSearch } from 'react-instantsearch';

export type AlgoliaRecord = {
  objectID: string;
  name: string;
  content: string;
  category: string;
  page: string;
  tab?: string;
  url: string;
};

export type AlgoliaResult = {
  category: string;
  hits: AlgoliaRecord[];
};

type SearchProps = {
  isSearchOpen: boolean;
  onDismissSearch: () => void;
};

export const Search = ({ isSearchOpen, onDismissSearch }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isSearchOpen]);

  const searchClient = {
    ...algoliaClient,
    search<T>(requests: Array<{ indexName: string; params: SearchOptions }>): Promise<SearchResponses<T>> {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        });
      }

      return algoliaClient.search(requests);
    },
  };

  const getAlgoliaIndexName = () => {
    const baseHref = process.env.NEXT_PUBLIC_BASE_PATH ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/` : '/';
    // on localhost baseHref is '/'
    return baseHref.includes('/issue/')
      ? 'latest'
      : baseHref.length > 1
        ? baseHref.slice(1, -1).replace('/', '_')
        : 'latest';
  };

  return (
    <PModal
      open={isSearchOpen}
      onDismiss={onDismissSearch}
      aria={{ 'aria-label': 'Search' }}
      style={
        {
          '--p-modal-spacing-top': '10vh',
          '--p-modal-spacing-bottom': '10vh',
          '--p-modal-width': 'clamp(276px, 45.25vw + 131px, 640px)',
        } as React.CSSProperties
      }
    >
      <InstantSearch searchClient={searchClient} indexName={getAlgoliaIndexName()} routing={true}>
        <div className="stretch-to-full-modal-width h-[80vh] p-lg">
          <div className="flex flex-col gap-sm h-full">
            <PHeading size="medium" tag="h2">
              Search
            </PHeading>
            <SearchInput ref={inputRef} />
            <SearchResults onResultClick={onDismissSearch} />
          </div>
        </div>
      </InstantSearch>
    </PModal>
  );
};
