import { describe, expect, it } from 'vitest';
import { TableRow } from './table-row';

const initComponent = (parentTag?: string): TableRow => {
  const component = new TableRow();
  component.host = document.createElement('p-table-row');
  component.host.attachShadow({ mode: 'open' });
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('parent validation', () => {
  it('should throw when placed outside p-table-body or p-table-head', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-table-body', () => {
    const component = initComponent('p-table-body');

    expect(() => component.connectedCallback()).not.toThrow();
  });

  it('should not throw when placed inside p-table-head', () => {
    const component = initComponent('p-table-head');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
