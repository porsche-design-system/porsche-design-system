import { expect } from '@jest/globals';
import * as implicitSubmitUtils from '../../utils/form/implicitSubmit';
import { InputNumber } from './input-number';

jest.mock('../../utils/dom');

class MockElementInternals {
  setValidity = jest.fn();
  setFormValue = jest.fn();
}

let mockEmit: jest.SpyInstance;

const initComponent = (): InputNumber => {
  const component = new InputNumber();
  component.host = document.createElement('p-input-number');
  component.host.attachShadow({ mode: 'open' });
  const input = document.createElement('input');
  component.host.shadowRoot.appendChild(input);
  component['inputElement'] = input;
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  mockEmit = jest.fn();

  // Mock the emit methods
  component.change = { emit: mockEmit } as any;
  component.blur = { emit: mockEmit } as any;
  component.input = { emit: mockEmit } as any;
  return component;
};

describe('formResetCallback', () => {
  const component = initComponent();
  const defaultValue = 'default-value';
  component['defaultValue'] = defaultValue;
  component.value = 'test';
  component.formResetCallback();
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
  component.value = 'test';
  const restoredValue = 'restored-value';
  component.formStateRestoreCallback(restoredValue);
  expect(component.value).toBe(restoredValue);
});
describe('componentDidLoad', () => {
  const component = initComponent();
  component.value = 'test';
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
  component.componentDidLoad();
  expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
});
describe('onChange', () => {
  const component = initComponent();
  const event = {
    stopPropagation: jest.fn(),
    stopImmediatePropagation: jest.fn(),
  } as unknown as Event;

  component['onChange'](event);

  expect(mockEmit).toHaveBeenCalledWith(event);
});
describe('onBlur', () => {
  it('should stop propagation and emit blur event on onBlur', () => {
    const component = initComponent();
    const event = {
      stopPropagation: jest.fn(),
      stopImmediatePropagation: jest.fn(),
    } as unknown as Event;

    component['onBlur'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(event);
  });
});
describe('onInput', () => {
  it('should stop propagation and emit input event on onInput', () => {
    const component = initComponent();
    const testValue = 'test';
    const event = {
      stopPropagation: jest.fn(),
      stopImmediatePropagation: jest.fn(),
      target: {
        value: testValue,
      },
    } as unknown as InputEvent;

    component['onInput'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(event);
    expect(component.value).toBe(testValue);
  });
});

describe('onKeyDown', () => {
  it('should call implicitSubmit with correct parameters', () => {
    const component = initComponent();
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const implicitSubmitSpy = jest.spyOn(implicitSubmitUtils, 'implicitSubmit');
    component['onKeyDown'](event);
    expect(implicitSubmitSpy).toHaveBeenCalledWith(event, component['internals'], component.host);
  });
});

describe('componentDidRender', () => {
  it('should call ElementInternals setValidity()', () => {
    const component = initComponent();
    const setValiditySpy = jest.spyOn(component['internals'], 'setValidity' as any);
    component.componentDidRender();
    expect(setValiditySpy).toHaveBeenCalledTimes(1);
    expect(setValiditySpy).toHaveBeenCalledWith(
      component['inputElement'].validity,
      component['inputElement'].validationMessage,
      component['inputElement']
    );
  });
});
describe('connectedCallback', () => {
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
describe('componentWillUpdate', () => {
  it('should assign this.initialLoading to true for this.loading = true', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillUpdate();
    expect(component['initialLoading']).toBe(true);
  });
});
describe('componentWillLoad', () => {
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
