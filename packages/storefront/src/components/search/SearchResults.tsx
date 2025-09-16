import { PHeading } from '@porsche-design-system/components-react/ssr';
import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types/results';
import Link from 'next/link';
import React from 'react';
import { type UseHitsProps, useHits } from 'react-instantsearch';
import type { TypesenseRecord, TypesenseResult } from '@/components/search/Search';
import { SearchRecommendations } from './SearchRecommendations';

const transformItems = (items: TypesenseRecord[]) => {
  console.table(items);
  return items.reduce((results, current) => {
    const categoryIndex = results.findIndex((result) => result.category === current.category);
    if (categoryIndex >= 0) {
      // reduce amount of displayed hits per category to 5 when using distinct on 'page' instead of 'category''
      results[categoryIndex].hits.length < 5 && results[categoryIndex].hits.push(current);
    } else {
      results.push({ category: current.category, hits: [current] });
    }
    return results;
  }, [] as TypesenseResult[]);
};

export const SearchResults = ({
  onResultClick,
  ...props
}: UseHitsProps<AlgoliaHit<TypesenseRecord>> & { onResultClick: () => void }) => {
  const { items } = useHits<TypesenseRecord>({ ...props, transformItems } as any);
  console.table(items);
  return (
    <div className="h-full overflow-auto flex flex-col gap-fluid-sm">
      {(items as unknown as TypesenseResult[]).map(({ category, hits }) => (
        <section key={category}>
          <PHeading size="small" tag="h2" className="mb-fluid-xs">
            {category}
          </PHeading>
          <ol className="flex flex-col gap-fluid-sm">
            {hits.map((hit) => (
              <Link key={hit.url} href={hit.url} onClick={onResultClick}>
                <li className="hit py-fluid-sm px-fluid-md bg-surface rounded-md">
                  <p className="text-sm">
                    {hit.page} {hit.tab ? ` - ${hit.tab}` : ''}
                  </p>
                  <p className="text-sm text-contrast-high">{hit.url.includes('#') ? `# ${hit.name}` : hit.name}</p>
                </li>
              </Link>
            ))}
          </ol>
        </section>
      ))}
      <SearchRecommendations onRecommendationClick={onResultClick} />
    </div>
  );
};
