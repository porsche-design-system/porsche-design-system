import { type Deprecations, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { tokenIdentifier } from './deprecation';
import { tokenDeprecationsMeta } from './lib/tokensMeta';
import type { DeprecatedTokenMeta, TokenDeprecationsTree } from './types/token-meta';

/** Walk the generated catalog into a flat list in source order; groups only structure. */
export const flattenTokenDeprecations = (tree: TokenDeprecationsTree): DeprecatedTokenMeta[] =>
  Object.values(tree).flatMap((node) =>
    isDeprecated(node) ? [node as DeprecatedTokenMeta] : flattenTokenDeprecations(node as TokenDeprecationsTree)
  );

/**
 * The published deprecated surface: the generated catalog as an ordered flat list of token names and
 * markers. This is what consumers read — the domain keys only record which domains were checked.
 * Kept beside the generated catalog rather than inside it, since that file is emitted by
 * `scripts/generateTokensMeta.ts`.
 *
 * It is empty in the current release: no design token is deprecated. That is a generated result, not
 * a declaration — the day a token declaration gains a `@deprecated` annotation it appears here.
 */
export const tokenDeprecations: Deprecations = flattenTokenDeprecations(tokenDeprecationsMeta).map((node) => ({
  identifier: tokenIdentifier(node),
  deprecation: node.deprecation,
}));
