export type Partials =
  | 'getComponentChunkLinks'
  | 'getFontLinks'
  | 'getIconLinks'
  | 'getLoaderScript'
  | 'getMetaTagsAndIconLinks';
export type PartialLocation = 'head' | 'body';

export type PartialCall = {
  params: PartialParam[];
  comment?: string;
};

export type PartialParam = {
  key: string;
  value: string | string[];
};
