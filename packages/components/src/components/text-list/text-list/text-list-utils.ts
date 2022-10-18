export const LIST_TYPES = ['unordered', 'ordered'] as const;
export type ListType = typeof LIST_TYPES[number];

export const ORDER_TYPES = ['numbered', 'alphabetically'] as const;
export type OrderType = typeof ORDER_TYPES[number];
