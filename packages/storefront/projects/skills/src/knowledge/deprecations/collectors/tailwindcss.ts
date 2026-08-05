import fs from 'node:fs';
import path from 'node:path';
import type { DeprecationEntry, DeprecationSource } from '../types';
import { tailwindcssRoot } from './packageRoots';

/**
 * Collects the deprecated custom-property aliases from the generated Tailwind theme.
 *
 * Read from the built stylesheet rather than the meta, because the meta only carries the *documented*
 * aliases — the shadow and transition-duration aliases are CSS-only plumbing that never reaches it.
 * The stylesheet is also what a project imports, so it is the surface a project can actually use.
 *
 * These identifiers are the least distinctive in the whole index: nothing stops a project defining its
 * own `--border-width-regular`. Anchoring a match to PDS is therefore the audit's job, and the audit
 * skill states that requirement explicitly.
 */

const MARKER_LINE = /^\s*\/\*\s*alias \(deprecated\)\s*\*\/\s*$/;
const CUSTOM_PROPERTY = /^\s*(--[\w-]+)\s*:/;

export const collectTailwindcssDeprecations = (): DeprecationSource => {
  const stylesheet = path.join(tailwindcssRoot(), 'dist', 'index.css');
  const lines = fs.readFileSync(stylesheet, 'utf-8').split('\n');
  const entries: DeprecationEntry[] = [];

  for (let i = 1; i < lines.length; i++) {
    const property = (lines[i] ?? '').match(CUSTOM_PROPERTY);
    if (!property || !MARKER_LINE.test(lines[i - 1] ?? '')) {
      continue;
    }
    const identifier = property[1] as string;
    entries.push({
      id: `styleAlias/tailwindcss/${identifier}`,
      kind: 'styleAlias',
      source: 'tailwindcss',
      identifier,
      message: 'Deprecated alias kept so existing styles keep working. Will be removed with the next major release.',
      reference: 'references/styles/tailwindcss.md',
    });
  }

  entries.sort((a, b) => a.identifier.localeCompare(b.identifier));

  return { category: 'tailwindcss', origin: 'the generated Tailwind theme (`../../tailwindcss/index.css`)', entries };
};
