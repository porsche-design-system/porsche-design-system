import fs from 'node:fs';
import path from 'node:path';
import { type Deprecation, type Deprecations, getDeprecationComment } from '@porsche-design-system/shared/deprecation';
import ts from 'typescript';
// Avoid the barrel, which re-exports the generated list.
import { emotionMeta } from '../emotionMeta/meta';

/**
 * Builds static deprecation metadata from exported `@deprecated` annotations. Type-checker exports
 * exclude shared internals from the public list.
 */

const SRC = path.join(__dirname, '..', 'src');

/** Domain keys in `emotionMeta` order — the order the generated list keeps. */
const DOMAINS = Object.keys(emotionMeta) as (keyof typeof emotionMeta)[];

const barrelOf = (domain: string): string => path.join(SRC, domain, 'deprecated', 'index.ts');

/** Discovers source domains so missing metadata fails instead of silently omitting deprecations. */
const deprecatedDomains = (): (keyof typeof emotionMeta)[] => {
  const domains = fs.readdirSync(SRC).filter((domain) => fs.existsSync(barrelOf(domain)));
  const unknown = domains.filter((domain) => !DOMAINS.includes(domain as keyof typeof emotionMeta));

  if (unknown.length) {
    throw new Error(`No emotionMeta domain for src/{${unknown.join(',')}}/deprecated`);
  }
  return domains as (keyof typeof emotionMeta)[];
};

/**
 * Extracts replacement links and validates the remaining annotation against the shared deprecation
 * wording. Additional text becomes the migration note.
 */
const deprecationOf = (tag: ts.JSDocTagInfo, name: string, exported: Set<string>): Deprecation => {
  const parts = tag.text ?? [];
  const replacement = parts.find(({ kind }) => kind === 'linkName' || kind === 'linkText')?.text.trim();
  // The checker separates link delimiters from their target.
  const text = parts
    .filter(({ kind }) => kind !== 'link')
    .map(({ text }) => text)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

  if (replacement && !exported.has(replacement)) {
    throw new Error(
      `The @deprecated annotation on \`${name}\` names \`${replacement}\` as its replacement, which this package ` +
        'does not export. A {@link} target must be something a consumer can import; guidance that names anything ' +
        'else belongs in the sentence after the lifecycle message.'
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

const comment = (rendered: string): string => rendered.replace(/^\/\*\* @deprecated | \*\/$/g, '');

const entriesOf = (source: ts.SourceFile | undefined, checker: ts.TypeChecker, exported: Set<string>): Deprecations => {
  const moduleSymbol = source && checker.getSymbolAtLocation(source);

  return (moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : []).flatMap((symbol) => {
    // A barrel exports aliases; the annotation sits on the declaration they point at.
    const declaration = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
    const tag = declaration.getJsDocTags(checker).find(({ name }) => name === 'deprecated');
    const name = symbol.getName();

    return tag ? [{ usageKind: 'jsExport', identifier: name, deprecation: deprecationOf(tag, name, exported) }] : [];
  });
};

const publicExports = (program: ts.Program, checker: ts.TypeChecker): Set<string> => {
  const source = program.getSourceFile(path.join(SRC, 'index.ts'));
  const moduleSymbol = source && checker.getSymbolAtLocation(source);
  return new Set((moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : []).map((symbol) => symbol.getName()));
};

export const buildEmotionDeprecations = (): Deprecations => {
  const domains = deprecatedDomains();
  const program = ts.createProgram([...domains.map(barrelOf), path.join(SRC, 'index.ts')], {});
  const checker = program.getTypeChecker();
  const exported = publicExports(program, checker);
  const entries = new Map(
    domains.map((domain) => [domain, entriesOf(program.getSourceFile(barrelOf(domain)), checker, exported)])
  );

  return DOMAINS.flatMap((domain) => entries.get(domain) ?? []);
};

export const renderEmotionDeprecations = (deprecations: Deprecations): string =>
  `// GENERATED FILE — do not edit. Built by \`scripts/deprecations.ts\` from the \`@deprecated\`
// annotations on the exports of \`src/<domain>/deprecated\`, the single source of this wording.
import type { Deprecations } from '@porsche-design-system/shared/deprecation';

/** Deprecated exports in \`emotionMeta\` domain and barrel order. */
export const emotionDeprecations: Deprecations = [
${deprecations.map((entry) => JSON.stringify(entry)).join(',\n')}
];
`;
