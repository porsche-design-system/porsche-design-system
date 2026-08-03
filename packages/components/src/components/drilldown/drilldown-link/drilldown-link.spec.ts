import { describe, expect, it } from 'vitest';
import { DrilldownLink } from './drilldown-link';

const initComponent = (parentTag?: string): DrilldownLink => {
  const component = new DrilldownLink();
  component.host = document.createElement('p-drilldown-link');
  component.host.attachShadow({ mode: 'open' });
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('parent validation', () => {
  it('should throw when placed outside p-drilldown or p-drilldown-item', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-drilldown', () => {
    const component = initComponent('p-drilldown');

    expect(() => component.connectedCallback()).not.toThrow();
  });

  it('should not throw when placed inside p-drilldown-item', () => {
    const component = initComponent('p-drilldown-item');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
