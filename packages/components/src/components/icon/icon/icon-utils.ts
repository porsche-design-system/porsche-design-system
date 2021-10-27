/**
 * TODO: Cache is shared between tests and never cleared. Evaluate solution.
 * */

import { CDN_BASE_URL as ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/icons';
import type { IconName } from '../../../types';
import {
  paramCaseToCamelCase,
  parseAriaAttributes,
  pdsFetch,
  throwIfAccessibilityAttributesAreInvalid,
} from '../../../utils';
import { AriaAttributes, SelectedAriaAttributes } from '../../../types';

export const ICON_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type IconAriaAttributes = typeof ICON_ARIA_ATTRIBUTES[number];

export const isUrl = (str: string): boolean => str?.length > 0 && /(\/)/.test(str);

export const DEFAULT_ICON_NAME: IconName = 'arrow-head-right';
const requestCache = new Map<string, Promise<string>>();

export const getSvgContent = async (url: string): Promise<string> => {
  if (!url) {
    return Promise.reject('url is undefined');
  }

  let req = requestCache.get(url);
  if (req === undefined) {
    req = pdsFetch(url).then(
      (rsp) => (rsp.ok ? rsp.text() : ''),
      () => '' // reject callback
    );
    requestCache.set(url, req);
  }

  return req;
};

export const buildIconUrl = (iconNameOrSource: IconName | string = DEFAULT_ICON_NAME): string => {
  const cdnBaseUrl = ROLLUP_REPLACE_IS_STAGING === 'production' ? ICONS_CDN_BASE_URL : 'http://localhost:3001/icons';

  if (iconNameOrSource === null) {
    return buildIconUrl(DEFAULT_ICON_NAME);
  } else if (isUrl(iconNameOrSource)) {
    return iconNameOrSource;
  } else if (ICONS_MANIFEST[paramCaseToCamelCase(iconNameOrSource)]) {
    // check if IconName exists
    return `${cdnBaseUrl}/${ICONS_MANIFEST[paramCaseToCamelCase(iconNameOrSource)]}`;
  }

  // Only occurs if consumer is not using typescript -> necessary?
  console.warn('Please provide either an name property or a source property!');
  return buildIconUrl(DEFAULT_ICON_NAME);
};

export const patchAccessibilityToSVG = (
  content: string,
  rawAccessibility: SelectedAriaAttributes<IconAriaAttributes>
): string => {
  const accessibility = parseAriaAttributes(rawAccessibility);
  const attributeKeys = accessibility ? (Object.keys(accessibility) as (keyof AriaAttributes)[]) : [];
  throwIfAccessibilityAttributesAreInvalid(attributeKeys, ICON_ARIA_ATTRIBUTES);

  return attributeKeys.length
    ? content.replace('<svg', `<svg role="img" aria-label="${accessibility['aria-label']}"`)
    : content;
};
