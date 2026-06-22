import { expect, it } from 'vitest';
import { globalStylesMeta } from '../../../src/css';
import {
  colorScheme,
  cssVariableTokens,
  flattenColorVariables,
  flattenCssVariables,
  kindOf,
  renderCss,
  renderCssNode,
  stylesheetsMeta,
} from '../../../src/meta';

const allCssVariables = flattenCssVariables(cssVariableTokens);

it('should match snapshot', () => {
  expect(stylesheetsMeta).toMatchSnapshot();
});

it('should expose the documented catalog domains in a stable order', () => {
  expect(Object.keys(stylesheetsMeta)).toEqual([
    'color',
    'font',
    'spacing',
    'border',
    'blur',
    'shadow',
    'motion',
    'colorScheme',
  ]);
});

it('kindOf should classify a css variable as a token and a color-scheme class as a utility', () => {
  expect(kindOf(stylesheetsMeta.color.background.canvas)).toBe('token');
  expect(kindOf(stylesheetsMeta.colorScheme[0])).toBe('utility');
});

it('should contain all expected generated stylesheets', () => {
  expect(Object.keys(globalStylesMeta)).toEqual(['cssVariables', 'colorScheme', 'normalize']);
});

it('every generated stylesheet entry should expose file, description and meta', () => {
  for (const [key, entry] of Object.entries(globalStylesMeta)) {
    expect(entry.file, `${key}: missing file`).toMatch(/\.css$/);
    expect(entry.description, `${key}: missing description`).toBeTruthy();
    expect(Array.isArray(entry.meta), `${key}: meta must be a CssNode array`).toBe(true);
    expect(entry.meta.length, `${key}: empty meta`).toBeGreaterThan(0);
  }
});

it('should expose granular metas independently of globalStylesMeta', () => {
  expect(cssVariableTokens).toBeTruthy();
  expect(colorScheme.length).toBeGreaterThan(0);
});

it('every css variable leaf should have property, description and value', () => {
  for (const leaf of allCssVariables) {
    expect(leaf.property, 'missing property').toMatch(/^--/);
    expect(leaf.description, `${leaf.property}: missing description`).toBeTruthy();
    expect(leaf.value, `${leaf.property}: missing value`).toBeTruthy();
  }
});

it('every css variable should be unique', () => {
  const properties = allCssVariables.map((leaf) => leaf.property);
  expect(new Set(properties).size).toBe(properties.length);
});

it('no css variable value should be the string "undefined"', () => {
  const bad = allCssVariables.filter((leaf) => `${leaf.value}` === 'undefined');
  expect(bad.map((leaf) => leaf.property)).toHaveLength(0);
});

it('every color variable should provide light and dark values for the polyfill', () => {
  for (const leaf of flattenColorVariables(cssVariableTokens)) {
    expect(leaf.valueLight, `${leaf.property}: missing valueLight`).toBeTruthy();
    expect(leaf.valueDark, `${leaf.property}: missing valueDark`).toBeTruthy();
  }
});

it('renderCssNode should serialize a declaration', () => {
  expect(renderCssNode({ property: '--p-color-canvas', value: '#fff' })).toBe('--p-color-canvas: #fff;');
});

it('renderCssNode should serialize a nested rule with an optional comment', () => {
  expect(
    renderCssNode({
      comment: 'Example',
      selector: ':root',
      declarations: [{ property: 'color-scheme', value: 'light' }],
    })
  ).toBe('/* Example */\n:root {\ncolor-scheme: light;\n}');
});

it('renderCss should serialize the resolution of every generated stylesheet to a snapshot', () => {
  for (const [key, { meta }] of Object.entries(globalStylesMeta)) {
    expect(renderCss(meta), key).toMatchSnapshot();
  }
});
