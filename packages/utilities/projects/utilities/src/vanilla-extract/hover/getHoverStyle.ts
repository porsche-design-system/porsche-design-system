import { type Options, getHoverNestedStyles, getHoverStyles } from '../../js/hover/getHoverStyle'; // Use explicit import to ensure correct bundling

export const getHoverStyle = (opts?: Options) => {
  const { borderRadius } = opts || {};
  return {
    ...getHoverStyles(borderRadius),
    '@media': {
      '(hover:hover)': {
        selectors: {
          '&:hover': {
            ...getHoverNestedStyles(),
          },
        },
      },
    },
  } as const;
};
