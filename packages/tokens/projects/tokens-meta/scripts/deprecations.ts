import { type Deprecation, getDeprecationComment } from '@porsche-design-system/shared/deprecation';
import type ts from 'typescript';

/**
 * Recovers the deprecation marker a token's `@deprecated` annotation carries.
 *
 * This is the extraction the Emotion and vanilla-extract packages run, over token declarations
 * instead of legacy exports: their `src/` is likewise hand-written TypeScript that is itself the
 * shipped library, so the annotation — the thing a consumer's IDE shows — is the single source. It
 * is copied rather than shared, so each package reads its own sources on its own; what must not
 * drift is the wording, and that is the shared `getDeprecationComment` all three validate against.
 *
 * `scripts/tokensMeta.ts` owns everything else: which declarations exist, how they are grouped and
 * ordered, and what the generated catalogs look like.
 */

/** The comment text without its `/** … *\/` wrapper and `@deprecated` tag, as the checker reports it. */
const comment = (rendered: string): string => rendered.replace(/^\/\*\* @deprecated | \*\/$/g, '');

/**
 * The marker an annotation carries, validated against the wording the shared contract generates.
 *
 * The replacement is the `{@link otherToken}` reference, taken as its own part of the annotation and
 * never as a phrase recovered from the sentence around it. Both part kinds count: the checker reports
 * a link it resolved in the file's scope as `linkName` and any other as `linkText`, and a token names
 * its replacement across files, where nothing is in scope — so the name is checked against
 * `documented` rather than through resolution.
 *
 * The rest of the annotation must be exactly what `getDeprecationComment` would render for that
 * marker, optionally followed by extra guidance which becomes the `note`.
 */
export const deprecationOf = (tag: ts.JSDocTagInfo, name: string, documented: Set<string>): Deprecation => {
  const parts = tag.text ?? [];
  const replacement = parts.find(({ kind }) => kind === 'linkName' || kind === 'linkText')?.text.trim();
  // The checker splits a link into `{@link `, its target and `}`; dropping the delimiters
  // reconstructs the sentence exactly as `getDeprecationComment` renders it.
  const text = parts
    .filter(({ kind }) => kind !== 'link')
    .map(({ text }) => text)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

  if (replacement && !documented.has(replacement)) {
    throw new Error(
      `The @deprecated annotation on \`${name}\` names \`${replacement}\` as its replacement, which is not a ` +
        'documented token. A {@link} target must be a token a consumer can migrate to, so it can be neither ' +
        'unknown nor itself deprecated; guidance that names anything else belongs in the sentence after the ' +
        'lifecycle message.'
    );
  }

  const generated = comment(getDeprecationComment({ replacement }, 'jsdoc'));
  if (!text.startsWith(generated)) {
    throw new Error(
      `The @deprecated annotation on \`${name}\` is not structured.\n` +
        `  expected: ${generated}[ <extra guidance>]\n` +
        `  found:    ${text}`
    );
  }

  const note = text.slice(generated.length).trim();
  return { ...(replacement ? { replacement } : {}), ...(note ? { note } : {}) };
};
