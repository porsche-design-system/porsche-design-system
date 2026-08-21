import type { Deprecated } from '@porsche-design-system/shared/deprecation';

/**
 * A documented design token as the metadata renders it: the export name, its resolved value and the
 * JSDoc description of the declaration it was generated from.
 *
 * There is deliberately **no** `deprecation` field. A token lives in exactly one of the two
 * generated catalogs, and the compiler is what keeps them apart: `tokensMeta` rejects a leaf that
 * grew a marker, and `tokenDeprecationsMeta` rejects one that lost it.
 */
export type TokenMeta = {
  name: string;
  value: string | number;
  description: string;
};

/**
 * Any level of a generated catalog: a keyed group (`font`, `font.size`) or a leaf token. The
 * grouping mirrors the token package's directory layout, and both catalogs share this shape.
 */
export type TokensMetaTree = { [key: string]: TokensMetaTree | TokenMeta };

// --- Deprecated surface ------------------------------------------------------------------------
// The legacy tokens that still ship, beside the documented catalog above. Shape and placement are
// identical in every metadata package: the leaf, then the catalog. The marker, the wrapper and the
// lifecycle wording are the shared contract (`@porsche-design-system/shared/deprecation`); this
// package declares neither.

/**
 * A deprecated token: its render input plus the marker. `description` is deliberately left out — a
 * legacy token is documented by its `@deprecated` annotation, not by a docs row — and the omission
 * is spelled here rather than hidden in the shared wrapper, which no longer strips anything.
 */
export type DeprecatedTokenMeta = Deprecated<Omit<TokenMeta, 'description'>>;

/**
 * The deprecated surface, grouped like {@link TokensMetaTree} and keyed by the same root domains:
 * every domain is spelled out, empty ones included, so "checked, nothing deprecated" stays
 * distinguishable from "forgotten".
 */
export type TokenDeprecationsMeta = Record<keyof TokensMetaTree, TokenDeprecationsTree>;

/** Any level of the deprecated catalog: a keyed group or a deprecated leaf. */
export type TokenDeprecationsTree = { [key: string]: TokenDeprecationsTree | DeprecatedTokenMeta };
