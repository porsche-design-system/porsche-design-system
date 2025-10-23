import { vi } from 'vitest';
import { getHTMLElements } from './getHTMLElements';

it('should call querySelectorAll on element with selector parameter', () => {
  const element = document.createElement('div');
  const spy = vi.spyOn(element, 'querySelectorAll');

  getHTMLElements(element, 'span');
  expect(spy).toHaveBeenCalledWith('span');

  getHTMLElements(element, 'div');
  expect(spy).toHaveBeenCalledWith('div');
});

it('should return result of querySelectorAll', () => {
  const element = document.createElement('div');
  const spanElement = document.createElement('span');

  element.appendChild(spanElement);

  const spanNodeList = element.querySelectorAll('span');

  vi.spyOn(element, 'querySelectorAll').mockReturnValue(spanNodeList);

  expect(getHTMLElements(element, 'span')).toStrictEqual(Array.from(spanNodeList));
});
