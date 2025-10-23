import { vi } from 'vitest';
import * as getDirectChildHTMLElementUtils from '../dom/getDirectChildHTMLElement';
import { getOnlyChildHTMLElementOrThrow } from './getOnlyChildHTMLElementOrThrow';

it('should call getDirectChildHTMLElement() with correct parameters', () => {
  const spy = vi
    .spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement')
    .mockReturnValue(document.createElement('button'));
  const parent = document.createElement('div');
  const selector = 'a,button';

  getOnlyChildHTMLElementOrThrow(parent, selector);

  expect(spy).toHaveBeenCalledWith(parent, selector);
});

it('should return result of getDirectChildHTMLElement()', () => {
  const parent = document.createElement('div');
  const child = document.createElement('a');
  vi.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement').mockReturnValue(child);

  expect(getOnlyChildHTMLElementOrThrow(parent, 'a')).toBe(child);
});

const errorMessage = '"[Porsche Design System] div has to contain a single direct child of: a"';

it('should throw error if there is a another child before', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('button');
  const child2 = document.createElement('a');
  parent.append(child1, child2);

  expect(() => getOnlyChildHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(errorMessage`[Error: [Porsche Design System] div has to contain a single direct child of: a]`);
});

it('should throw error if there is a another child after', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  const child2 = document.createElement('button');
  parent.append(child1, child2);

  expect(() => getOnlyChildHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(errorMessage`[Error: [Porsche Design System] div has to contain a single direct child of: a]`);
});

it('should throw error if there is no child', () => {
  const parent = document.createElement('div');

  expect(() => getOnlyChildHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(errorMessage`[Error: [Porsche Design System] div has to contain a single direct child of: a]`);
});

it('should throw error if there is a nested child', () => {
  const parent = document.createElement('div');
  const child = document.createElement('span');
  const nestedChild = document.createElement('a');
  child.append(nestedChild);
  parent.append(child);

  expect(() => getOnlyChildHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(errorMessage`[Error: [Porsche Design System] div has to contain a single direct child of: a]`);
});
