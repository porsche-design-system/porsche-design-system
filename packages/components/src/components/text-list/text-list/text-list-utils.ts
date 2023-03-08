export const LIST_TYPES = ['unordered', 'ordered'] as const;
export type TextListListType = typeof LIST_TYPES[number];

export const ORDER_TYPES = ['numbered', 'alphabetically'] as const;
export type TextListOrderType = typeof ORDER_TYPES[number];

export const isListTypeOrdered = (listType: TextListListType): boolean => listType === 'ordered';

export const isOrderTypeNumbered = (orderType: TextListOrderType): boolean => orderType === 'numbered';
