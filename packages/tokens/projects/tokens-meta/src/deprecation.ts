import type { TokenMeta } from './types/token-meta';

// Canonical identity, owned by this package because what a consumer writes differs between sources:
// a token is imported by its export name, where SCSS spells `$name` and Tailwind `--custom-property`.
// The marker, the wording and the message helpers are the shared contract
// (`@porsche-design-system/shared/deprecation`).

/**
 * The canonical consumer-facing spelling of a token: its public export name, exactly as it is
 * imported from `@porsche-design-system/tokens`.
 *
 * A `replacement` is resolved through this against the current catalog while the metadata is
 * generated — the annotation names the replacement as a `{@link}` symbol reference — so a
 * deprecation cannot point at a token that no longer exists.
 */
export const tokenIdentifier = ({ name }: Pick<TokenMeta, 'name'>): string => name;
