import { vi } from 'vitest';
import * as getShadowRootHTMLElementUtils from '../../../utils/dom/getShadowRootHTMLElement';
import { Select } from './select';
import * as selectUtils from './select-utils';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

const initComponent = (): Select => {
  const component = new Select();
  component.host = document.createElement('p-select');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;
  return component;
};

describe('connectedCallback', () => {
  it('should add event listener', () => {
    const component = initComponent();
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    component.connectedCallback();
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', component['onClickOutside'], true);
  });
});

describe('componentWillLoad', () => {
  it('should call updateOptions(), selectOptionByValue() and setFormValue() with correct parameters', () => {
    const component = initComponent();
    const updateSelectOptionsSpy = vi.spyOn(selectUtils, 'selectOptionByValue');
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.componentWillLoad();
    expect(updateSelectOptionsSpy).toHaveBeenCalledWith(component.host, component['selectOptions'], component['value']);
    expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
  });
});

describe('componentDidLoad', () => {
  it('should call getShadowRootHTMLElement() with correct parameters and add event listener)', () => {
    const component = initComponent();
    component.value = 'test';
    const slot = document.createElement('slot');
    const slotSpy = vi.spyOn(slot, 'addEventListener');
    const getShadowRootHTMLElementSpy = vi
      .spyOn(getShadowRootHTMLElementUtils, 'getShadowRootHTMLElement')
      .mockReturnValueOnce(slot);

    component.componentDidLoad();
    expect(getShadowRootHTMLElementSpy).toHaveBeenCalledWith(component.host, 'slot:not([name])');
    expect(slotSpy).toHaveBeenCalledTimes(1);
  });
});

describe('disconnectedCallback', () => {
  it('should remove event listener', () => {
    const component = initComponent();
    const spy = vi.spyOn(document, 'removeEventListener');
    component.disconnectedCallback();
    expect(spy).toHaveBeenCalledWith('mousedown', component['onClickOutside'], true);
  });
});

describe('formResetCallback', () => {
  it('should reset value to defaultValue', () => {
    const component = initComponent();
    const defaultValue = 'default-value';
    component['defaultValue'] = defaultValue;
    component.value = 'test';
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
    component.formResetCallback();
    expect(setFormValueSpy).toHaveBeenCalledWith(defaultValue);
    expect(component.value).toBe(defaultValue);
  });
});

describe('formDisabledCallback', () => {
  it('should set disabled to true when called with true', () => {
    const component = initComponent();
    component.disabled = false;
    component.formDisabledCallback(true);
    expect(component.disabled).toBe(true);
  });
});

describe('formStateRestoreCallback', () => {
  it('should restore value', () => {
    const component = initComponent();
    component.value = 'test';
    const restoredValue = 'restored-value';
    component.formStateRestoreCallback(restoredValue);
    expect(component.value).toBe(restoredValue);
  });
});
