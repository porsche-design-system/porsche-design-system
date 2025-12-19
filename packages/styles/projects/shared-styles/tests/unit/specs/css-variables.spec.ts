import { expect, it } from 'vitest';
import {
  cssVariableDefinitionDark,
  cssVariableDefinitionLight,
  cssVariables,
  prefixedCssVariableDefinitionDark,
  prefixedCssVariableDefinitionLight,
} from '../../../src';

it('should match generated css variable definition (theme: light, prefix: "")', () => {
  expect(cssVariableDefinitionLight).toMatchSnapshot();
});

it('should match generated css variable definition (theme: dark, prefix: "")', () => {
  expect(cssVariableDefinitionDark).toMatchSnapshot();
});

it('should match generated css variable definition (theme: light, prefix: "p")', () => {
  expect(prefixedCssVariableDefinitionLight).toMatchSnapshot();
});

it('should match generated css variable definition (theme: dark, prefix: "p")', () => {
  expect(prefixedCssVariableDefinitionDark).toMatchSnapshot();
});

it('should match generated css variable object', () => {
  expect(cssVariables).toMatchSnapshot();
});
