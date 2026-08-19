import { deprecationMessage, type PublishedDeprecation } from '@porsche-design-system/shared/deprecation';
import type { DeprecationSource, SourceCategory } from '../types';

/**
 * The one adapter every styling solution's collector is.
 *
 * Each package publishes its deprecated surface as an ordered list of canonical identifiers carrying
 * the shared marker, so the four collectors differ only in which list to read, how the source
 * describes itself and which reference documents its current API. Everything the audit owns and the
 * packages have no business knowing — the rule-ID scheme, the source category, the `replacement`
 * passthrough and the order guarantee — lives here rather than four times over.
 *
 * Identity and wording both stay package-resolved: the identifier is spelled by the package before
 * it is published, and `deprecationMessage` is the shared helper, so nothing here re-spells a name
 * or invents a fallback sentence.
 */
export const styleAliasSource = ({
  category,
  origin,
  reference,
  deprecations,
}: {
  category: SourceCategory;
  /** Human-readable origin, rendered into the index so a reader can verify the claim. */
  origin: string;
  /** Skill-relative reference documenting the package's current API. */
  reference: string;
  /** The package's published deprecations, in catalog order — the rendered order. */
  deprecations: PublishedDeprecation[];
}): DeprecationSource => ({
  category,
  origin,
  // Catalog order is the rendered order: the package decides how the section reads, and rule ids
  // depend only on identifiers, so rows stay comparable across runs regardless of position.
  entries: deprecations.map(({ identifier, deprecation }) => ({
    id: `styleAlias/${category}/${identifier}`,
    kind: 'styleAlias',
    source: category,
    identifier,
    message: deprecationMessage({ deprecation }),
    ...(deprecation.replacement ? { replacement: deprecation.replacement } : {}),
    reference,
  })),
});
