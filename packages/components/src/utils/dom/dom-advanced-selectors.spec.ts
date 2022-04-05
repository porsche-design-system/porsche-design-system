import { getDirectChildHTMLElement, getSlotTextContent } from './dom-advanced-selectors';
import * as domBaseSelectorUtils from './dom-base-selectors';

describe('getDirectChildHTMLElement()', () => {
  it('should call getHTMLElement() with element and selector parameter', () => {
    const element = document.createElement('div');
    const spy = jest.spyOn(domBaseSelectorUtils, 'getHTMLElement');

    getDirectChildHTMLElement(element, 'span');
    expect(spy).toBeCalledWith(element, ':scope>span');
  });

  it('should return split comma separated selectors', () => {
    const element = document.createElement('div');
    const spy = jest.spyOn(domBaseSelectorUtils, 'getHTMLElement');

    try {
      getDirectChildHTMLElement(element, 'span,button');
    } catch {}

    expect(spy).toBeCalledWith(element, ':scope>span,:scope>button');
  });
});

describe('getSlotTextContent()', () => {
  it('should return correct text content if element has slotted child with correct label', () => {
    const el = document.createElement('div');
    const slottedChild = document.createElement('span');
    slottedChild.setAttribute('slot', 'label');
    slottedChild.innerHTML = 'Some label with a <a href="https://designsystem.porsche.com">link</a>.';
    el.appendChild(slottedChild);
    expect(getSlotTextContent(el, 'label')).toBe('Some label with a link.');
  });

  it('should return false if element has no slotted child', () => {
    const el = document.createElement('div');
    expect(getSlotTextContent(el, 'label')).toBeUndefined();
  });
});
