import { vi } from 'vitest';
import { PinCode } from './pin-code';
import * as pinCodeUtils from './pin-code-utils';

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

const initComponent = (): PinCode => {
  const component = new PinCode();
  component.host = document.createElement('p-pin-code');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  return component;
};

describe('connectedCallback()', () => {
  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.connectedCallback();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.connectedCallback();
    expect(component['initialLoading']).toBe(false);
  });
});

describe('componentWillUpdate()', () => {
  it('should assign this.initialLoading to true for this.loading = true', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillUpdate();
    expect(component['initialLoading']).toBe(true);
  });
});

describe('componentWillLoad', () => {
  it('should call getSanitisedValue() with correct parameters', () => {
    const component = initComponent();
    const spy = vi.spyOn(pinCodeUtils, 'getSanitisedValue');
    const value = '3333';
    component.value = value;
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(component.host, component.value, component.length);
    expect(component['defaultValue']).toBe(value);
  });

  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(false);
  });
});
describe('componentDidLoad', () => {
  const component = initComponent();
  component.value = '1234';
  const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
  component.componentDidLoad();
  expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
});
describe('formResetCallback', () => {
  const component = initComponent();
  const defaultValue = '1234';
  component['defaultValue'] = defaultValue;
  component.value = 'test';
  const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
  component.formResetCallback();
  expect(setFormValueSpy).toHaveBeenCalledWith(defaultValue);
  expect(component.value).toBe(defaultValue);
});
describe('formDisabledCallback', () => {
  const component = initComponent();
  component.disabled = false;
  component.formDisabledCallback(true);
  expect(component.disabled).toBe(true);
});
describe('formStateRestoreCallback', () => {
  const component = initComponent();
  component.value = '1234';
  const restoredValue = 'restored-value';
  component.formStateRestoreCallback(restoredValue);
  expect(component.value).toBe(restoredValue);
});

describe('updateValue()', () => {
  it('should call change.emit() with correct parameters and call setFormValue()', () => {
    const component = initComponent();
    const newValue = '1234';
    const emitSpy = vi.fn();
    const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);

    component.change = { emit: emitSpy };
    component.update = { emit: emitSpy };

    // @ts-expect-error
    component.updateValue(newValue);

    expect(emitSpy).toHaveBeenCalledWith({ value: newValue, isComplete: true });
    expect(setFormValueSpy).toHaveBeenCalledWith(newValue);
  });
});
