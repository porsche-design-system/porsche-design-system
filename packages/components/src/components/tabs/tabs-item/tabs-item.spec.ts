import { forceUpdate } from '@stencil/core';
import { describe, expect, it } from 'vitest';
import { TabsItem } from './tabs-item';

const initComponent = (): TabsItem => {
  const component = new TabsItem();
  component.host = document.createElement('p-tabs-item');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('label change', () => {
  it('should force a re-render of the parent tabs component', () => {
    const component = initComponent();
    const parent = document.createElement('p-tabs');
    parent.appendChild(component.host);

    component.handleLabelChange();

    expect(forceUpdate).toHaveBeenCalledWith(parent);
  });
});

describe('parent validation', () => {
  it('should throw when not placed inside p-tabs', () => {
    const component = initComponent();
    document.createElement('div').appendChild(component.host);

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-tabs', () => {
    const component = initComponent();
    document.createElement('p-tabs').appendChild(component.host);

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
