import { describe, expect, it } from 'vitest';
import { TableHeadRow } from './table-head-row';

const initComponent = (parentTag?: string): TableHeadRow => {
  const component = new TableHeadRow();
  component.host = document.createElement('p-table-head-row');
  component.host.attachShadow({ mode: 'open' });
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('parent validation', () => {
  it('should throw when not placed inside p-table-head', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-table-head', () => {
    const component = initComponent('p-table-head');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
