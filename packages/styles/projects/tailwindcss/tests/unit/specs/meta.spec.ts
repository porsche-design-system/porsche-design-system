import { deprecationMessage, flattenDeprecations, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { describe, expect, it } from 'vitest';
import { tailwindDeprecations, tailwindMeta } from '../../../src';
import { tailwindCssMeta } from '../../../src/css';
import { flatten, renderNode } from '../../../src/css/render';
import { tailwindIdentifier } from '../../../src/deprecation';
import { tailwindDeprecationsMeta } from '../../../src/meta';
import type { CssNode, DeprecatedTailwindNode, TailwindBranch, TailwindNode } from '../../../src/types';

/**
 * The invariants that make the two catalogs trustworthy as *the* source of the Tailwind surface —
 * both the generated `index.css` and the knowledge skill's audit index are built from them, with
 * nothing downstream parsing CSS to recover what is deprecated.
 *
 * A failure here means either a declaration escaped both catalogs (it would ship without ever being
 * indexed) or a node was copied rather than moved between them (it would be documented as current
 * and flagged as legacy at the same time).
 */

const currentNodes = flatten(tailwindMeta as TailwindBranch) as TailwindNode[];
const deprecatedNodes = flattenDeprecations<DeprecatedTailwindNode>(tailwindDeprecationsMeta);

/** Every declaration the composed stylesheet contains, descending into rules. */
const composedDeclarations = (nodes: CssNode[]): CssNode[] =>
  nodes.flatMap((node) =>
    'declarations' in node && node.declarations ? composedDeclarations(node.declarations) : [node]
  );

const composed = composedDeclarations(tailwindCssMeta.meta);

/**
 * The CSS-only plumbing the composition layer contributes itself: namespace resets, retained base
 * colors, global defaults and the skeleton animation. None is an independently supported consumer
 * API, so none belongs to either catalog. Two families are matched by pattern rather than listed:
 * the `--_*`-prefixed per-scheme fallback assignments (the package's own private-name convention)
 * and the Tailwind-required `--*--line-height` companions of each documented text size.
 */
const PLUMBING_PROPERTIES = [
  '--breakpoint-*',
  '--color-*',
  '--radius-*',
  '--shadow-*',
  '--text-*',
  '--color-black',
  '--color-white',
  '--default-outline-width',
  '--default-transition-timing-function',
  '--default-transition-duration',
  '--animate-skeleton',
  '--text-base',
];

/** Whether a generated property is CSS-only plumbing rather than a supported consumer API. */
const isPlumbing = (property: string): boolean =>
  PLUMBING_PROPERTIES.includes(property) || property.startsWith('--_') || property.endsWith('--line-height');

describe('tailwindDeprecationsMeta', () => {
  it('is exported beside tailwindMeta', () => {
    expect(tailwindMeta).toBeDefined();
    expect(tailwindDeprecationsMeta).toBeDefined();
  });

  it('declares every tailwindMeta root domain, empty branches included', () => {
    expect(Object.keys(tailwindDeprecationsMeta)).toStrictEqual(Object.keys(tailwindMeta));
  });

  it('holds only nodes carrying a deprecation and a public identity', () => {
    const invalid = deprecatedNodes.filter((node) => !isDeprecated(node) || !tailwindIdentifier(node));
    expect(invalid).toStrictEqual([]);
    expect(deprecatedNodes.length).toBeGreaterThan(0);
  });

  it('spells every identifier uniquely within and across both catalogs', () => {
    const identifiers = [...currentNodes.map(tailwindIdentifier), ...tailwindDeprecations.map((d) => d.identifier)];
    expect(identifiers.length).toBe(new Set(identifiers).size);
  });

  it('points every replacement at a canonical identifier other than its own', () => {
    const canonical = new Set(currentNodes.map(tailwindIdentifier));
    const invalid = tailwindDeprecations.filter(
      ({ identifier, deprecation }) =>
        deprecation.replacement !== undefined &&
        (deprecation.replacement === identifier || !canonical.has(deprecation.replacement))
    );
    expect(invalid).toStrictEqual([]);
  });
});

describe('tailwindDeprecations', () => {
  it('publishes every catalog node once, in catalog order, spelled canonically', () => {
    expect(tailwindDeprecations.map((d) => d.identifier)).toStrictEqual(deprecatedNodes.map(tailwindIdentifier));
  });

  it('carries each node’s marker through untouched', () => {
    expect(tailwindDeprecations.map((d) => d.deprecation)).toStrictEqual(deprecatedNodes.map((n) => n.deprecation));
  });
});

describe('tailwindMeta', () => {
  it('carries no deprecated node', () => {
    // Also enforced at the type level — the current leaf types have no `deprecation` field, so
    // `satisfies TailwindMeta` rejects one. This is the runtime backstop for `TailwindBranch` walks.
    expect(currentNodes.filter(isDeprecated)).toStrictEqual([]);
  });

  it('describes every documented leaf', () => {
    const undescribed = currentNodes.filter((node) => !node.description?.trim());
    expect(undescribed.map(tailwindIdentifier)).toStrictEqual([]);
  });
});

describe('tailwind css composition', () => {
  it('sources every generated public declaration from exactly one catalog node', () => {
    const catalog = new Set<unknown>([...currentNodes, ...deprecatedNodes]);
    const unsourced = composed
      .filter((node) => !catalog.has(node))
      .filter((node): node is CssNode & { property: string } => 'property' in node)
      .map((node) => node.property)
      .filter((property) => !isPlumbing(property));
    expect(unsourced).toStrictEqual([]);
  });

  it('renders every catalog node exactly once, so nothing is indexed without shipping', () => {
    const missing = [...currentNodes, ...deprecatedNodes].filter(
      (node) => composed.filter((candidate) => (candidate as unknown) === node).length !== 1
    );
    expect(missing.map(tailwindIdentifier)).toStrictEqual([]);
  });

  it('marks every deprecated declaration in the generated CSS', () => {
    for (const node of deprecatedNodes) {
      expect(renderNode(node)).toContain('/* alias (deprecated) */\n');
    }
  });

  it('keeps the generated marker terse, since CSS has no silent comment', () => {
    // Every byte of a comment in `index.css` reaches every consumer, so the replacement and
    // lifecycle guidance stays in the catalog rather than being expanded into the stylesheet.
    for (const node of deprecatedNodes) {
      const rendered = renderNode(node);
      expect(rendered).not.toContain(deprecationMessage(node));
      expect(rendered).not.toContain('@deprecated');
    }
  });
});
