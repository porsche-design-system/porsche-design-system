import * as getHTMLElementsUtils from './getHTMLElements';
import { getDirectChildHTMLElements } from './getDirectChildHTMLElements';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

it('should call getHTMLElements() with element and result of transformSelectorToDirectChildSelector()', () => {
  const spy = jest.spyOn(getHTMLElementsUtils, 'getHTMLElements').mockImplementation();
  const parent = document.createElement('div');
  const selector = 'span';

  getDirectChildHTMLElements(parent, selector);
  expect(spy).toBeCalledWith(parent, transformSelectorToDirectChildSelector(selector));
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
