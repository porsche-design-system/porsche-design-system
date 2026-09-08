import { describe, expect, it } from 'vitest';
import { TableCell } from './table-cell';

const initComponent = (parentTag?: string): TableCell => {
  const component = new TableCell();
  component.host = document.createElement('p-table-cell');
  component.host.attachShadow({ mode: 'open' });
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('parent validation', () => {
  it('should throw when not placed inside p-table-row', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-table-row', () => {
    const component = initComponent('p-table-row');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
