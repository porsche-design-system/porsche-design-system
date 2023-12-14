import * as getHTMLElementUtils from './getHTMLElement';
import { hasSpecificSlottedTag } from './hasSpecificSlottedTag';

it('should call getHTMLElement with correct parameters', () => {
  const host = document.createElement('div');
  const tag = 'button';
  const spy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement');

  hasSpecificSlottedTag(host, tag);

  expect(spy).toBeCalledWith(host, ':first-child');
});

it('should return true if getHTMLElement returns an element matching the provided tag param and host has only one child', () => {
  const host = document.createElement('div');
  const tag = 'button';
  const child = document.createElement('button');
  host.appendChild(child);
  jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockReturnValueOnce(child);

  expect(hasSpecificSlottedTag(host, tag)).toBe(true);
});

it('should return false if getHTMLElement returns an element matching the provided tag param and host has more then one child', () => {
  const host = document.createElement('div');
  const tag = 'button';
  const child1 = document.createElement('button');
  const child2 = document.createElement('input');
  host.appendChild(child1);
  host.appendChild(child2);
  jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockReturnValueOnce(child1);

  expect(hasSpecificSlottedTag(host, tag)).toBe(false);
});

it('should return false if getHTMLElement returns an element not matching the provided tag param and host has only one child', () => {
  const host = document.createElement('div');
  const tag = 'input';
  const child = document.createElement('button');
  host.appendChild(child);
  jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockReturnValueOnce(child);

  expect(hasSpecificSlottedTag(host, tag)).toBe(false);
});

it('should return false if getHTMLElement returns an element not matching the provided tag param and host has more then one child', () => {
  const host = document.createElement('div');
  const tag = 'input';
  const child1 = document.createElement('button');
  const child2 = document.createElement('input');
  host.appendChild(child1);
  host.appendChild(child2);
  jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockReturnValueOnce(child1);

  expect(hasSpecificSlottedTag(host, tag)).toBe(false);
});
