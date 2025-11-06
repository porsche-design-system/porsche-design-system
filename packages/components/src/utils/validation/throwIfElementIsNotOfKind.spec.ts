import { vi } from 'vitest';
import * as paramCaseToCamelCaseUtils from '../paramCaseToCamelCase';
import type { PrefixedTagNames } from '../tag-name';
import * as getPrefixedTagNamesUtils from '../tag-name';
import { throwIfElementIsNotOfKind } from './throwIfElementIsNotOfKind';

const host = document.createElement('div');
const link = document.createElement('p-link');
const option = document.createElement('p-multi-select-option');

it('should call getPrefixedTagNames() with correct parameters', () => {
  const spy = vi.spyOn(getPrefixedTagNamesUtils, 'getPrefixedTagNames');
  throwIfElementIsNotOfKind(host, link, 'p-link');

  expect(spy).toHaveBeenCalledWith(host);
});

it('should call paramCaseToCamelCase() with correct parameters', () => {
  const spy = vi.spyOn(paramCaseToCamelCaseUtils, 'paramCaseToCamelCase');
  throwIfElementIsNotOfKind(host, link, 'p-link');

  expect(spy).toHaveBeenCalledWith('p-link');
});

it('should call paramCaseToCamelCase() for each tagName with correct parameters', () => {
  const spy = vi.spyOn(paramCaseToCamelCaseUtils, 'paramCaseToCamelCase');
  throwIfElementIsNotOfKind(host, option, ['p-multi-select-option', 'p-optgroup']);

  expect(spy).toHaveBeenNthCalledWith(1, 'p-multi-select-option');
  expect(spy).toHaveBeenNthCalledWith(2, 'p-optgroup');
});

it('should call getTagName() with correct parameters', () => {
  const spy = vi.spyOn(getPrefixedTagNamesUtils, 'getTagName');
  throwIfElementIsNotOfKind(host, link, 'p-link');

  expect(spy).toHaveBeenCalledWith(link);
});

it('should throw error if return value of getPrefixedTagNames() !== getTagName()', () => {
  const prefixedTagNameMock = { pLink: 'p-link' } as PrefixedTagNames;
  vi.spyOn(getPrefixedTagNamesUtils, 'getPrefixedTagNames').mockReturnValue(prefixedTagNameMock);
  const slot = document.createElement('a');

  expect(() => throwIfElementIsNotOfKind(host, slot, 'p-link')).toThrowErrorMatchingInlineSnapshot(
    `[Error: [Porsche Design System] child a of div has to be a p-link.]`
  );
});

it('should throw error if tagName is not included in prefixedTagNames', () => {
  const prefixedTagNameMock = {
    pMultiSelectOption: 'p-multi-select-option',
    pOptgroup: 'p-optgroup',
  } as PrefixedTagNames;
  vi.spyOn(getPrefixedTagNamesUtils, 'getPrefixedTagNames').mockReturnValue(prefixedTagNameMock);
  const testElement = document.createElement('a');

  expect(() =>
    throwIfElementIsNotOfKind(host, testElement, ['p-multi-select-option', 'p-optgroup'])
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: [Porsche Design System] child a of div has to be a p-multi-select-option | p-optgroup.]`
  );
});

it('should not throw error if slot is of kind', () => {
  expect(() => throwIfElementIsNotOfKind(host, link, 'p-link')).not.toThrow();
});

it('should not throw error if child is one of kinds', () => {
  expect(() => throwIfElementIsNotOfKind(host, option, ['p-multi-select-option', 'p-optgroup'])).not.toThrow();
});

it('should not throw error if prefixed slot is of kind', () => {
  const prefixedHost = document.createElement('prefixed-p-link-tile-model-signature');
  const prefixedLink = document.createElement('prefixed-p-link');
  expect(() => throwIfElementIsNotOfKind(prefixedHost, prefixedLink, 'p-link')).not.toThrow();
});

it('should not throw error if prefixed child is one of kinds', () => {
  const prefixedHost = document.createElement('prefixed-p-select');
  const prefixedLink = document.createElement('prefixed-p-optgroup');
  expect(() =>
    throwIfElementIsNotOfKind(prefixedHost, prefixedLink, ['p-multi-select-option', 'p-optgroup'])
  ).not.toThrow();
});
