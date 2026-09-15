import type { StylesheetNode } from './types';

/**
 * Returns the consumer-facing identifier used by replacement metadata, keeping references aligned
 * when declarations are renamed.
 */
export const stylesheetIdentifier = (node: StylesheetNode): string =>
  'property' in node ? node.property : node.selector;
