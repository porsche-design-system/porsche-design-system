import { vi } from 'vitest';
import { getHTMLElement } from './getHTMLElement';

it('should call querySelector on element with selector parameter', () => {
  const element = document.createElement('div');
  const spy = vi.spyOn(element, 'querySelector');

  getHTMLElement(element, 'span');
  expect(spy).toHaveBeenCalledWith('span');

  getHTMLElement(element, 'div');
  expect(spy).toHaveBeenCalledWith('div');
});

it('should return result of querySelector', () => {
  const element = document.createElement('div');
  const childElement = document.createElement('span');
  vi.spyOn(element, 'querySelector').mockReturnValue(childElement);

  expect(getHTMLElement(element, 'span')).toBe(childElement);
});
