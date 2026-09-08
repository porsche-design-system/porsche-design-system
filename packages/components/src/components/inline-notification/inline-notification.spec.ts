import { forceUpdate } from '@stencil/core';
import { describe, expect, it } from 'vitest';
import { InlineNotification } from './inline-notification';

const initComponent = (): InlineNotification => {
  const component = new InlineNotification();
  component.host = document.createElement('p-inline-notification');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('dynamic slot changes', () => {
  it('should force a re-render of itself when its children change', async () => {
    const component = initComponent();
    component.connectedCallback();

    component.host.appendChild(document.createElement('span'));
    await new Promise((resolve) => setTimeout(resolve));

    expect(forceUpdate).toHaveBeenCalledWith(component.host);

    component.disconnectedCallback();
  });
});
