import { Textarea } from './textarea';
import { vi } from 'vitest';

vi.mock('../../utils/dom');

class MockElementInternals {
  setValidity = vi.fn();
  setFormValue = vi.fn();
}

let mockEmit: vi.SpyInstance;

const initComponent = (): Textarea => {
  const component = new Textarea();
  component.host = document.createElement('p-textarea');
  component.host.attachShadow({ mode: 'open' });
  const textarea = document.createElement('textarea');
  const counterElement = document.createElement('span');
  component.host.shadowRoot.appendChild(textarea);
  component.host.shadowRoot.appendChild(counterElement);
  component['textAreaElement'] = textarea;
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  mockEmit = vi.fn();

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
  component.value = 'test';
  const restoredValue = 'restored-value';
  component.formStateRestoreCallback(restoredValue);
  expect(component.value).toBe(restoredValue);
});
describe('componentDidLoad', () => {
  const component = initComponent();
  component.value = 'test';
  const setFormValueSpy = vi.spyOn(component['internals'], 'setFormValue' as any);
  component.componentDidLoad();
  expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
});
describe('onChange', () => {
  const component = initComponent();
  const event = {
    stopPropagation: vi.fn(),
    stopImmediatePropagation: vi.fn(),
  } as unknown as Event;

  component['onChange'](event);

  expect(mockEmit).toHaveBeenCalledWith(event);
});
describe('onBlur', () => {
  it('should stop propagation and emit blur event on onBlur', () => {
    const component = initComponent();
    const event = {
      stopPropagation: vi.fn(),
      stopImmediatePropagation: vi.fn(),
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
      stopPropagation: vi.fn(),
      stopImmediatePropagation: vi.fn(),
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
describe('componentDidRender', () => {
  it('should call ElementInternals setValidity()', () => {
    const component = initComponent();
    const setValiditySpy = vi.spyOn(component['internals'], 'setValidity' as any);
    component.componentDidRender();
    expect(setValiditySpy).toHaveBeenCalledTimes(1);
    expect(setValiditySpy).toHaveBeenCalledWith(
      component['textAreaElement'].validity,
      component['textAreaElement'].validationMessage,
      component['textAreaElement']
    );
  });
});
