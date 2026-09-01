import { getDeprecationComment, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { describe, expect, it } from 'vitest';
import { scssDeprecations, scssMeta } from '../../../src';
import { scssIdentifier } from '../../../src/deprecation';
import { renderScssFile, scssFileMeta } from '../../../src/scss';
import { flatten, renderNode } from '../../../src/scss/render';
import type { ScssCatalog, ScssMixin, ScssVariable } from '../../../src/types';

/**
 * The invariants that make the catalog trustworthy as *the* source of the scss surface — the shipped
 * partials, the docs and the knowledge skill's audit index are all generated from it, with nothing
 * downstream parsing scss to recover what is deprecated.
 */

const composed = scssFileMeta.flatMap(({ nodes }) => nodes);
const declarations = composed.filter((node): node is ScssVariable | ScssMixin => 'name' in node);
const documented = flatten(scssMeta as ScssCatalog);
const deprecated = declarations.filter(isDeprecated);

/** Private helpers the documented mixins delegate to: deliberately undocumented, deliberately not deprecated. */
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

describe('scssMeta', () => {
  it('carries no deprecated declaration', () => {
    expect(documented.filter(isDeprecated)).toStrictEqual([]);
  });

  it('lists exactly the documented identifiers', () => {
    expect(documented.map(scssIdentifier)).toMatchSnapshot();
  });
});

describe('scssDeprecations', () => {
  it('lists exactly the deprecated identifiers', () => {
    expect(scssDeprecations.map(({ identifier }) => identifier)).toMatchSnapshot();
  });

  it('publishes every deprecated declaration exactly once, spelled canonically', () => {
    expect(scssDeprecations.map(({ identifier }) => identifier).sort()).toStrictEqual(
      deprecated.map(scssIdentifier).sort()
    );
  });

  it('carries each marker through untouched', () => {
    const markers = new Map(deprecated.map((node) => [scssIdentifier(node), node.deprecation]));
    const rebuilt = scssDeprecations.filter(({ identifier, deprecation }) => markers.get(identifier) !== deprecation);
    expect(rebuilt).toStrictEqual([]);
  });

  it('points every replacement at a documented identifier other than its own', () => {
    const canonical = new Set(documented.map(scssIdentifier));
    const invalid = scssDeprecations.filter(
      ({ identifier, deprecation }) =>
        deprecation.replacement !== undefined &&
        (deprecation.replacement === identifier || !canonical.has(deprecation.replacement))
    );
    expect(invalid).toStrictEqual([]);
  });
});

describe('scss file composition', () => {
  it('spells every generated declaration uniquely', () => {
    const identifiers = declarations.map(scssIdentifier);
    expect(identifiers.length).toBe(new Set(identifiers).size);
  });

  it('renders every catalog declaration exactly once', () => {
    const rendered = declarations.filter((node) => !PLUMBING_MIXINS.includes(node.name));
    expect(rendered.length).toBe(documented.length + deprecated.length);
  });

  it('limits raw composition snippets to internal plumbing declarations', () => {
    const declared = composed
      .filter((node): node is { raw: string } => !('name' in node) && 'raw' in node)
      .flatMap((node) => rawDeclarations(node.raw));
    expect(declared.filter((name) => !INTERNAL_RAW_DECLARATIONS.includes(name))).toStrictEqual([]);
  });

  it('precedes every deprecated declaration with its generated @deprecated comment', () => {
    for (const node of deprecated) {
      expect(renderNode(node)).toContain(`${getDeprecationComment(node.deprecation, 'line')}\n`);
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
