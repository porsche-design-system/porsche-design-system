import { Modal } from './modal';
import * as modalUtils from './modal-utils';
import * as a11yUtils from '../../../utils/a11y';
import { MODAL_ARIA_ATTRIBUTES } from './modal-utils';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('modal', () => {
  let component: Modal;

  beforeEach(() => {
    component = new Modal();
    component.host = document.createElement('p-modal');
  });

  describe('connectedCallback', () => {
    it('should call setScrollLock() if modal is open', () => {
      component.open = true;
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');

      component.connectedCallback();

      expect(utilsSpy).toHaveBeenCalledWith(component.host, true, expect.anything());
    });

    it('should not call setScrollLock() if modal is not open', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');

      component.connectedCallback();

      expect(utilsSpy).not.toHaveBeenCalled();
    });
  });

  describe('componentDidLoad', () => {
    it('should call getFocusableElements()', () => {
      const spy = jest.spyOn(modalUtils, 'getFocusableElements');

      component.componentDidLoad();

      expect(spy).toBeCalledWith(component.host, undefined);
    });
  });

  describe('componentWillRender', () => {
    it('should call warnIfAriaAndHeadingPropsAreUndefined() and parseAndGetAriaAttributes()', () => {
      const spyWarnIfAriaAndHeadingPropsAreUndefined = jest.spyOn(modalUtils, 'warnIfAriaAndHeadingPropsAreUndefined');
      const spyParseAndGetAriaAttributes = jest.spyOn(a11yUtils, 'parseAndGetAriaAttributes');
      component.host.attachShadow({ mode: 'open' });

      component.componentWillRender();

      expect(spyWarnIfAriaAndHeadingPropsAreUndefined).toBeCalledWith(
        component.host,
        component.heading,
        component.aria
      );
      expect(spyParseAndGetAriaAttributes).toBeCalledWith(component.aria, MODAL_ARIA_ATTRIBUTES);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call setScrollLock()', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');

      component.disconnectedCallback();

      expect(utilsSpy).toHaveBeenCalledWith(component.host, false, expect.anything());
    });
  });
});
