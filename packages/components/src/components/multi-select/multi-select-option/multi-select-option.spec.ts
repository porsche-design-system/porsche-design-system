import { describe, expect, it, vi } from 'vitest';
import * as a11yUtils from '../../../utils/a11y/select/select-aria';
import * as loggerUtils from '../../../utils/log/logger';
import * as throwIfPropIsUndefinedUtils from '../../../utils/validation/throwIfPropIsUndefined';
import { MultiSelectOption } from './multi-select-option';

const initComponent = (parentTag?: string): MultiSelectOption => {
  const component = new MultiSelectOption();
  component.host = document.createElement('p-multi-select-option') as any;
  component.host.attachShadow({ mode: 'open' });
  component.host.selected = false;
  component.host.highlighted = false;
  component.host.hidden = false;
  component.host.disabledParent = false;
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('parent validation', () => {
  it('should throw when placed outside p-multi-select or p-optgroup', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-multi-select', () => {
    const component = initComponent('p-multi-select');

    expect(() => component.connectedCallback()).not.toThrow();
  });

  it('should not throw when placed inside p-optgroup', () => {
    const component = initComponent('p-optgroup');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});

describe('prop validation', () => {
  it('should accept a numeric value', () => {
    const component = initComponent();
    const consoleErrorSpy = vi.spyOn(loggerUtils, 'consoleError');
    component.value = 42;

    component.render();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

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
      "Invalid property 'value' with value 'null' supplied to p-multi-select-option, expected one of: string, number.",
      component.host
    );
  });
});

describe('option accessibility', () => {
  it.each([
    ['', true],
    [0, true],
  ] as const)('should treat value %p as present', (value, expectedHasValue) => {
    const spy = vi.spyOn(a11yUtils, 'getOptionAriaAttributes').mockReturnValue({});
    const component = initComponent();
    component.value = value;

    component.render();

    expect(spy).toHaveBeenCalledWith(false, false, false, expectedHasValue);
  });
});

describe('option click', () => {
  it('should dispatch a bubbling internalOptionUpdate event', () => {
    const component = initComponent();
    const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');

    component['onClick']();

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'internalOptionUpdate', bubbles: true })
    );
  });
});
