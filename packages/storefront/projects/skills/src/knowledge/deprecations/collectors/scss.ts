import fs from 'node:fs';
import path from 'node:path';
import type { DeprecationEntry, DeprecationSource } from '../types';
import { scssRoot } from './packageRoots';

/**
 * Collects the deprecated Sass surface from the shipped `_*.scss` partials — the artifact a project
 * actually `@use`s, so what is collected is exactly what a project can reference.
 *
 * The partials are the only reliable source here: the SCSS meta models deprecated aliases as opaque
 * `ScssRaw` nodes rendered verbatim, so they cannot be enumerated from it.
 *
 * Detection is marker-driven, never prefix-driven. A `pds-` prefix looks like it would identify the
 * legacy surface, but it does not: `$pds-grid-*` is the *current* documented grid API, and
 * `$pds-focus-offset-map` / `$pds-breakpoints` are internal plumbing. Only an explicit
 * `(deprecated)` marker counts.
 */

/** `alias (deprecated)` marks a rename; a bare `(deprecated)` marks a removal with no modern equal. */
const MARKER = /\/\*[^*]*\(deprecated\)[^*]*\*\//;
/** A marker on a line of its own — the shape used above a deprecated `@mixin`. */
const MARKER_LINE = /^\s*\/\*[^*]*\(deprecated\)[^*]*\*\/\s*$/;
const ALIAS_MARKER = /\/\*\s*alias \(deprecated\)\s*\*\//;

const VARIABLE_DECLARATION = /^\$([\w-]+)\s*:/;
const MIXIN_DECLARATION = /^@mixin\s+([\w-]+)/;

/**
 * The line a top-level declaration starting at `start` ends on: the first line carrying a `;` once
 * every parenthesis opened since the start has closed.
 *
 * The paren tracking is what keeps multi-line map and colour declarations honest. A deprecated
 * `$pds-theme-*` colour spans five lines with its marker on the closing `);` line, while
 * `$pds-breakpoints` — internal plumbing — spans eight lines whose *interior* carries markers for its
 * deprecated keys but whose terminator carries none. Only inspecting the terminator tells those two
 * apart.
 */
const declarationEnd = (lines: string[], start: number): number => {
  let depth = 0;
  for (let i = start; i < lines.length; i++) {
    for (const char of lines[i] ?? '') {
      if (char === '(') {
        depth++;
      } else if (char === ')') {
        depth--;
      }
    }
    if ((lines[i] ?? '').includes(';') && depth <= 0) {
      return i;
    }
  }
  return -1;
};

const entry = (identifier: string, isAlias: boolean): DeprecationEntry => ({
  id: `styleAlias/scss/${identifier}`,
  kind: 'styleAlias',
  source: 'scss',
  identifier,
  message: isAlias
    ? 'Deprecated alias kept so existing stylesheets keep compiling. Will be removed with the next major release.'
    : 'Deprecated. Will be removed with the next major release; it has no modern equivalent.',
  reference: 'references/styles/scss.md',
});

export const collectScssDeprecations = (): DeprecationSource => {
  const dist = path.join(scssRoot(), 'dist');
  const entries: DeprecationEntry[] = [];

  for (const file of fs.readdirSync(dist).sort()) {
    if (!file.endsWith('.scss') || file === '_index.scss') {
      continue;
    }
    const lines = fs.readFileSync(path.join(dist, file), 'utf-8').split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? '';

      const mixin = line.match(MIXIN_DECLARATION);
      if (mixin) {
        if (i > 0 && MARKER_LINE.test(lines[i - 1] ?? '')) {
          entries.push(entry(`${mixin[1]}()`, ALIAS_MARKER.test(lines[i - 1] ?? '')));
        }
        continue;
      }

      const variable = line.match(VARIABLE_DECLARATION);
      if (!variable) {
        continue;
      }
      const end = declarationEnd(lines, i);
      const terminator = end === -1 ? '' : (lines[end] ?? '');
      if (MARKER.test(terminator)) {
        entries.push(entry(`$${variable[1]}`, ALIAS_MARKER.test(terminator)));
      }
    }
  }

  entries.sort((a, b) => a.identifier.localeCompare(b.identifier));

  return {
    category: 'scss',
    origin: 'the shipped SCSS partials (`@porsche-design-system/components-{js|angular|react|vue}/scss`)',
    entries,
  };
};
