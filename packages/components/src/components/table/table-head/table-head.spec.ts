import { describe, expect, it } from 'vitest';
import { TableHead } from './table-head';

const initComponent = (parentTag?: string): TableHead => {
  const component = new TableHead();
  component.host = document.createElement('p-table-head');
  component.host.attachShadow({ mode: 'open' });
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('parent validation', () => {
  it('should throw when not placed inside p-table', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-table', () => {
    const component = initComponent('p-table');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
