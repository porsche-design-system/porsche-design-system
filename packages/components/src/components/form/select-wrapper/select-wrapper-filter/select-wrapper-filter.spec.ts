import * as domUtils from '../../../../utils/dom';
import { SelectWrapperFilter } from './select-wrapper-filter';
import * as selectWrapperFilterStyles from './select-wrapper-filter-styles';

describe('select-wrapper-filter', () => {
  const initComponent = (): SelectWrapperFilter => {
    const component = new SelectWrapperFilter();
    component.host = document.createElement('p-select-wrapper-filter');
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
      const spy = jest.spyOn(selectWrapperFilterStyles, 'addComponentCss');
      component.componentWillRender();

      expect(spy).toBeCalledWith(component.host, false, undefined, 'light');
    });
  });
});
