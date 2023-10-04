import * as getClosestHTMLElementUtils from '../dom/getClosestHTMLElement';
import { isWithinForm } from './isWithinForm';

it('should call getClosestHTMLElement() with correct parameters', () => {
  const spy = jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');
  const el = document.createElement('input');
  isWithinForm(el);

  expect(spy).toBeCalledWith(el, 'form');
});

it('should return true or false based on result of getClosestHTMLElement()', () => {
  const spy = jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');
  const el = document.createElement('input');

  spy.mockReturnValue(null);
  expect(isWithinForm(el)).toBe(false);

  spy.mockReturnValue(document.createElement('form'));
  expect(isWithinForm(el)).toBe(true);
});
