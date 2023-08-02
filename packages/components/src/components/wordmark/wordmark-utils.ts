import type { LinkTarget } from '../../utils/link-button/link-target';
import type { LinkAriaAttribute } from '../../utils';

export const WORDMARK_SIZES = ['small', 'inherit'] as const;
export type WordmarkSize = (typeof WORDMARK_SIZES)[number];

export type WordmarkTarget = LinkTarget;

export type WordmarkAriaAttribute = LinkAriaAttribute;
