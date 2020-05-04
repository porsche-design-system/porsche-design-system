/**
 * TODO: Cache is shared between tests and never cleared. Evaluate solution.
 * */

import { validateContent } from './icon-validation';
import { cdn, svg } from '@porsche-design-system/icons';
import { IconName } from '../../../types';
import { isUrl } from './icon-helper';

const iconCache = new Map<string, string>();
const requestCache = new Map<string, Promise<string>>();

export function getSvgContent (url: string): Promise<string> {
  let req: Promise<string>;
  if(iconCache.has(url)){
    req = Promise.resolve(iconCache.get(url));
  } else {
    // see if we already have a request for this url
    const pendingReq: Promise<string> = requestCache.get(url);

    if (!pendingReq) {
      // we don't already have a request
      req = fetch(url).then(rsp => {
        if (rsp.ok) {
          return rsp.text().then(svgContent => {
            const validSvgContent = validateContent(svgContent);
            iconCache.set(url, validSvgContent);
            return validSvgContent;
          });
        }
        const emptyString = '';
        iconCache.set(url, emptyString);
        return emptyString;
      });

      // cache for the same requests
      requestCache.set(url, req);
    }else{
     req = pendingReq;
    }
  }
  return req;
}

export const buildIconUrl = (iconNameOrSource: IconName | string): string => {
  if (isUrl(iconNameOrSource)){
    return iconNameOrSource;
  } else if (svg[iconNameOrSource]) { // check if IconName exists
    return `${cdn}/${svg[iconNameOrSource]}`;
  }

  console.warn('Please provide either an name property or a source property!');
  return '';
};
