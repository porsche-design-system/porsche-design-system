import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
// Imported from the module, not the barrel: the barrel re-exports the catalog generated from here.
import { vanillaExtractMeta } from '../vanillaExtractMeta/meta';
import type { DeprecatedVanillaExtractNode, VanillaExtractDeprecationsMeta } from '../vanillaExtractMeta/types';

/**
 * Builds `vanillaExtractDeprecationsMeta` from the `@deprecated` annotations the legacy exports
 * already carry, so nothing restates them. It runs at build time and ships its result as static
 * data: neither the TypeScript compiler nor reads of `src` belong in a meta consumer's build graph.
 *
 * Names come from the type checker, so the shared internals the `deprecated` directories also hold
 * (`_displayFontPartA`, `displayShared`) cannot be reported to a project.
 */

const SRC = path.join(__dirname, '..', 'src');

/** Domain keys in `vanillaExtractMeta` order — the order the generated catalog keeps. */
const DOMAINS = Object.keys(vanillaExtractMeta) as (keyof VanillaExtractDeprecationsMeta)[];

const barrelOf = (domain: string): string => path.join(SRC, domain, 'deprecated', 'index.ts');

/** Read from `src`, so a barrel under a domain `vanillaExtractMeta` lacks fails the build instead of going unindexed. */
const deprecatedDomains = (): (keyof VanillaExtractDeprecationsMeta)[] => {
  const domains = fs.readdirSync(SRC).filter((domain) => fs.existsSync(barrelOf(domain)));
  const unknown = domains.filter((domain) => !DOMAINS.includes(domain as keyof VanillaExtractDeprecationsMeta));

  if (unknown.length) {
    throw new Error(`No vanillaExtractMeta domain for src/{${unknown.join(',')}}/deprecated`);
  }
  return domains as (keyof VanillaExtractDeprecationsMeta)[];
};

/** A barrel's deprecated exports, in barrel order, with the annotation text verbatim. */
const nodesOf = (source: ts.SourceFile | undefined, checker: ts.TypeChecker): DeprecatedVanillaExtractNode[] => {
  const moduleSymbol = source && checker.getSymbolAtLocation(source);

  return (moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : []).flatMap((symbol) => {
    // A barrel exports aliases; the annotation sits on the declaration they point at.
    const declaration = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
    const tag = declaration.getJsDocTags(checker).find(({ name }) => name === 'deprecated');

    return tag ? [{ name: symbol.getName(), deprecation: { message: ts.displayPartsToString(tag.text).trim() } }] : [];
  });
};

export const buildVanillaExtractDeprecationsMeta = (): VanillaExtractDeprecationsMeta => {
  const domains = deprecatedDomains();
  const program = ts.createProgram(domains.map(barrelOf), {});
  const checker = program.getTypeChecker();
  const nodes = new Map(domains.map((domain) => [domain, nodesOf(program.getSourceFile(barrelOf(domain)), checker)]));

  return Object.fromEntries(
    DOMAINS.map((domain) => [domain, nodes.get(domain) ?? []])
  ) as VanillaExtractDeprecationsMeta;
};

/** The generated module source; `scripts/build.ts` formats and writes it. */
export const renderVanillaExtractDeprecationsMeta = (meta: VanillaExtractDeprecationsMeta): string =>
  `// GENERATED FILE — do not edit. Built by \`scripts/deprecations.ts\` from the \`@deprecated\`
// annotations on the exports of \`src/<domain>/deprecated\`, the single source of this wording.
import type { VanillaExtractDeprecationsMeta } from './types';

/**
 * The deprecated public surface: every legacy export that still ships, keyed by the same root
 * domains as \`vanillaExtractMeta\`. An export lives in exactly one of the two catalogs, so the
 * documented one stays free of legacy noise while the audit index keeps a complete list.
 */
export const vanillaExtractDeprecationsMeta = {
${Object.entries(meta)
  .map(([domain, nodes]) => `${domain}: [${nodes.map((node) => JSON.stringify(node)).join(',')}],`)
  .join('\n')}
} satisfies VanillaExtractDeprecationsMeta;
`;
