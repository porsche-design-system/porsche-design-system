import { describe, expect, it, vi } from 'vitest';
import * as loggerUtils from '../../../utils/log/logger';
import * as throwIfPropIsUndefinedUtils from '../../../utils/validation/throwIfPropIsUndefined';
import { RadioGroupOption } from './radio-group-option';

const initComponent = (): RadioGroupOption => {
  const component = new RadioGroupOption();
  component.host = document.createElement('p-radio-group-option') as any;
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('render', () => {
  it('should validate that value is defined', () => {
    const spy = vi.spyOn(throwIfPropIsUndefinedUtils, 'throwIfPropIsUndefined');
    const component = initComponent();

    expect(() => component.render()).toThrowError(/required property 'value' is undefined/);
    expect(spy).toHaveBeenCalledWith(component.host, 'value', component.value);
  });

  it('should reject null values', () => {
    const consoleErrorSpy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    const component = initComponent();
    Reflect.set(component, 'value', null);

    component.render();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Invalid property 'value' with value 'null' supplied to p-radio-group-option, expected one of: string, number.",
      component.host
    );
  });
});

describe('parent validation', () => {
  it('should throw when not placed inside p-radio-group', () => {
    const component = initComponent();
    document.createElement('div').appendChild(component.host);

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-radio-group', () => {
    const component = initComponent();
    document.createElement('p-radio-group').appendChild(component.host);

    expect(() => component.connectedCallback()).not.toThrow();
  });
});

describe('change forwarding', () => {
  it('should dispatch bubbling internalRadioGroupOptionChange with the native event as detail', () => {
    const component = initComponent();
    const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');
    const event = new Event('change');
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');
    const stopImmediatePropagationSpy = vi.spyOn(event, 'stopImmediatePropagation');

    component['onChange'](event);

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(stopImmediatePropagationSpy).toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'internalRadioGroupOptionChange', bubbles: true, detail: event })
    );
  });
});

describe('blur forwarding', () => {
  it('should dispatch bubbling internalRadioGroupOptionBlur', () => {
    const component = initComponent();
    const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');
    const event = new FocusEvent('blur');

    component['onBlur'](event);

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'internalRadioGroupOptionBlur', bubbles: true })
    );
  });
});
