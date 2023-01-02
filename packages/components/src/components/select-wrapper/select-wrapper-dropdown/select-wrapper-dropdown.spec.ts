import { SelectWrapperDropdown } from './select-wrapper-dropdown';
import * as selectWrapperDropdownUtils from './select-wrapper-dropdown-utils';
import * as propertyObserverUtils from '../../../utils/property-observer';
import * as childrenObserverUtils from '../../../utils/children-observer';
import * as throwIfRootNodeIsNotOneOfKindUtils from '../../../utils/validation/throwIfRootNodeIsNotOneOfKind';

const initComponent = (): SelectWrapperDropdown => {
  const component = new SelectWrapperDropdown();
  component.host = document.createElement('p-select-wrapper-dropdown');
  component.host.attachShadow({ mode: 'open' });
  component.selectRef = document.createElement('select');

  const parent = document.createElement('p-select-wrapper');
  parent.attachShadow({ mode: 'open' });
  parent.shadowRoot.append(component.host);

  return component;
};

describe('connectedCallback', () => {
  it('should call observeChildren() with correct parameters', () => {
    const component = initComponent();
    const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');
    jest.spyOn(throwIfRootNodeIsNotOneOfKindUtils, 'throwIfRootNodeIsNotOneOfKind').mockReturnValue();
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.selectRef, expect.any(Function), ['hidden', 'disabled', 'selected']);
  });

  it.each(['setOptionMaps', 'observeOptions'])('should call %s() with correct parameters', (fn) => {
    const component = initComponent();
    const spy = jest.spyOn(component, fn as any);
    component.connectedCallback();

    expect(spy).toBeCalledWith();
  });

  it('should call observeProperties() with correct parameters', () => {
    const component = initComponent();
    const spy = jest.spyOn(propertyObserverUtils, 'observeProperties');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.selectRef, ['value', 'selectedIndex'], expect.anything());
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveChildren() with correct parameters', () => {
    const component = initComponent();
    const spy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');

    try {
      component.disconnectedCallback();
    } catch {}

    expect(spy).toBeCalledWith(component.host);
  });
});

describe('componentDidRender', () => {
  it('should call handleScroll() with correct parameters', () => {
    const component = initComponent();

    const spy = jest.spyOn(selectWrapperDropdownUtils, 'handleScroll');
    try {
      component.componentDidRender();
    } catch (e) {}

    expect(spy).toBeCalledWith(undefined, -1);
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

    expect(spy).toBeCalledTimes(3);
    expect(spy).toHaveBeenLastCalledWith(options[2], ['selected', 'disabled'], expect.anything());
  });
});
