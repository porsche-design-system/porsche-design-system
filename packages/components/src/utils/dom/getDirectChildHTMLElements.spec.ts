import { vi } from 'vitest';
import { getDirectChildHTMLElements } from './getDirectChildHTMLElements';
import * as getHTMLElementsUtils from './getHTMLElements';
import * as transformSelectorToDirectChildSelectorUtils from './transformSelectorToDirectChildSelector';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

it('should call getHTMLElements() with element and result of transformSelectorToDirectChildSelector()', () => {
  const transformSelectorToDirectChildSelectorSpy = vi.spyOn(
    transformSelectorToDirectChildSelectorUtils,
    'transformSelectorToDirectChildSelector'
  );
  const getHTMLElementsSpy = vi.spyOn(getHTMLElementsUtils, 'getHTMLElements');
  const parent = document.createElement('div');
  const selector = 'span,a';

  getDirectChildHTMLElements(parent, selector);

  expect(transformSelectorToDirectChildSelectorSpy).toHaveBeenCalledWith(selector);
  expect(getHTMLElementsSpy).toHaveBeenCalledTimes(2);
  expect(getHTMLElementsSpy).toHaveBeenNthCalledWith(1, parent, transformSelectorToDirectChildSelector('span'));
  expect(getHTMLElementsSpy).toHaveBeenNthCalledWith(2, parent, transformSelectorToDirectChildSelector('a'));
});

it('should return direct child elements', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('button');
  child1.id = 'btn-1';
  const child2 = document.createElement('button');
  child2.id = 'btn-2';
  parent.append(child1, child2);

  expect(getDirectChildHTMLElements(parent, 'button')).toEqual([child1, child2]);
});

it('should return empty array if there is no child element', () => {
  const parent = document.createElement('div');
  expect(getDirectChildHTMLElements(parent, 'button')).toEqual([]);
});

it('should return empty array for nested child elements', () => {
  const parent = document.createElement('div');
  const child = document.createElement('span');
  const nestedChild1 = document.createElement('button');
  const nestedChild2 = document.createElement('button');
  child.append(nestedChild1, nestedChild2);
  parent.append(child);

  expect(getDirectChildHTMLElements(parent, 'button')).toEqual([]);
});
