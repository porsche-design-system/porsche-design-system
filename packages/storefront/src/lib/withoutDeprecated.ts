/** Strip the `deprecated` sub-tree from an emotionMeta node so the remainder
 *  is a leaf-only record compatible with TokensTable's `meta` prop. */
export const withoutDeprecated = <T extends Record<string, unknown>>(tree: T): Omit<T, 'deprecated'> => {
  const { deprecated: _, ...rest } = tree;
  return rest as Omit<T, 'deprecated'>;
};
