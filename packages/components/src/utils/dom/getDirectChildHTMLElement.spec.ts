import { vi } from 'vitest';
import { getDirectChildHTMLElement } from './getDirectChildHTMLElement';
import * as getHTMLElementUtils from './getHTMLElement';
import * as transformSelectorToDirectChildSelectorUtils from './transformSelectorToDirectChildSelector';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

it('should call getHTMLElement() with element and result of transformSelectorToDirectChildSelector()', () => {
  const transformSelectorToDirectChildSelectorSpy = vi.spyOn(
    transformSelectorToDirectChildSelectorUtils,
    'transformSelectorToDirectChildSelector'
  );
  const getHTMLElementSpy = vi.spyOn(getHTMLElementUtils, 'getHTMLElement').mockImplementation(() => {});
  const parent = document.createElement('div');
  const selector = 'span,a';

  getDirectChildHTMLElement(parent, selector);

  expect(transformSelectorToDirectChildSelectorSpy).toHaveBeenCalledWith(selector);
  expect(getHTMLElementSpy).toHaveBeenCalledTimes(2);
  expect(getHTMLElementSpy).toHaveBeenNthCalledWith(1, parent, transformSelectorToDirectChildSelector('span'));
  expect(getHTMLElementSpy).toHaveBeenNthCalledWith(2, parent, transformSelectorToDirectChildSelector('a'));
});

it('should return direct child element', () => {
  const parent = document.createElement('div');
  const child = document.createElement('button');
  parent.append(child);

  expect(getDirectChildHTMLElement(parent, 'button')).toBe(child);
});

it('should return direct child element if first comma separated selector returns null', () => {
  const parent = document.createElement('div');
  const child = document.createElement('button');
  parent.append(child);

  expect(getDirectChildHTMLElement(parent, 'a,button')).toBe(child);
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
