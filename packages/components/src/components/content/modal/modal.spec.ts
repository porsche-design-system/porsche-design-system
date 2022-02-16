import { Modal } from './modal';
import * as modalUtils from './modal-utils';
import * as domUtils from '../../../utils/dom';
import { FirstAndLastFocusableElement } from './modal-utils';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('modal', () => {
  let component: Modal;

  beforeEach(() => {
    component = new Modal();
    component.host = document.createElement('p-modal');
    component.host.attachShadow({ mode: 'open' });
    component['closeBtn'] = document.createElement('button');
  });

  describe('componentDidLoad', () => {
    let getFirstAndLastFocusableElementSpy: jest.SpyInstance;
    const focusableElements: FirstAndLastFocusableElement = [
      document.createElement('button'),
      document.createElement('button'),
    ];

    beforeEach(() => {
      getFirstAndLastFocusableElementSpy = jest
        .spyOn(modalUtils, 'getFirstAndLastFocusableElement')
        .mockImplementation(() => focusableElements);

      jest.spyOn(domUtils, 'getShadowRootHTMLElement').mockImplementation(() => document.createElement('slot'));
    });

    it('should call setScrollLock() if modal is open', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');
      component.open = true;
      component.componentDidLoad();

      expect(utilsSpy).toHaveBeenCalledWith(component.host, true, component['closeBtn'], component['closeModal']);
    });

    it('should not call setScrollLock() if modal is not open', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');
      component.componentDidLoad();

      expect(utilsSpy).not.toHaveBeenCalled();
    });
  });

  describe('componentWillRender', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('should call warnIfAriaAndHeadingPropsAreUndefined()', () => {
      const warnIfAriaAndHeadingPropsAreUndefinedSpy = jest.spyOn(modalUtils, 'warnIfAriaAndHeadingPropsAreUndefined');
      component.componentWillRender();

      expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).toBeCalledWith(
        component.host,
        component.heading,
        component.aria
      );
    });

    it('should not call hasNamedSlot() when heading is provided', () => {
      const hasNamedSlotSpy = jest.spyOn(domUtils, 'hasNamedSlot');
      component.heading = 'Some Heading';
      component.componentWillRender();

      expect(hasNamedSlotSpy).not.toHaveBeenCalled();
    });

    it('should call hasNamedSlot() when no heading is provided', () => {
      const hasNamedSlotSpy = jest.spyOn(domUtils, 'hasNamedSlot');
      const header = document.createElement('header');
      header.slot = 'heading';
      component.host.appendChild(header);
      component.componentWillRender();

      expect(hasNamedSlotSpy).toHaveBeenCalledWith(component.host, 'heading');
    });
  });

  describe('disconnectedCallback', () => {
    it('should call setScrollLock()', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');
      component.disconnectedCallback();

      expect(utilsSpy).toHaveBeenCalledWith(component.host, false);
    });
  });
});
