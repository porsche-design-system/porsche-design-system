/**
 * TODO: Cache is shared between tests and never cleared. Evaluate solution.
 * */

import { validateContent } from './icon-validation';
import { CDN_BASE_URL, SVG_MANIFEST } from '@porsche-design-system/icons';
import { IconName } from '../../../types';
import { isUrl } from './icon-helper';

const requestCache = new Map<string, Promise<string>>();

export const getSvgContent = (url: string): Promise<string> => {
  let req = requestCache.get(url);
  if (req === undefined) {
    req = fetch(url).then(rsp => rsp.ok ? rsp.text().then(validateContent) : '');
    requestCache.set(url, req);
  }
  return req;
};

export const buildIconUrl = (iconNameOrSource: IconName | string): string => {
  if (isUrl(iconNameOrSource)) {
    return iconNameOrSource;
  } else if (SVG_MANIFEST[iconNameOrSource]) { // check if IconName exists
    return `${CDN_BASE_URL}/${SVG_MANIFEST[iconNameOrSource]}`;
  }
  // Only occurs if consumer is not using typescript -> necessary?
  console.warn('Please provide either an name property or a source property!');
  return '';
};
