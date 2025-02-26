export type Partials =
  | 'getComponentChunkLinks'
  | 'getMetaTagsAndIconLinks'
  | 'getFontLinks'
  | 'getFontFaceStylesheet'
  | 'getFontFaceStyles'
  | 'getInitialStyles'
  | 'getIconLinks';
// | 'getDSRPonyfill'
// | 'getBrowserSupportFallbackScript'
// | 'getCookiesFallbackScript';
export type PartialLocation = 'head' | 'body';

export type PartialCall = {
  params: PartialParam[];
  comment?: string;
};

export type PartialParam = {
  key: string;
  value: string | string[];
};
