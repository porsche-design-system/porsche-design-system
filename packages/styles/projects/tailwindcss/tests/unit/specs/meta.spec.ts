import { getDeprecationComment, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { describe, expect, it } from 'vitest';
import { tailwindDeprecations, tailwindMeta } from '../../../src';
import { tailwindCssMeta } from '../../../src/css';
import { flatten, renderNode } from '../../../src/css/render';
import { tailwindIdentifier } from '../../../src/deprecation';
import type { CssNode, TailwindCatalog, TailwindThemeVariable, TailwindUtility } from '../../../src/types';

/**
 * The invariants that make the catalog trustworthy as *the* source of the Tailwind surface — the
 * generated `index.css`, the docs and the knowledge skill's audit index are all built from it, with
 * nothing downstream parsing CSS to recover what is deprecated.
 */

/** Every declaration the composed stylesheet contains, descending into rules. */
const composedDeclarations = (nodes: CssNode[]): CssNode[] =>
  nodes.flatMap((node) =>
    'declarations' in node && node.declarations ? composedDeclarations(node.declarations) : [node]
  );

const composed = composedDeclarations(tailwindCssMeta.meta);
const declarations = composed.filter((node): node is TailwindThemeVariable | TailwindUtility => 'description' in node);
const documented = flatten(tailwindMeta as TailwindCatalog) as (TailwindThemeVariable | TailwindUtility)[];
const deprecated = declarations.filter(isDeprecated);

/**
 * The CSS-only plumbing the composition layer contributes itself: namespace resets, retained base
 * colors, global defaults and the skeleton animation. None is an independently supported consumer
 * API, so none belongs to the catalog. Two families are matched by pattern rather than listed: the
 * `--_*`-prefixed per-scheme fallback assignments (the package's own private-name convention) and
 * the Tailwind-required `--*--line-height` companions of each documented text size.
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

describe('tailwindMeta', () => {
  it('carries no deprecated declaration', () => {
    expect(documented.filter(isDeprecated)).toStrictEqual([]);
  });

  it('describes every documented declaration', () => {
    expect(documented.filter((node) => !node.description.trim())).toStrictEqual([]);
  });

  it('lists exactly the documented identifiers', () => {
    expect(documented.map(tailwindIdentifier)).toMatchSnapshot();
  });
});

describe('tailwindDeprecations', () => {
  it('lists exactly the deprecated identifiers', () => {
    expect(tailwindDeprecations.map(({ identifier }) => identifier)).toMatchSnapshot();
  });

  it('publishes every deprecated declaration exactly once, spelled canonically', () => {
    expect(tailwindDeprecations.map(({ identifier }) => identifier).sort()).toStrictEqual(
      deprecated.map(tailwindIdentifier).sort()
    );
  });

  it('carries each marker through untouched', () => {
    const markers = new Map(deprecated.map((node) => [tailwindIdentifier(node), node.deprecation]));
    const rebuilt = tailwindDeprecations.filter(
      ({ identifier, deprecation }) => markers.get(identifier) !== deprecation
    );
    expect(rebuilt).toStrictEqual([]);
  });

  it('points every replacement at a documented identifier other than its own', () => {
    const canonical = new Set(documented.map(tailwindIdentifier));
    const invalid = tailwindDeprecations.filter(
      ({ identifier, deprecation }) =>
        deprecation.replacement !== undefined &&
        (deprecation.replacement === identifier || !canonical.has(deprecation.replacement))
    );
    expect(invalid).toStrictEqual([]);
  });
});

describe('tailwind css composition', () => {
  it('spells every generated declaration uniquely', () => {
    const identifiers = declarations.map(tailwindIdentifier);
    expect(identifiers.length).toBe(new Set(identifiers).size);
  });

  it('renders every catalog declaration exactly once', () => {
    expect(declarations.length).toBe(documented.length + deprecated.length);
  });

  it('limits the remaining generated properties to CSS-only plumbing', () => {
    const unsourced = composed
      .filter((node): node is CssNode & { property: string } => 'property' in node && !('description' in node))
      .map((node) => node.property)
      .filter((property) => !isPlumbing(property));
    expect(unsourced).toStrictEqual([]);
  });

  it('precedes every deprecated declaration with its generated @deprecated comment', () => {
    for (const node of deprecated) {
      expect(renderNode(node)).toContain(`${getDeprecationComment(node.deprecation, 'block')}\n`);
    }
  });
});
