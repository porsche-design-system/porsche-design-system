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

export type AlgoliaRequest = {
  indexName: string;
  params: AlgoliaRequestParams;
};

export type AlgoliaRequestParams = {
  facets: string[];
  query: string;
  tagFilters: string;
  highlightPreTag?: string;
  highlightPostTag?: string;
};
