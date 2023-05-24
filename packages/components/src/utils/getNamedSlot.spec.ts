import * as getHTMLElementUtils from './dom/getHTMLElement';
import { getNamedSlot } from './getNamedSlot';

it('should call getHTMLElement() with correct parameters', () => {
  const spy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement');

  const el = document.createElement('div');
  getNamedSlot(el, 'someName');

  expect(spy).toBeCalledWith(el, '[slot="someName"]');
});

it('should return return-value of getHTMLElement()', () => {
  const mockedEl = document.createElement('div');
  jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockReturnValue(mockedEl);

  const el = document.createElement('div');
  getNamedSlot(el, 'someName');

  expect(getNamedSlot(el, 'someName')).toBe(mockedEl);
});
