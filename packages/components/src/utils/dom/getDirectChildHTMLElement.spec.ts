import * as getHTMLElementUtils from './getHTMLElement';
import { getDirectChildHTMLElement } from './getDirectChildHTMLElement';

it('should call getHTMLElement() with element and selector parameter', () => {
  const element = document.createElement('div');
  const spy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement');

  getDirectChildHTMLElement(element, 'span');
  expect(spy).toBeCalledWith(element, ':scope>span');
});

it('should return split comma separated selectors', () => {
  const element = document.createElement('div');
  const spy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement');

  try {
    getDirectChildHTMLElement(element, 'span,button');
  } catch {}

  expect(spy).toBeCalledWith(element, ':scope>span,:scope>button');
});
