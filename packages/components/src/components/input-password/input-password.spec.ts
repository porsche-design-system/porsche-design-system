import { expect } from '@jest/globals';
import { getSlottedAnchorStyles } from '../../styles';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';
import { InputPassword } from './input-password';

jest.mock('../../utils/dom');

class MockElementInternals {
  setValidity = jest.fn();
  setFormValue = jest.fn();
}

let mockEmit: jest.SpyInstance;

const initComponent = (): InputPassword => {
  const component = new InputPassword();
  component.host = document.createElement('p-textarea');
  component.host.attachShadow({ mode: 'open' });
  const textarea = document.createElement('textarea');
  const counterElement = document.createElement('span');
  component.host.shadowRoot.appendChild(textarea);
  component.host.shadowRoot.appendChild(counterElement);
  component['textAreaElement'] = textarea;
  component['counterElement'] = counterElement;
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  mockEmit = jest.fn();

  // Mock the emit methods
  component.change = { emit: mockEmit } as any;
  component.blur = { emit: mockEmit } as any;
  component.input = { emit: mockEmit } as any;
  return component;
};

describe('connectedCallback', () => {
  it('should call applyConstructableStylesheetStyles() with correct parameters', () => {
    const applyConstructableStylesheetStylesSpy = jest.spyOn(
      applyConstructableStylesheetStylesUtils,
      'applyConstructableStylesheetStyles'
    );
    const component = initComponent();

    component.connectedCallback();
    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledWith(component.host, getSlottedAnchorStyles);
  });
});
describe('componentWillLoad', () => {
  it('should call updateCounterVisibility()', () => {
    const component = initComponent();
    const value = 'test';
    component.value = value;
    const updateCounterVisibilitySpy = jest.spyOn(component, 'updateCounterVisibility' as any);
    component.componentWillLoad();
    expect(updateCounterVisibilitySpy).toHaveBeenCalledTimes(1);
    expect(component['defaultValue']).toBe(value);
  });
});
describe('formResetCallback', () => {
  const component = initComponent();
  const defaultValue = 'default-value';
  component['defaultValue'] = defaultValue;
  component.value = 'test';
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
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
    component['hasCounter'] = true;

    component['onInput'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(event);
    expect(component.value).toBe(testValue);
  });
});
describe('componentDidRender', () => {
  it('should call ElementInternals setValidity()', () => {
    const component = initComponent();
    const setValiditySpy = jest.spyOn(component['internals'], 'setValidity' as any);
    component.componentDidRender();
    expect(setValiditySpy).toHaveBeenCalledTimes(1);
    expect(setValiditySpy).toHaveBeenCalledWith(
      component['textAreaElement'].validity,
      component['textAreaElement'].validationMessage,
      component['textAreaElement']
    );
  });

  it('should call setCounterAriaTextDebounced() when hasCounter is true', () => {
    const component = initComponent();
    const setCounterAriaTextDebouncedSpy = jest.spyOn(component as any, 'setCounterAriaTextDebounced');
    component['hasCounter'] = true;
    component.componentDidRender();
    expect(setCounterAriaTextDebouncedSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call setCounterAriaTextDebounced() when hasCounter is false', () => {
    const component = initComponent();
    const setCounterAriaTextDebouncedSpy = jest.spyOn(component as any, 'setCounterAriaTextDebounced');
    component['hasCounter'] = false;
    component.componentDidRender();
    expect(setCounterAriaTextDebouncedSpy).not.toHaveBeenCalledTimes(1);
  });
});
describe('updateCounterVisibility', () => {
  it('should update counter visibility based on maxLength and showCounter', () => {
    const component = initComponent();
    component.maxLength = 100;
    component.showCounter = true;

    component['updateCounterVisibility']();

    expect(component['hasCounter']).toBe(true);
  });
});
describe('setCounterAriaText', () => {
  it('should set correct counter aria text on setCounterAriaText', () => {
    const component = initComponent();
    component.maxLength = 100;
    component.value = 'test';

    component['setCounterAriaText']();

    expect(component['counterElement'].innerText).toBe('You have 96 out of 100 characters left');
  });
});
