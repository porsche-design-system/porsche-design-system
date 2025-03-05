'use client';

import { createInMemoryCache } from '@algolia/cache-in-memory';
import { liteClient as algoliasearch } from 'algoliasearch/lite';

// TODO: Shouldn't this be coming from environment variables?
const ALGOLIA_APP_ID = '1NH68HJ92C';
const ALGOLIA_SEARCH_ONLY_KEY = '690605ee1f61d0e13c571484ecb74125';

export const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY, {
  responsesCache: createInMemoryCache(),
  requestsCache: createInMemoryCache({ serializable: false }),
});
