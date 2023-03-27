/** @deprecated */
export const LIST_TYPES = ['unordered', 'ordered'] as const;
/** @deprecated */
export type TextListListType = typeof LIST_TYPES[number];

/** @deprecated */
export const ORDER_TYPES = ['numbered', 'alphabetically'] as const;
/** @deprecated */
export type TextListOrderType = typeof ORDER_TYPES[number];

export const TEXT_LIST_TYPES = ['unordered', 'numbered', 'alphabetically'] as const;
export type TextListType = typeof TEXT_LIST_TYPES[number];

export const isListTypeOrdered = (type: TextListType | TextListListType): boolean => type !== 'unordered';

export const isListTypeNumbered = (type: TextListType): boolean => type === 'numbered';
