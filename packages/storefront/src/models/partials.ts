export type Partials =
  | 'getBrowserSupportFallbackScript'
  | 'getComponentChunkLinks'
  | 'getCookiesFallbackScript'
  | 'getDSRPonyfill'
  | 'getFontFaceStyles'
  | 'getFontFaceStylesheet'
  | 'getFontLinks'
  | 'getIconLinks'
  | 'getInitialStyles'
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
