import * as getHTMLElementUtils from './getHTMLElement';
import { getDirectChildHTMLElement } from './getDirectChildHTMLElement';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';
import * as transformSelectorToDirectChildSelectorUtils from './transformSelectorToDirectChildSelector';

it('should call getHTMLElement() with element and and result of transformSelectorToDirectChildSelector()', () => {
  const transformSelectorToDirectChildSelectorSpy = jest.spyOn(
    transformSelectorToDirectChildSelectorUtils,
    'transformSelectorToDirectChildSelector'
  );
  const getHTMLElementSpy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockImplementation();
  const parent = document.createElement('div');
  const selector = 'span,a';

  getDirectChildHTMLElement(parent, selector);

  expect(transformSelectorToDirectChildSelectorSpy).toBeCalledWith(selector);
  expect(getHTMLElementSpy).toBeCalledTimes(2);
  expect(getHTMLElementSpy).toHaveBeenNthCalledWith(1, parent, transformSelectorToDirectChildSelector('span'));
  expect(getHTMLElementSpy).toHaveBeenNthCalledWith(2, parent, transformSelectorToDirectChildSelector('a'));
});

it('should return direct child element', () => {
  const parent = document.createElement('div');
  const child = document.createElement('button');
  parent.append(child);

  expect(getDirectChildHTMLElement(parent, 'button')).toBe(child);
});

it('should return null if there is no child element', () => {
  const parent = document.createElement('div');
  expect(getDirectChildHTMLElement(parent, 'button')).toBe(null);
});

it('should return null for nested child element', () => {
  const parent = document.createElement('div');
  const child = document.createElement('span');
  const nestedChild = document.createElement('button');
  child.append(nestedChild);
  parent.append(child);

  expect(getDirectChildHTMLElement(parent, 'button')).toBe(null);
});
