import { expect, it } from 'vitest';
import { cssVariablesMeta, flattenCssVariables, legacyRadiusMeta, ref } from '../../../src';
import * as cssVariables from '../../../src/generated/cssVariables';

// Derives the const name from a CSS custom property, mirroring the generator
// (`scripts/buildCssVariableConstants.ts`), e.g. `--p-spacing-fluid-2xl` -> `spacingFluid2Xl`.
const toConstName = (property: string): string =>
  property
    .replace(/^--_?p-/, '')
    .split('-')
    .map((segment, index) => {
      const cased = index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1);
      return cased.replace(/^(\d+)([a-z])/, (_, digits, letter) => digits + letter.toUpperCase());
    })
    .join('');

const allLeaves = [...flattenCssVariables(cssVariablesMeta), ...legacyRadiusMeta];

it.each(allLeaves.map((leaf) => [toConstName(leaf.property), leaf.property] as const))(
  'should expose a tree-shakeable name const `%s` equal to its property `%s`',
  (constName, property) => {
    expect((cssVariables as Record<string, string>)[constName]).toBe(property);
  }
);

it('should reference the name consts from the meta `property` fields (single source of truth)', () => {
  for (const leaf of flattenCssVariables(cssVariablesMeta)) {
    expect((cssVariables as Record<string, string>)[toConstName(leaf.property)]).toBe(leaf.property);
  }
});

it('every name const should be a bare custom property (not yet wrapped in `var()`)', () => {
  for (const [name, value] of Object.entries(cssVariables)) {
    if (name === 'ref') {
      continue;
    }
    expect(value, `${name} must be a bare --custom-property`).toMatch(/^--/);
  }
});

it('`ref()` should wrap a name const into a `var()` reference', () => {
  expect(ref(cssVariables.colorCanvas)).toBe('var(--p-color-canvas)');
});

it('`ref()` should support an optional fallback', () => {
  expect(ref(cssVariables.colorCanvas, '#fff')).toBe('var(--p-color-canvas, #fff)');
  expect(ref(cssVariables.spacingFluidMd, 0)).toBe('var(--p-spacing-fluid-md, 0)');
});



