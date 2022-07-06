import * as getHTMLElementUtils from './getHTMLElement';
import { getDirectChildHTMLElement } from './getDirectChildHTMLElement';

it('should call getHTMLElement() with element and simple selector parameter', () => {
  const parent = document.createElement('div');
  const spy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockImplementation();

  getDirectChildHTMLElement(parent, 'span');
  expect(spy).toBeCalledWith(parent, ':scope>span');
});

it('should call getHTMLElement() with element and comma separated selector', () => {
  const parent = document.createElement('div');
  const spy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockImplementation();

  getDirectChildHTMLElement(parent, 'span,button');

  expect(spy).toBeCalledWith(parent, ':scope>span,:scope>button');
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
