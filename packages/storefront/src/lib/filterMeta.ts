/** Returns only the entries whose key passes `predicate`, preserving insertion order. */
export const filterMeta = <T extends Record<string, unknown>>(
  meta: T,
  predicate: (key: string) => boolean,
): Record<string, T[keyof T]> => Object.fromEntries(Object.entries(meta).filter(([k]) => predicate(k))) as Record<string, T[keyof T]>;
