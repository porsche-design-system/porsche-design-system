'use client';

import { Panel } from '@/components/search/Panel';
import { algoliaClient } from '@/lib/algolia/client';
import { PHeading, PLinkPure } from '@porsche-design-system/components-react/ssr';
import type { SearchOptions, SearchResponses } from 'algoliasearch-helper/types/algoliasearch';
import type { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from 'next/link';
import React from 'react';
import { DynamicWidgets, Hits, InstantSearch, RefinementList, SearchBox } from 'react-instantsearch';

export type AlgoliaRecord = {
  objectID: string;
  name: string;
  content: string;
  category: string;
  page: string;
  tab?: string;
  url: string;
};

type HitProps = {
  hit: AlgoliaHit<AlgoliaRecord>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <PHeading size="small" tag="h2">
        {hit.category}
      </PHeading>
      <ul>
        <li>
          <PLinkPure icon="none">
            <Link href={hit.url}>
              {hit.page} {hit.tab ? ` - ${hit.tab}` : ''}
            </Link>
          </PLinkPure>
        </li>
      </ul>
    </>
  );
}

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
          <SearchBox />
          <Hits hitComponent={Hit} />
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
