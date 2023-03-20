import type { LinkTarget } from '../../utils/link-button/link-target';
import { WORDMARKS_CDN_BASE_URL, WORDMARKS_MANIFEST } from '@porsche-design-system/wordmark';

export const WORDMARK_SIZES = ['responsive', 'inherit'] as const;
export type WordmarkSize = (typeof WORDMARK_SIZES)[number];

export type WordmarkTarget = LinkTarget;

export const WORDMARK_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type WordmarkAriaAttribute = (typeof WORDMARK_ARIA_ATTRIBUTES)[number];

export const getWordmarkSvgUrl = (): string => {
  const cdnBaseUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production' ? WORDMARKS_CDN_BASE_URL : 'http://localhost:3001/wordmark';
  return `${cdnBaseUrl}/${WORDMARKS_MANIFEST['wordmark']}`;
};
