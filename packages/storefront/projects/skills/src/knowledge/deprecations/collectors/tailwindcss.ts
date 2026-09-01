import { tailwindDeprecations } from '@porsche-design-system/tailwindcss';
import { type DeprecationSource, publicWrapperExport } from '../types';
import { publishedSource } from './published';

/**
 * Adapts the Tailwind package's own deprecated surface into index entries.
 *
 * `tailwindDeprecations` is derived from the single catalog the shipped `index.css` is generated
 * from, so a deprecated custom property cannot reach a consumer without appearing here.
 * That replaces re-reading the generated stylesheet and scraping `alias (deprecated)` markers out of
 * it — a scan that could only ever recover a marker the package had already discarded the meaning of,
 * which is why every entry used to carry the same hardcoded sentence and no replacement.
 *
 * These identifiers are the least distinctive in the whole index: nothing stops a project defining
 * its own `--border-width-regular`. Anchoring a match to PDS is therefore the audit's job, and the
 * audit skill states that requirement explicitly.
 */
export const collectTailwindcssDeprecations = (): DeprecationSource =>
  publishedSource({
    category: 'tailwindcss',
    origin: (framework) => `the Tailwind theme exposed by ${publicWrapperExport(framework, '/tailwindcss')}`,
    reference: 'references/styles/tailwindcss.md',
    deprecations: tailwindDeprecations,
  });
