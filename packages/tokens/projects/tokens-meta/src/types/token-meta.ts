/**
 * A documented design token as the metadata renders it: the export name, its resolved value and the
 * JSDoc description of the declaration it was generated from.
 *
 * There is deliberately **no** `deprecation` field: a deprecated token is never documented here, it
 * is published by `tokenDeprecations`, the shared `Deprecations` list generated from the
 * `@deprecated` annotations — the whole deprecated surface.
 */
export type TokenMeta = {
  name: string;
  value: string | number;
  description: string;
};

/**
 * Any level of the generated catalog: a keyed group (`font`, `font.size`) or a leaf token. The
 * grouping mirrors the token package's directory layout.
 */
export type TokensMetaTree = { [key: string]: TokensMetaTree | TokenMeta };
