import * as domUtils from '../../../../utils/dom';
import { SelectWrapperDropdown } from './select-wrapper-dropdown';
import * as selectWrapperDropdownStyles from './select-wrapper-dropdown-styles';
import * as selectWrapperDropdownUtils from './select-wrapper-dropdown-utils';

describe('select-wrapper-dropdown', () => {
  const initComponent = (): SelectWrapperDropdown => {
    const component = new SelectWrapperDropdown();
    component.host = document.createElement('p-select-wrapper-dropdown');
    component.host.attachShadow({ mode: 'open' });
    return component;
  };

  describe('connectedCallback', () => {
    it('should call throwIfRootNodeIsNotOfKind()', () => {
      const component = initComponent();
      const spy = jest.spyOn(domUtils, 'throwIfRootNodeIsNotOfKind');

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(component.host, 'pSelectWrapper');
    });
  });

  describe('componentWillRender', () => {
    it('should call addComponentCss()', () => {
      const component = initComponent();
      component.direction = 'down';

      const spy = jest.spyOn(selectWrapperDropdownStyles, 'addComponentCss');
      component.componentWillRender();

      expect(spy).toBeCalledWith(component.host, 'down', false, 'light');
    });
  });

  describe('componentDidRender()', () => {
    it('should call handleScroll()', () => {
      const component = initComponent();

      const spy = jest.spyOn(selectWrapperDropdownUtils, 'handleScroll');
      component.componentDidRender();

      expect(spy).toBeCalledWith(component.host, expect.anything());
    });
  });
});
