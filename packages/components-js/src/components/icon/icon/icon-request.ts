/**
 * TODO: Cache is shared between tests and never cleared. Evaluate solution.
 * */

import { validateContent } from './icon-validation';
import { CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/icons';
import { IconName } from '../../../types';
import { isUrl } from './icon-helper';
import { camelCase } from 'change-case';

export const DEFAULT_ICON_NAME: IconName = 'arrow-head-right';
const requestCache = new Map<string, Promise<string>>();

export const getSvgContent = async (url: string): Promise<string> => {
  let req = requestCache.get(url);
  if (req === undefined) {
    req = fetch(url).then(
      (rsp) => rsp.ok ? rsp.text().then(validateContent) : '',
      () => '' // reject callback
    );
    requestCache.set(url, req);
  }
  return req;
};

export const buildIconUrl = (iconNameOrSource: IconName | string = DEFAULT_ICON_NAME): string => {
  if(iconNameOrSource === null){
    return buildIconUrl(DEFAULT_ICON_NAME);
  }else if (isUrl(iconNameOrSource)) {
    return iconNameOrSource;
  } else if (ICONS_MANIFEST[camelCase(iconNameOrSource)]) { // check if IconName exists
    return `${CDN_BASE_URL}/${ICONS_MANIFEST[camelCase(iconNameOrSource)]}`;
  }
  // Only occurs if consumer is not using typescript -> necessary?
  console.warn('Please provide either an name property or a source property!');
  return buildIconUrl(DEFAULT_ICON_NAME);
};
