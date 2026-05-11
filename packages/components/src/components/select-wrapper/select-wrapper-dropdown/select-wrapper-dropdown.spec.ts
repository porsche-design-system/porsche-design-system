import { vi } from 'vitest';
import * as childrenObserverUtils from '../../../utils/children-observer';
import * as propertyObserverUtils from '../../../utils/property-observer';
import * as throwIfRootNodeIsNotOneOfKindUtils from '../../../utils/validation/throwIfRootNodeIsNotOneOfKind';
import { SelectWrapperDropdown } from './select-wrapper-dropdown';
import * as selectWrapperDropdownUtils from './select-wrapper-dropdown-utils';

const initComponent = (): SelectWrapperDropdown => {
  const component = new SelectWrapperDropdown();
  component.host = document.createElement('p-select-wrapper-dropdown');
  component.host.attachShadow({ mode: 'open' });
  component.selectRef = document.createElement('select');
  return component;
};

describe('connectedCallback', () => {
  it('should call observeChildren() with correct parameters', () => {
    const component = initComponent();
    const spy = vi.spyOn(childrenObserverUtils, 'observeChildren');
    vi.spyOn(throwIfRootNodeIsNotOneOfKindUtils, 'throwIfRootNodeIsNotOneOfKind').mockReturnValue();
    component.connectedCallback();

    expect(spy).toHaveBeenCalledWith(component.selectRef, expect.anything(), ['hidden', 'disabled', 'selected']);
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveChildren() with correct parameters', () => {
    const component = initComponent();
    const spy = vi.spyOn(childrenObserverUtils, 'unobserveChildren');

    try {
      component.disconnectedCallback();
    } catch {}

    expect(spy).toHaveBeenCalledWith(component.host);
  });
});

describe('componentDidRender', () => {
  it('should call handleScroll() when dropdown isOpen = true', () => {
    const component = initComponent();
    component['isOpen'] = true;

    const spy = vi.spyOn(selectWrapperDropdownUtils, 'handleScroll');
    try {
      component.componentDidRender();
    } catch (e) {}

    expect(spy).toHaveBeenCalledWith(undefined, -1);
  });
  it('should not call handleScroll() when dropdown isOpen = false', () => {
    const component = initComponent();

    const spy = vi.spyOn(selectWrapperDropdownUtils, 'handleScroll');
    try {
      component.componentDidRender();
    } catch (e) {}

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('componentWillLoad', () => {
  it('should call observeProperties()', () => {
    const component = initComponent();

    const spy = vi.spyOn(component, 'observeProperties' as any);
    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('observeProperties()', () => {
  it.each(['setOptionMaps', 'observeOptions'])('should call %s()', (fn) => {
    const component = initComponent();
    const spy = vi.spyOn(component, fn as any);
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call observeProperties() with correct parameters', () => {
    const component = initComponent();
    const spy = vi.spyOn(propertyObserverUtils, 'observeProperties');
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(component.selectRef, ['value', 'selectedIndex'], expect.anything());
  });
});

describe('this.observeOptions()', () => {
  it('should call observeProperties() for each option', () => {
    const component = initComponent();
    const options: HTMLOptionElement[] = [];

    Array.from(new Array(3)).forEach((_, idx) => {
      const el = document.createElement('option');
      el.value = `${idx}`;
      component.selectRef.appendChild(el);
      options.push(el);
    });

    const spy = vi.spyOn(propertyObserverUtils, 'observeProperties');
    component['observeOptions']();

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenLastCalledWith(options[2], ['selected', 'disabled'], expect.anything());
  });
});
