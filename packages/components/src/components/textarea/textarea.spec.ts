import { Textarea } from './textarea';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';
import * as formUtils from '../../utils/form/form-utils';
import { getSlottedAnchorStyles } from '../../styles';
import { Event } from '@stencil/core';
import { expect } from '@jest/globals';

jest.mock('../../utils/dom');

class MockElementInternals {
  setValidity = jest.fn();
  setFormValue = jest.fn();
}

let mockEmit: jest.SpyInstance;

const initComponent = (): Textarea => {
  const component = new Textarea();
  component.host = document.createElement('p-textarea');
  component.host.attachShadow({ mode: 'open' });
  const textarea = document.createElement('textarea');
  component.host.shadowRoot.appendChild(textarea);
  component['textAreaElement'] = textarea;
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
  it('should call updateCounter()', () => {
    const component = initComponent();
    const updateCounterSpy = jest.spyOn(component, 'updateCounter' as any);

    component.componentWillLoad();
    expect(updateCounterSpy).toHaveBeenCalledTimes(1);
  });
});
describe('formResetCallback', () => {
  const component = initComponent();
  component.value = 'test';
  const setValiditySpy = jest.spyOn(component['internals'], 'setValidity' as any);
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
  component.formResetCallback();
  expect(setValiditySpy).toHaveBeenCalledWith({});
  expect(setFormValueSpy).toHaveBeenCalledWith('');
  expect(component.value).toBe('');
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
  it('should stop propagation and emit blur event on onBlur', () => {
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

    const debounceSpy = jest.spyOn(formUtils, 'debounce');
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);

    component['onInput'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(event);
    expect(component.value).toBe(testValue);
    expect(debounceSpy).toHaveBeenCalled();
    expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
  });
});
describe('updateCounter', () => {
  // TODO: Why is setCounterAriaTextSpy not called?
  // it('should call updateCounterVisibility() and setCounterAriaText() when hasCounter is true', () => {
  //   const component = initComponent();
  //   const updateCounterVisibilitySpy = jest.spyOn(component, 'updateCounterVisibility' as any);
  //   const setCounterAriaTextSpy = jest.spyOn(component, 'setCounterAriaText' as any);
  //   component['hasCounter'] = true;
  //   component['updateCounter']();
  //
  //   expect(updateCounterVisibilitySpy).toHaveBeenCalledTimes(1);
  //   expect(setCounterAriaTextSpy).toHaveBeenCalledTimes(1);
  // });
  it('should call updateCounterVisibility() and not setCounterAriaText() when hasCounter is false', () => {
    const component = initComponent();
    const updateCounterVisibilitySpy = jest.spyOn(component, 'updateCounterVisibility' as any);
    const setCounterAriaTextSpy = jest.spyOn(component, 'setCounterAriaText' as any);
    component['hasCounter'] = false;
    component['updateCounter']();
    expect(updateCounterVisibilitySpy).toHaveBeenCalledTimes(1);
    expect(setCounterAriaTextSpy).not.toHaveBeenCalledTimes(1);
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

    expect(component['counterAriaText']).toBe('You have 96 out of 100 characters left');
  });
});
