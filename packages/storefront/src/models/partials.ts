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
export type PartialParam = {
  value: string;
  options: object;
  comment?: string;
};
