import * as getDirectChildHTMLElementUtils from './getDirectChildHTMLElement';
import { hasSpecificDirectChildTag } from './hasSpecificDirectChildTag';

it('should call getDirectChildHTMLElement() with correct parameters', () => {
  const host = document.createElement('div');
  const tag = 'button';
  const spy = jest.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');

  hasSpecificDirectChildTag(host, tag);

  expect(spy).toBeCalledWith(host, ':only-child');
});

it('should return true if getDirectChildHTMLElement returns an element matching the tag param', () => {
  const host = document.createElement('div');
  const tag = 'button';
  const child = document.createElement('button');
  host.appendChild(child);

  expect(hasSpecificDirectChildTag(host, tag)).toBe(true);
});

it('should return false if getDirectChildHTMLElement returns null', () => {
  const host = document.createElement('div');
  const tag = 'button';
  const child1 = document.createElement('button');
  const child2 = document.createElement('input');
  host.appendChild(child1);
  host.appendChild(child2);

  expect(hasSpecificDirectChildTag(host, tag)).toBe(false);
});

it('should return false if getDirectChildHTMLElement returns an element not matching the tag param', () => {
  const host = document.createElement('div');
  const tag = 'input';
  const child = document.createElement('button');
  host.appendChild(child);

  expect(hasSpecificDirectChildTag(host, tag)).toBe(false);
});

