import { describe, expect, it } from 'vitest';
import {
  isDeprecated,
  scssDeprecationMessage,
  scssDeprecationsMeta,
  scssDeprecationText,
  scssIdentifier,
  scssMeta,
} from '../../../src';
import { renderScssFile, scssFileMeta } from '../../../src/scss';
import { flatten, renderNode } from '../../../src/scss/render';
import type { ScssBranch, ScssDeclaration, ScssNode } from '../../../src/types';

/**
 * The invariants that make the two catalogs trustworthy as *the* source of the SCSS surface — both
 * the shipped partials and the knowledge skill's audit index are generated from them, with nothing
 * downstream parsing SCSS to recover what is deprecated.
 *
 * A failure here means either a declaration escaped both catalogs (it would ship without ever being
 * indexed) or a node was copied rather than moved between them (it would be documented as current and
 * flagged as legacy at the same time).
 */

const currentNodes = flatten(scssMeta as ScssBranch);
const deprecatedNodes = flatten(scssDeprecationsMeta as ScssBranch);

const named = (nodes: ScssNode[]): ScssDeclaration[] => nodes.filter((node): node is ScssDeclaration => 'name' in node);

/**
 * The named nodes the composition layer contributes itself: private helpers the documented mixins
 * delegate to. They are deliberately undocumented and deliberately not deprecated, so they belong to
 * neither catalog.
 */
const PLUMBING_MIXINS = ['cjk-font-family', '-prose-heading', '-prose-text'];

/** Declarations that only exist inside raw composition snippets: lookup maps and the theming mixin. */
const INTERNAL_RAW_DECLARATIONS = [
  '$pds-breakpoints',
  '$pds-focus-offset-map',
  '$pds-focus-border-radius-map',
  'color-scheme()',
];

/** Every top-level declaration a raw snippet introduces, in the same canonical spelling as a catalog node. */
const rawDeclarations = (raw: string): string[] => [
  ...[...raw.matchAll(/^(\$[\w-]+)\s*:/gm)].map(([, name]) => name as string),
  ...[...raw.matchAll(/^@mixin\s+([\w-]+)/gm)].map(([, name]) => `${name}()`),
];

describe('scssDeprecationsMeta', () => {
  it('is exported beside scssMeta', () => {
    expect(scssMeta).toBeDefined();
    expect(scssDeprecationsMeta).toBeDefined();
  });

  it('declares every scssMeta root domain, empty branches included', () => {
    expect(Object.keys(scssDeprecationsMeta)).toStrictEqual(Object.keys(scssMeta));
  });

  it('holds only variables and mixins carrying a deprecation', () => {
    const invalid = deprecatedNodes.filter((node) => !('name' in node) || !isDeprecated(node));
    expect(invalid).toStrictEqual([]);
    expect(deprecatedNodes.length).toBeGreaterThan(0);
  });

  it('spells every identifier uniquely within and across both catalogs', () => {
    const identifiers = named([...currentNodes, ...deprecatedNodes]).map(scssIdentifier);
    expect(identifiers.length).toBe(new Set(identifiers).size);
  });

  it('points every replacement at a canonical identifier other than its own', () => {
    const canonical = new Set(named(currentNodes).map(scssIdentifier));
    const invalid = deprecatedNodes
      .filter(isDeprecated)
      .filter(
        (node) =>
          node.deprecation.replacement !== undefined &&
          (node.deprecation.replacement === scssIdentifier(node) || !canonical.has(node.deprecation.replacement))
      );
    expect(invalid.map((node) => [scssIdentifier(node), node.deprecation.replacement])).toStrictEqual([]);
  });

  it('defaults an authored empty deprecation to the no-replacement lifecycle message', () => {
    const node = { name: '$legacy', value: 0, deprecation: {} } as const;
    expect(scssDeprecationMessage(node)).toBe(
      'This API will be removed with the next major release and has no replacement.'
    );
    expect(scssDeprecationText(node)).toBe(scssDeprecationMessage(node));
  });

  it('prefixes the lifecycle message with a replacement sentence when there is one', () => {
    const node = { name: '$legacy', value: 0, deprecation: { replacement: '$radius-sm' } } as const;
    expect(scssDeprecationText(node)).toBe(
      'Use $radius-sm instead. This API will be removed with the next major release.'
    );
  });

  it('lets an authored message replace the package default', () => {
    const node = { name: '$legacy', value: 0, deprecation: { message: 'Gone already.' } } as const;
    expect(scssDeprecationText(node)).toBe('Gone already.');
  });
});

describe('scssMeta', () => {
  it('carries no deprecated node', () => {
    // Also enforced at the type level — `ScssVariable` / `ScssMixin` have no `deprecation` field, so
    // `satisfies ScssMeta` rejects one. This is the runtime backstop for branches typed as `ScssBranch`.
    expect(currentNodes.filter(isDeprecated)).toStrictEqual([]);
  });

  it('describes every documented leaf', () => {
    const undescribed = named(currentNodes).filter((node) => !node.description?.trim());
    expect(undescribed.map((node) => node.name)).toStrictEqual([]);
  });
});

describe('scss file composition', () => {
  const composed = scssFileMeta.flatMap(({ nodes }) => nodes);

  it('sources every generated variable and mixin from exactly one catalog node', () => {
    const catalog = new Set<ScssNode>([...currentNodes, ...deprecatedNodes]);
    const unsourced = named(composed)
      .filter((node) => !catalog.has(node))
      .map((node) => node.name)
      .filter((name) => !PLUMBING_MIXINS.includes(name));
    expect(unsourced).toStrictEqual([]);
  });

  it('renders every catalog node exactly once, so nothing is indexed without shipping', () => {
    const rendered = named(composed);
    const missing = [...currentNodes, ...deprecatedNodes].filter(
      (node) => rendered.filter((candidate) => candidate === node).length !== 1
    );
    expect(missing.map((node) => ('name' in node ? node.name : node.raw))).toStrictEqual([]);
  });

  it('limits raw composition snippets to internal plumbing declarations', () => {
    const declared = composed
      .filter((node): node is { raw: string } => !('name' in node) && 'raw' in node)
      .flatMap((node) => rawDeclarations(node.raw));
    expect(declared.filter((name) => !INTERNAL_RAW_DECLARATIONS.includes(name))).toStrictEqual([]);
  });

  it('precedes every deprecated declaration with its generated @deprecated comment', () => {
    for (const node of deprecatedNodes.filter(isDeprecated)) {
      expect(renderNode(node)).toContain(`// @deprecated ${scssDeprecationText(node)}\n`);
    }
  });

  it('renders no legacy (deprecated) marker into any partial', () => {
    for (const fileMeta of scssFileMeta) {
      expect(renderScssFile(fileMeta), fileMeta.file).not.toContain('(deprecated)');
    }
  });

  it('keeps every deprecation comment silent, so none reaches a consumer’s compiled CSS', () => {
    // A loud `/* … */` at top level is emitted by Sass into the output of every project that `@use`s
    // the package, whether or not it references a single legacy API.
    for (const fileMeta of scssFileMeta) {
      expect(renderScssFile(fileMeta), fileMeta.file).not.toMatch(/\/\*[^*]*@deprecated/);
    }
  });
});
