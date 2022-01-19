import * as domUtils from '../../../../utils/dom';
import { SelectWrapperDropdown } from './select-wrapper-dropdown';
import * as selectWrapperDropdownUtils from './select-wrapper-dropdown-utils';
import * as propertyObserverUtils from '../../../../utils/property-observer';
import * as childrenObserverUtils from '../../../../utils/children-observer';

describe('select-wrapper-dropdown', () => {
  const initComponent = (): SelectWrapperDropdown => {
    const component = new SelectWrapperDropdown();
    component.host = document.createElement('p-select-wrapper-dropdown');
    component.host.attachShadow({ mode: 'open' });
    component.selectRef = document.createElement('select');
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

  describe('componentDidRender', () => {
    it('should call handleScroll()', () => {
      const component = initComponent();

      const spy = jest.spyOn(selectWrapperDropdownUtils, 'handleScroll');
      try {
        component.componentDidRender();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, -1);
    });
  });

  describe('componentWillLoad', () => {
    it('should call observePropertiesAndChildren()', () => {
      const component = initComponent();

      const spy = jest.spyOn(component, 'observePropertiesAndChildren' as any);
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledTimes(1);
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

      expect(spy).toBeCalledWith(component.selectRef, ['value', 'selectedIndex'], expect.anything());
    });

    it('should call observeChildren()', () => {
      const component = initComponent();
      const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component.selectRef, expect.anything(), ['hidden']);
    });
  });

  describe('observeOptions()', () => {
    it('should call observeProperties() for each option', () => {
      const component = initComponent();
      const options: HTMLOptionElement[] = [];

      Array.from(Array(3)).forEach((_, idx) => {
        const el = document.createElement('option');
        el.value = `${idx}`;
        component.selectRef.appendChild(el);
        options.push(el);
      });

      const spy = jest.spyOn(propertyObserverUtils, 'observeProperties');
      component['observeOptions']();

      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenLastCalledWith(options[2], ['selected', 'disabled'], expect.anything());
    });
  });
});
