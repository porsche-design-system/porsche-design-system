export const TEXT_LIST_TYPES = ['unordered', 'numbered', 'alphabetically'] as const;
export type TextListType = (typeof TEXT_LIST_TYPES)[number];

export const isListTypeOrdered = (type: TextListType): boolean => {
  return type !== 'unordered';
};

export const isListTypeNumbered = (type: TextListType): boolean => {
  return type === 'numbered';
};
