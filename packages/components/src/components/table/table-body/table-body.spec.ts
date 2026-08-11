import { describe, expect, it } from 'vitest';
import { TableBody } from './table-body';

const initComponent = (parentTag?: string): TableBody => {
  const component = new TableBody();
  component.host = document.createElement('p-table-body');
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
