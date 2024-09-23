import { Checkbox } from './checkbox';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';
import { getSlottedAnchorStyles } from '../../styles';
import { expect } from '@jest/globals';
import { getCheckboxRadioButtonSafariRenderingFix } from '../../utils/form/applyCheckboxRadioButtonSafariRenderingFix';

jest.mock('../../utils/dom');

class MockElementInternals {
  setValidity = jest.fn();
  setFormValue = jest.fn();
}

let mockEmit: jest.SpyInstance;

const initComponent = (): Checkbox => {
  const component = new Checkbox();
  component.host = document.createElement('p-checkbox');
  component.host.attachShadow({ mode: 'open' });
  const input = document.createElement('input');
  input.type = 'checkbox';
  component.host.shadowRoot.appendChild(input);
  component['checkboxInputElement'] = input;
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  mockEmit = jest.fn();

  component.update = { emit: mockEmit } as any;
  component.blur = { emit: mockEmit } as any;
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
    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledWith(
      component.host,
      getSlottedAnchorStyles,
      getCheckboxRadioButtonSafariRenderingFix
    );
  });
});

describe('formResetCallback', () => {
  const value = 'test-value';
  const component = initComponent();
  component.value = value;
  const setValiditySpy = jest.spyOn(component['internals'], 'setValidity' as any);
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
  component.formResetCallback();
  expect(setValiditySpy).toHaveBeenCalledWith({});
  expect(setFormValueSpy).toHaveBeenCalledWith(undefined);
  expect(component.value).toBe(value);
  expect(component['checkboxInputElement'].value).toBe('on');
  expect(component.checked).toBe(false);
  expect(component['checkboxInputElement'].checked).toBe(false);
});

describe('componentDidLoad', () => {
  it('should call setFormValue() on componentDidLoad() if checkbox is checked', () => {
    const component = initComponent();
    component.value = 'test';
    component['checkboxInputElement'].checked = true;
    component.indeterminate = true;
    expect(component['checkboxInputElement'].indeterminate).toBe(false);
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(component['checkboxInputElement'].indeterminate).toBe(true);
    expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
  });

  it('should not call setFormValue() on componentDidLoad() if checkbox is checked', () => {
    const component = initComponent();
    component.value = 'test';
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).not.toHaveBeenCalled();
  });
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

describe('onChange', () => {
  it('should call setFormValue() and emit update event', () => {
    const value = 'test-value';
    const name = 'test-name';
    const checked = true;
    const component = initComponent();
    component.name = name;
    component.value = value;
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);

    const event = {
      stopPropagation: jest.fn(),
      stopImmediatePropagation: jest.fn(),
      target: {
        checked,
      },
    } as unknown as Event;

    component['onChange'](event);
    expect(setFormValueSpy).toHaveBeenCalledWith(value);
    expect(mockEmit).toHaveBeenCalledWith({ name, value, checked });
  });

  it('should reset form value if checkbox is not checked', () => {
    const value = 'test-value';
    const name = 'test-name';
    const checked = false;
    const component = initComponent();
    component.name = name;
    component.value = value;
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);

    const event = {
      stopPropagation: jest.fn(),
      stopImmediatePropagation: jest.fn(),
      target: {
        checked,
      },
    } as unknown as Event;

    component['onChange'](event);
    expect(setFormValueSpy).toHaveBeenCalledWith(undefined);
    expect(mockEmit).toHaveBeenCalledWith({ name, value, checked });
  });
});
