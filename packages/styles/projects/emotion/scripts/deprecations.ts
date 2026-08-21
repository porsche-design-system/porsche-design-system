import fs from 'node:fs';
import path from 'node:path';
import { type Deprecation, getDeprecationComment } from '@porsche-design-system/shared/deprecation';
import ts from 'typescript';
// Imported from the module, not the barrel: the barrel re-exports the catalog generated from here.
import { emotionMeta } from '../emotionMeta/meta';
import type { DeprecatedEmotionNode, EmotionDeprecationsMeta } from '../emotionMeta/types';

/**
 * Builds `emotionDeprecationsMeta` from the `@deprecated` annotations the legacy exports already
 * carry, so nothing restates them. It runs at build time and ships its result as static data:
 * neither the TypeScript compiler nor reads of `src` belong in a meta consumer's build graph.
 *
 * Names come from the type checker, so the shared internals the `deprecated` directories also hold
 * (`_displayFontPartA`, `displayShared`) cannot be reported to a project.
 */

const SRC = path.join(__dirname, '..', 'src');

/** Domain keys in `emotionMeta` order — the order the generated catalog keeps. */
const DOMAINS = Object.keys(emotionMeta) as (keyof EmotionDeprecationsMeta)[];

const barrelOf = (domain: string): string => path.join(SRC, domain, 'deprecated', 'index.ts');

/** Read from `src`, so a barrel under a domain `emotionMeta` lacks fails the build instead of going unindexed. */
const deprecatedDomains = (): (keyof EmotionDeprecationsMeta)[] => {
  const domains = fs.readdirSync(SRC).filter((domain) => fs.existsSync(barrelOf(domain)));
  const unknown = domains.filter((domain) => !DOMAINS.includes(domain as keyof EmotionDeprecationsMeta));

  if (unknown.length) {
    throw new Error(`No emotionMeta domain for src/{${unknown.join(',')}}/deprecated`);
  }
  return domains as (keyof EmotionDeprecationsMeta)[];
};

/**
 * The marker an annotation carries, validated against the wording the shared contract generates.
 *
 * The replacement is the `{@link otherExport}` reference, taken as its own part of the annotation and
 * never as a phrase recovered from the sentence around it. Both part kinds count: the checker reports
 * a link it resolved in scope as `linkName` and any other as `linkText`.
 *
 * The rest of the annotation must be exactly what `getDeprecationComment` would render for that
 * marker, optionally followed by extra guidance which becomes the `note`. These annotations are
 * hand-maintained today because `src/` is the shipped library rather than generated output; the
 * comparison is what keeps them identical to every generated source until they are generated too.
 */
const deprecationOf = (tag: ts.JSDocTagInfo, name: string): Deprecation => {
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

/** The comment text without its `/** … *\/` wrapper and `@deprecated` tag, as the checker reports it. */
const comment = (rendered: string): string => rendered.replace(/^\/\*\* @deprecated | \*\/$/g, '');

/** A barrel's deprecated exports, in barrel order, with their validated markers. */
const nodesOf = (source: ts.SourceFile | undefined, checker: ts.TypeChecker): DeprecatedEmotionNode[] => {
  const moduleSymbol = source && checker.getSymbolAtLocation(source);

  return (moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : []).flatMap((symbol) => {
    // A barrel exports aliases; the annotation sits on the declaration they point at.
    const declaration = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
    const tag = declaration.getJsDocTags(checker).find(({ name }) => name === 'deprecated');
    const name = symbol.getName();

    return tag ? [{ name, deprecation: deprecationOf(tag, name) }] : [];
  });
};

export const buildEmotionDeprecationsMeta = (): EmotionDeprecationsMeta => {
  const domains = deprecatedDomains();
  const program = ts.createProgram(domains.map(barrelOf), {});
  const checker = program.getTypeChecker();
  const nodes = new Map(domains.map((domain) => [domain, nodesOf(program.getSourceFile(barrelOf(domain)), checker)]));

  return Object.fromEntries(DOMAINS.map((domain) => [domain, nodes.get(domain) ?? []])) as EmotionDeprecationsMeta;
};

/** The generated module source; `scripts/build.ts` formats and writes it. */
export const renderEmotionDeprecationsMeta = (meta: EmotionDeprecationsMeta): string =>
  `// GENERATED FILE — do not edit. Built by \`scripts/deprecations.ts\` from the \`@deprecated\`
// annotations on the exports of \`src/<domain>/deprecated\`, the single source of this wording.
import type { EmotionDeprecationsMeta } from './types';

/**
 * The deprecated public surface: every legacy export that still ships, keyed by the same root
 * domains as \`emotionMeta\`. An export lives in exactly one of the two catalogs, so the documented
 * one stays free of legacy noise while the knowledge skill's audit index keeps a complete list.
 */
export const emotionDeprecationsMeta = {
${Object.entries(meta)
  .map(([domain, nodes]) => `${domain}: [${nodes.map((node) => JSON.stringify(node)).join(',')}],`)
  .join('\n')}
} satisfies EmotionDeprecationsMeta;
`;
