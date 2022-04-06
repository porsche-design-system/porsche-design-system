import * as getHTMLElementAndThrowIfUndefinedUtils from '../../../../utils/dom/getHTMLElementAndThrowIfUndefined';
import * as attributeObserverUtils from '../../../../utils/attribute-observer';
import { SelectWrapper } from './select-wrapper';
import * as selectWrapperUtils from './select-wrapper-utils';

describe('select-wrapper', () => {
  const initComponent = (): SelectWrapper => {
    const component = new SelectWrapper();
    component.host = document.createElement('p-select-wrapper');
    component.host.attachShadow({ mode: 'open' });
    component.host.append(document.createElement('select'));
    return component;
  };

  describe('connectedCallback', () => {
    it('should call observeAttributes() with correct parameters', () => {
      const component = initComponent();
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      component.connectedCallback();

      expect(spy).toBeCalledWith(component['select'], ['disabled', 'required'], expect.anything());
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined() with correct parameters', () => {
      const component = initComponent();
      const spy = jest.spyOn(getHTMLElementAndThrowIfUndefinedUtils, 'getHTMLElementAndThrowIfUndefined');

      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledWith(component.host, 'select');
    });

    it('should call isCustomDropdown() with correct parameters', () => {
      const component = initComponent();
      component.native = true;

      const spy = jest.spyOn(selectWrapperUtils, 'isCustomDropdown');
      component.componentWillLoad();

      expect(spy).toBeCalledWith(false, true);
    });
  });
});
