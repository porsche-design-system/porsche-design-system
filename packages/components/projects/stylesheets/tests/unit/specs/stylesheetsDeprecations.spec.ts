import { getDeprecationComment } from '@porsche-design-system/shared/deprecation';
import { describe, expect, it } from 'vitest';
import { stylesheetIdentifier } from '../../../src/deprecation';
import { flattenCssVariables, renderCssNode, stripDeprecated } from '../../../src/helpers';
import { stylesheetsDeprecations, stylesheetsMeta } from '../../../src/meta';
import { cssVariableTokens } from '../../../src/theme';
import type { ColorSchemeClassMeta, CssVariableMeta } from '../../../src/types';
import { colorScheme } from '../../../src/utilities/color-scheme';

/**
 * The package half of the deprecation contract: `cssVariableTokens` + `colorScheme` are the catalog,
 * `stylesheetsMeta` and `stylesheetsDeprecations` are its two projections, and a declaration belongs
 * to exactly one of them.
 *
 * The catalog is empty of deprecations today, which is what the first block asserts. An empty
 * catalog cannot prove the mechanism works, so the second block drives it from fixtures — that is
 * what keeps the contract honest until the first real deprecation is authored.
 */

const allVariables = flattenCssVariables(cssVariableTokens);

describe('the current release', () => {
  it('publishes an explicitly empty deprecated surface', () => {
    expect(stylesheetsDeprecations).toStrictEqual([]);
  });

  it('carries no deprecation marker on any catalog declaration', () => {
    const marked = [...allVariables, ...colorScheme].filter((node) => 'deprecation' in node);
    expect(marked.map(stylesheetIdentifier)).toStrictEqual([]);
  });

  it('documents every catalog declaration, so nothing is silently unpublished', () => {
    const { colorScheme: documentedClasses, ...documentedTokens } = stylesheetsMeta;
    expect([...flattenCssVariables(documentedTokens), ...documentedClasses].map(stylesheetIdentifier)).toStrictEqual(
      [...allVariables, ...colorScheme].map(stylesheetIdentifier)
    );
  });

  it('spells every identity uniquely across the whole catalog', () => {
    const identifiers = [...allVariables, ...colorScheme].map(stylesheetIdentifier);
    expect(new Set(identifiers).size).toBe(identifiers.length);
  });
});

describe('the deprecation mechanism', () => {
  const deprecatedVariable = {
    type: 'blur',
    property: '--p-blur-legacy',
    description: 'A legacy blur.',
    value: '8px',
    deprecation: { replacement: '--p-blur-frosted' },
  } satisfies CssVariableMeta;

  const currentVariable = {
    type: 'blur',
    property: '--p-blur-frosted',
    description: 'The frosted blur.',
    value: '32px',
  } satisfies CssVariableMeta;

  const deprecatedClass = {
    selector: '.scheme-legacy',
    declarations: [{ property: 'color-scheme', value: 'normal' }],
    usage: 'Set class="scheme-legacy".',
    description: 'A legacy color scheme.',
    deprecation: { note: 'The browser default applies anyway.' },
  } satisfies ColorSchemeClassMeta;

  it('spells a variable by its custom property and a class by its selector', () => {
    expect(stylesheetIdentifier(deprecatedVariable)).toBe('--p-blur-legacy');
    expect(stylesheetIdentifier(deprecatedClass)).toBe('.scheme-legacy');
  });

  it('strips a deprecated variable from the documented tree while keeping leaf identity', () => {
    const stripped = stripDeprecated({ blur: { legacy: deprecatedVariable, frosted: currentVariable } });
    expect(Object.keys(stripped.blur)).toStrictEqual(['frosted']);
    expect(stripped.blur.frosted).toBe(currentVariable);
  });

  it('renders a deprecated variable with the shared comment above its declaration', () => {
    expect(renderCssNode(deprecatedVariable)).toBe(
      '/* @deprecated Use --p-blur-frosted instead. This API will be removed with the next major release. */\n' +
        '--p-blur-legacy: 8px;'
    );
  });

  it('renders a deprecation without a replacement, appending the note instead', () => {
    expect(renderCssNode(deprecatedClass)).toBe(
      '/* @deprecated This API will be removed with the next major release. The browser default applies anyway. */\n' +
        '.scheme-legacy {\ncolor-scheme: normal;\n}'
    );
  });

  it('generates the comment through the shared contract rather than restating the wording', () => {
    expect(renderCssNode(deprecatedVariable)).toContain(getDeprecationComment(deprecatedVariable.deprecation, 'block'));
  });

  it('leaves the rendering of a current declaration untouched', () => {
    expect(renderCssNode(currentVariable)).toBe('--p-blur-frosted: 32px;');
  });
});
