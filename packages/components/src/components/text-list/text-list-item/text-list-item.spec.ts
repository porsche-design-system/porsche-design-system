import { describe, expect, it } from 'vitest';
import { TextListItem } from './text-list-item';

const initComponent = (parentTag?: string): TextListItem => {
  const component = new TextListItem();
  component.host = document.createElement('p-text-list-item');
  component.host.attachShadow({ mode: 'open' });
  if (parentTag) {
    document.createElement(parentTag).appendChild(component.host);
  }
  return component;
};

describe('parent validation', () => {
  it('should throw when not placed inside p-text-list', () => {
    const component = initComponent('div');

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when placed inside p-text-list', () => {
    const component = initComponent('p-text-list');

    expect(() => component.connectedCallback()).not.toThrow();
  });
});
