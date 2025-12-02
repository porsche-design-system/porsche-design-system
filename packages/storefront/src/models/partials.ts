export type Partials =
  | 'getComponentChunkLinks'
  | 'getFontFaceStyles'
  | 'getFontFaceStylesheet'
  | 'getFontLinks'
  | 'getIconLinks'
  | 'getInitialStyles'
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
