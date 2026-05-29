import { expect, it } from 'vitest';
import {
  flattenColorVariables,
  flattenCssVariables,
  globalStylesCss,
  globalStylesMeta,
  renderCss,
  renderCssNode,
} from '../../../src';

const allCssVariables = flattenCssVariables(globalStylesMeta.cssVariables);

it('should match snapshot', () => {
  expect(globalStylesMeta).toMatchSnapshot();
});

it('should contain all expected top-level categories', () => {
  expect(Object.keys(globalStylesMeta)).toEqual([
    'cssVariables',
    'cssVariableLangOverrides',
    'colorSchemeClasses',
    'legacyRadius',
    'stylesheets',
  ]);
});

it('every css variable leaf should have name, property, description and value', () => {
  for (const leaf of allCssVariables) {
    expect(leaf.name, 'missing name').toBeTruthy();
    expect(leaf.property, `${leaf.name}: missing property`).toMatch(/^--/);
    expect(leaf.description, `${leaf.name}: missing description`).toBeTruthy();
    expect(leaf.value, `${leaf.name}: missing value`).toBeTruthy();
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
  for (const leaf of flattenColorVariables(globalStylesMeta.cssVariables)) {
    expect(leaf.valueLight, `${leaf.property}: missing valueLight`).toBeTruthy();
    expect(leaf.valueDark, `${leaf.property}: missing valueDark`).toBeTruthy();
  }
});

it('should expose the resolved css for every generated stylesheet', () => {
  expect(Object.keys(globalStylesCss)).toEqual([
    'variables.css',
    'color-scheme.css',
    'normalize.css',
    'legacy-radius.css',
  ]);
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
  for (const [file, nodes] of Object.entries(globalStylesCss)) {
    expect(renderCss(nodes), file).toMatchSnapshot();
  }
});
