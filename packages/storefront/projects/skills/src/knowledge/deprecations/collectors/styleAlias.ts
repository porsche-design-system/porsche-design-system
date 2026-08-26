import type { Deprecations } from '@porsche-design-system/shared/deprecation';
import type { DeprecationSource, SourceCategory } from '../types';

/**
 * The one adapter every metadata-publishing source's collector is.
 *
 * Each package publishes its deprecated surface as an ordered list of canonical identifiers carrying
 * the shared marker, so the collectors differ only in which list to read, how the source describes
 * itself and which reference documents its current API. Everything the audit owns and the packages
 * have no business knowing — the rule-ID scheme, the source category, the `replacement` passthrough,
 * the order guarantee and the verified-empty declaration — lives here rather than five times over.
 *
 * Identity stays package-resolved: the identifier is spelled by the package before it is published,
 * so nothing here re-spells a name or invents wording.
 */
export const styleAliasSource = ({
  category,
  origin,
  reference,
  deprecations,
}: {
  category: SourceCategory;
  /** Human-readable origin, rendered into the index so a reader can verify the claim. */
  origin: DeprecationSource['origin'];
  /** Skill-relative reference documenting the package's current API. */
  reference: string;
  /** The package's published deprecations, in catalog order — the rendered order. */
  deprecations: Deprecations;
}): DeprecationSource => ({
  category,
  origin,
  // Catalog order is the rendered order: the package decides how the section reads, and rule ids
  // depend only on identifiers, so rows stay comparable across runs regardless of position.
  entries: deprecations.map(({ identifier, deprecation }) => ({
    id: `styleAlias/${category}/${identifier}`,
    kind: 'styleAlias',
    source: category,
    // The lifecycle sentence is stated once in the reference's intro, so a row carries only what is
    // specific to it: the replacement and any extra guidance the package authored.
    identifier,
    ...(deprecation.note ? { message: deprecation.note } : {}),
    ...(deprecation.replacement ? { replacement: deprecation.replacement } : {}),
    reference,
  })),
  // A package that publishes nothing has been checked and found clean — the emptiness is derived
  // from its catalog, so the completeness gate can hold it to the same either-way rule as the rest.
  ...(deprecations.length === 0 ? { expectedEmpty: true as const } : {}),
});
