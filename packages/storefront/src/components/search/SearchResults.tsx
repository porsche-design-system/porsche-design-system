import type { AlgoliaRecord } from '@/components/search/Search';
import { PHeading, PLinkPure } from '@porsche-design-system/components-react/ssr';
import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types/results';
import Link from 'next/link';
import React from 'react';
import { type UseHitsProps, useHits, useRefinementList } from 'react-instantsearch';

const transformItems: UseHitsProps<AlgoliaHit<AlgoliaRecord>>['transformItems'] = (items, { results }) => {
  return items.map((item, index) => ({
    ...item,
  }));
};

export const SearchResults = (props: UseHitsProps<AlgoliaHit<AlgoliaRecord>>) => {
  const { items, sendEvent } = useHits(props);
  const { items: categories } = useRefinementList({ attribute: 'category' });

  console.log(categories);

  return (
    <ol>
      {items.map((hit) => (
        <li key={hit.url}>
          <PHeading size="small" tag="h2">
            {hit.category}
          </PHeading>
          <PLinkPure icon="none">
            <Link href={hit.url}>
              {hit.page} {hit.tab ? ` - ${hit.tab}` : ''}
            </Link>
          </PLinkPure>
        </li>
      ))}
    </ol>
  );
};
