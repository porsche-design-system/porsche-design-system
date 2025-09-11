import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

export const TYPESENSE__SEARCH_ONLY_KEY = 'xyz';
const typesenseInstantSearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: TYPESENSE__SEARCH_ONLY_KEY,
    nodes: [
      {
        host: 'localhost',
        port: 8108,
        protocol: 'http',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'content',
  },
});

export const typesenseClient = typesenseInstantSearchAdapter.searchClient;
