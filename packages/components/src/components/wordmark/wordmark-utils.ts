import type { LinkTarget } from '../../utils/link-button/link-target';

export const WORDMARK_SIZES = ['small', 'inherit'] as const;
export type WordmarkSize = (typeof WORDMARK_SIZES)[number];

export type WordmarkTarget = LinkTarget;

export const WORDMARK_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type WordmarkAriaAttribute = (typeof WORDMARK_ARIA_ATTRIBUTES)[number];
