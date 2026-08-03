import { describe, expect, it, vi } from 'vitest';
import { MultiSelectOption } from './multi-select-option';

const initComponent = (parentTag?: string): MultiSelectOption => {
  const component = new MultiSelectOption();
  component.host = document.createElement('p-multi-select-option') as any;
  component.host.attachShadow({ mode: 'open' });
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
