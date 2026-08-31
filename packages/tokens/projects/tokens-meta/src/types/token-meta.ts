/**
 * Documented token metadata. Deprecated tokens are emitted only through `tokenDeprecations`.
 */
export type TokenMeta = {
  name: string;
  value: string | number;
  description: string;
};

/** Recursive catalog mirroring the token package's directory layout. */
export type TokensMetaTree = { [key: string]: TokensMetaTree | TokenMeta };
