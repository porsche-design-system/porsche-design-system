export const preventFoucOfNestedElementsStyles = {
  ':not(:defined,[data-ssr])': {
    visibility: 'hidden',
  },
} as const;
