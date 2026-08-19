import { tailwindDeprecations } from '@porsche-design-system/tailwindcss';
import type { DeprecationSource } from '../types';
import { styleAliasSource } from './styleAlias';

/**
 * Adapts the Tailwind package's own deprecation catalog into index entries.
 *
 * The catalog is authored beside the declarations it describes and is what the shipped `index.css`
 * is generated from, so a deprecated custom property cannot reach a consumer without appearing here.
 * That replaces re-reading the generated stylesheet and scraping `alias (deprecated)` markers out of
 * it — a scan that could only ever recover a marker the package had already discarded the meaning of,
 * which is why every entry used to carry the same hardcoded sentence and no replacement.
 *
 * These identifiers are the least distinctive in the whole index: nothing stops a project defining
 * its own `--border-width-regular`. Anchoring a match to PDS is therefore the audit's job, and the
 * audit skill states that requirement explicitly.
 */
export const collectTailwindcssDeprecations = (): DeprecationSource =>
  styleAliasSource({
    category: 'tailwindcss',
    origin:
      'the `tailwindDeprecationsMeta` catalog of `@porsche-design-system/tailwindcss`, which the ' +
      'shipped Tailwind theme (`index.css`) is generated from',
    reference: 'references/styles/tailwindcss.md',
    deprecations: tailwindDeprecations,
  });
