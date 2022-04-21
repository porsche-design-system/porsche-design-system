import { getHTMLElement } from './getHTMLElement';

it('should call querySelector on element with selector parameter', () => {
  const element = document.createElement('div');
  const spy = jest.spyOn(element, 'querySelector');

  getHTMLElement(element, 'span');
  expect(spy).toBeCalledWith('span');

  getHTMLElement(element, 'div');
  expect(spy).toBeCalledWith('div');
});

it('should return result of querySelector', () => {
  const element = document.createElement('div');
  const childElement = document.createElement('span');
  jest.spyOn(element, 'querySelector').mockReturnValue(childElement);

  expect(getHTMLElement(element, 'span')).toBe(childElement);
});
