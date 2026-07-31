import { describe, expect, it, vi } from 'vitest';
import { RadioGroupOption } from './radio-group-option';

const initComponent = (): RadioGroupOption => {
  const component = new RadioGroupOption();
  component.host = document.createElement('p-radio-group-option') as any;
  component.host.attachShadow({ mode: 'open' });
  return component;
};

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
