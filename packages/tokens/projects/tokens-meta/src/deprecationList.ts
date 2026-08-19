import { type PublishedDeprecation, publishDeprecations } from '@porsche-design-system/shared/deprecation';
import { tokenIdentifier } from './deprecation';
import { tokenDeprecationsMeta } from './lib/tokensMeta';
import type { DeprecatedTokenMeta } from './types/token-meta';

/**
 * The published deprecated surface: the generated catalog as an ordered flat list of token names and
 * markers. This is what consumers read — the domain keys only record which domains were checked.
 * Kept beside the generated catalog rather than inside it, since that file is emitted by
 * `scripts/generateTokensMeta.ts`.
 *
 * It is empty in the current release: no design token is deprecated. That is a generated result, not
 * a declaration — the day a token declaration gains a `@deprecated` annotation it appears here.
 */
export const tokenDeprecations: PublishedDeprecation[] = publishDeprecations<DeprecatedTokenMeta>(
  tokenDeprecationsMeta,
  tokenIdentifier
);
