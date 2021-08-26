import * as domUtils from '../../../../utils/dom';
import * as attributeObserverUtils from '../../../../utils/attribute-observer';
import * as propertyObserverUtils from '../../../../utils/property-observer';
import * as childrenObserverUtils from '../../../../utils/children-observer';
import { SelectWrapper } from './select-wrapper';

describe('select-wrapper', () => {
  const initComponent = (): SelectWrapper => {
    const component = new SelectWrapper();
    component.host = document.createElement('p-select-wrapper');
    component.host.attachShadow({ mode: 'open' });
    component['select'] = document.createElement('select');
    return component;
  };

  describe('connectedCallback', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const component = initComponent();
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(component.host, 'select');
    });

    it('should call observeSelect()', () => {
      const component = initComponent();
      jest.spyOn(component, 'setSelect' as any).mockImplementation();
      const spy = jest.spyOn(component, 'observeSelect' as any);
      component.connectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('componentWillLoad', () => {
    describe('for native dropdown', () => {
      it('should not call observePropertiesAndChildren()', () => {
        const component = initComponent();
        component.native = true;

        const spy = jest.spyOn(component, 'observePropertiesAndChildren' as any);
        component.componentWillLoad();

        expect(spy).toBeCalledTimes(0);
      });
    });

    describe('for custom dropdown', () => {
      it('should call observePropertiesAndChildren()', () => {
        const component = initComponent();

        const spy = jest.spyOn(component, 'observePropertiesAndChildren' as any);
        component.componentWillLoad();

        expect(spy).toBeCalledTimes(1);
      });
    });
  });

  describe('observeSelect()', () => {
    it('should call observeAttributes()', () => {
      const component = initComponent();
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      component['observeSelect']();

      expect(spy).toBeCalledWith(component['select'], ['disabled', 'required'], expect.anything());
    });
  });

  describe('observePropertiesAndChildren()', () => {
    it.each(['setOptionMaps', 'observeOptions'])('should call %s()', (fn) => {
      const component = initComponent();
      const spy = jest.spyOn(component, fn as any);
      component.componentWillLoad();

      expect(spy).toBeCalledTimes(1);
    });

    it('should call observeProperties()', () => {
      const component = initComponent();
      const spy = jest.spyOn(propertyObserverUtils, 'observeProperties');
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component['select'], ['value', 'selectedIndex'], expect.anything());
    });

    it('should call observeChildren()', () => {
      const component = initComponent();
      const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component['select'], expect.anything(), ['hidden']);
    });
  });

  describe('observeOptions()', () => {
    it('should call observeProperties() for each option', () => {
      const component = initComponent();
      const options: HTMLOptionElement[] = [];

      Array.from(Array(3)).forEach((_, idx) => {
        const el = document.createElement('option');
        el.value = `${idx}`;
        component['select'].appendChild(el);
        options.push(el);
      });

      const spy = jest.spyOn(propertyObserverUtils, 'observeProperties');
      component['observeOptions']();

      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenLastCalledWith(options[2], ['selected', 'disabled'], expect.anything());
    });
  });
});
