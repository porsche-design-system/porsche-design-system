import { vi } from 'vitest';
import * as getClosestHTMLElementUtils from '../dom/getClosestHTMLElement';
import { isWithinForm } from './isWithinForm';

it('should call getClosestHTMLElement() with correct parameters', () => {
  const spy = vi.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');
  const el = document.createElement('input');
  isWithinForm(el);

  expect(spy).toHaveBeenCalledWith(el, 'form');
});

it('should return true or false based on result of getClosestHTMLElement()', () => {
  const spy = vi.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');
  const el = document.createElement('input');

  spy.mockReturnValue(null);
  expect(isWithinForm(el)).toBe(false);

  spy.mockReturnValue(document.createElement('form'));
  expect(isWithinForm(el)).toBe(true);
});
