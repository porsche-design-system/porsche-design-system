'use client';

import { Panel } from '@/components/search/Panel';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResults } from '@/components/search/SearchResults';
import { algoliaClient } from '@/lib/algolia/client';
import type { SearchOptions, SearchResponses } from 'algoliasearch-helper/types/algoliasearch';
import React from 'react';
import { DynamicWidgets, InstantSearch, RefinementList } from 'react-instantsearch';

export type AlgoliaRecord = {
  objectID: string;
  name: string;
  content: string;
  category: string;
  page: string;
  tab?: string;
  url: string;
};

export const Search = () => {
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
    <InstantSearch searchClient={searchClient} indexName={getAlgoliaIndexName()} routing={true}>
      <div className="Container">
        <div>
          <DynamicWidgets fallbackComponent={FallbackComponent} />
        </div>
        <div>
          <SearchInput />
          <SearchResults />
        </div>
      </div>
    </InstantSearch>
  );
};

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}
