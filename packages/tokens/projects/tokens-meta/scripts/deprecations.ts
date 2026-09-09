import { type Deprecation, getDeprecationComment } from '@porsche-design-system/shared/deprecation';
import type ts from 'typescript';

/**
 * Extracts structured markers from token `@deprecated` annotations and validates their shared
 * wording.
 */

const comment = (rendered: string): string => rendered.replace(/^\/\*\* @deprecated | \*\/$/g, '');

/**
 * Extracts replacement links without relying on checker scope and treats additional text as the
 * migration note.
 */
export const deprecationOf = (tag: ts.JSDocTagInfo, name: string, documented: Set<string>): Deprecation => {
  const parts = tag.text ?? [];
  const replacement = parts.find(({ kind }) => kind === 'linkName' || kind === 'linkText')?.text.trim();
  // The checker separates link delimiters from their target.
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
